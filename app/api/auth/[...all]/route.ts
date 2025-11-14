import { getAuth } from "@/lib/better-auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

let handler: ReturnType<typeof toNextJsHandler> | null = null;

async function getHandler() {
    if (!handler) {
        const authInstance = await getAuth();
        handler = toNextJsHandler(authInstance);
    }
    return handler;
}

export async function GET(request: Request) {
    const h = await getHandler();
    return h.GET(request);
}

export async function POST(request: Request) {
    const h = await getHandler();
    return h.POST(request);
}