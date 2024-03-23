import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";


export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/signin",
    },
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials?.username
                    }
                })

                if(!user) throw new Error("No user found");
                // const isPasswordCorrect = credentials?.password === user.password;
                if(!credentials?.password) throw new Error("Please enter your password");
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if(!isPasswordCorrect) throw new Error("Wrong password");
                const { password, ...rest } = user;
                return rest;
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            user && (token.user = user as User);
            return token;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };