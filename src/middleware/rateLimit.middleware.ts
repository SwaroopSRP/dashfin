import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5, // max 5 attempts
    message: {
        success: false,
        message: "Too many login attempts. Try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const registerLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_AUTH_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS) : 15 * 60 * 1000, // default 15 min
    max: process.env.RATE_LIMIT_AUTH_MAX ? parseInt(process.env.RATE_LIMIT_AUTH_MAX) : 10,
    message: {
        success: false,
        message: "Too many registrations. Try again later.",
    },
});

export const apiLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_GENERAL_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_GENERAL_WINDOW_MS) : 60 * 1000, // default 1 min
    max: process.env.RATE_LIMIT_GENERAL_MAX ? parseInt(process.env.RATE_LIMIT_GENERAL_MAX) : 100,
    message: {
        success: false,
        message: "Too many requests. Please slow down.",
    },
});
