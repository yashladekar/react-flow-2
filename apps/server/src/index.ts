import { createContext } from "@workspace/api/context";
import { appRouter } from "@workspace/api/routers/index";
import { auth } from "@workspace/auth";
import { env } from "@workspace/env/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

const app = express();
const allowedOrigins = new Set([env.CORS_ORIGIN, "http://localhost:3002"]);

app.use(express.json());

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api/auth", toNodeHandler(auth));

app.use(
    "/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.get("/", (_req, res) => {
    res.status(200).send("OK");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});