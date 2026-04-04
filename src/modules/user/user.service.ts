import { Role } from "@prisma/client";
import prisma from "../../config/db.ts";
import { ApiError } from "../../utils/errors.ts";
type CreateUserInput = {
    name: string;
    email: string;
};

export const createUser = async (
    data: CreateUserInput & { role?: string },
    currentUserRole?: string
) => {
    if (!data?.name || !data?.email) {
        throw new ApiError("Name and email are required", 400);
    }

    const count = await prisma.user.count();

    // Restrict creation to ADMIN
    if (count > 0 && currentUserRole !== "ADMIN") {
        throw new ApiError("Only ADMIN can create users", 403);
    }

    // Check duplicate email
    const existing = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existing) {
        throw new ApiError("Email already exists", 409);
    }

    // Role assignment
    let role: Role;

    if (count === 0) {
        role = "ADMIN";
    } else if (data.role && currentUserRole === "ADMIN") {
        role = data.role as Role;
    } else {
        role = "VIEWER";
    }

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            role,
        },
    });

    return user;
};

import { Prisma } from "@prisma/client";

export const getUsers = async (
    page = 1,
    limit = 10,
    includeDeleted = false,
    search?: string,
    role?: string,
    status?: string
) => {
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    // Soft delete filter
    if (!includeDeleted) {
        where.deleted = false;
    }

    // Search filter
    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                email: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    // Role filter
    if (role) {
        where.role = role as any;
    }

    // Status filter
    if (status) {
        where.status = status as any;
    }

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.user.count({
            where,
        }),
    ]);

    return {
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id,
            deleted: false,
        },
    });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    return user;
};


export const updateUser = async (
    id: string,
    data: any,
    currentUserRole: string
) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (user.deleted) {
        throw new ApiError("User already deleted", 400);
    }

    if (data.role && currentUserRole !== "ADMIN") {
        throw new ApiError("Only ADMIN can change roles", 403);
    }

    if (data.status && currentUserRole !== "ADMIN") {
        throw new ApiError("Only ADMIN can change status", 403);
    }

    // Prevent last admin demotion
    if (user.role === "ADMIN" && data.role && data.role !== "ADMIN") {
        const adminCount = await prisma.user.count({
            where: {
                role: "ADMIN",
                deleted: false,
            }
        });

        if (adminCount === 1) {
            throw new ApiError("Cannot demote last admin", 400);
        }
    }

    if (data.email) {
        const existing = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing && existing.id !== id) {
            throw new ApiError("Email already exists", 409);
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data,
    });

    return updatedUser;
};


export const deleteUser = async (
    id: string,
    currentUserRole?: string
) => {
    if (currentUserRole !== "ADMIN") {
        throw new ApiError("Only ADMIN can delete users", 403);
    }

    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (user.deleted) {
        throw new ApiError("User already deleted", 400);
    }

    if (user.role === "ADMIN") {
        const adminCount = await prisma.user.count({
            where: {
                role: "ADMIN",
                deleted: false,
            },
        });

        if (adminCount === 1) {
            throw new ApiError("Cannot delete last admin", 400);
        }
    }

    // Soft delete
    const deletedUser = await prisma.user.update({
        where: { id },
        data: {
            deleted: true,
            deletedAt: new Date(),
            status: "INACTIVE",
        },
    });

    return deletedUser;
};
