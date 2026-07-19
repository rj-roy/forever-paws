'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserToken = async () => {
    const session = await auth?.api.getSession({
        headers: await headers(),
    });
    const token = session?.session?.token;
    return token || null;
};

export const authHeader = async (): Promise<Record<string, string>> => {
  const token = await getUserToken();

  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};