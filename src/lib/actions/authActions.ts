"use server"

import * as bcrypt from "bcrypt"

import { User } from "@prisma/client";
import prisma from "../prisma";

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image">) {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        },
    })
}