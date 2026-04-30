import * as rateLimit from "express-rate-limit";

type RateLimitFn = typeof import("express-rate-limit").default;

const rl = rateLimit.default as RateLimitFn;

export const authLimiter = rl({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many login attempts. Try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const registerLimiter = rl({
    windowMs: process.env.RATE_LIMIT_AUTH_WINDOW_MS
        ? parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS)
        : 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_AUTH_MAX
        ? parseInt(process.env.RATE_LIMIT_AUTH_MAX)
        : 10,
    message: {
        success: false,
        message: "Too many registrations. Try again later.",
    },
});

export const apiLimiter = rl({
    windowMs: process.env.RATE_LIMIT_GENERAL_WINDOW_MS
        ? parseInt(process.env.RATE_LIMIT_GENERAL_WINDOW_MS)
        : 60 * 1000,
    max: process.env.RATE_LIMIT_GENERAL_MAX
        ? parseInt(process.env.RATE_LIMIT_GENERAL_MAX)
        : 100,
    message: {
        success: false,
        message: "Too many requests. Please slow down.",
    },
});
