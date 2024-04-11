"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
    const session = await getSession();

    if (!session) {
        throw new Error("Not session found");
    }

    const api_key = process.env.STREAM_API_KEY as string;
    const api_secret = process.env.STREAM_SECRET as string;
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const token = serverClient.createToken(session.user.id);
    return token;
}
