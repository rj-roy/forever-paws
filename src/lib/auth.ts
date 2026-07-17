import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URI!);
const db = client.db(process.env.DB_NAME!);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_BASE!,
    secret: process.env.BETTER_AUTH_SECRET!,
    database: mongodbAdapter(db, {
        client
    }),

    emailAndPassword: {
        enabled:true,
    },

    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: true,
                defaultValue: 'adopter',
            },

            profileImage: {
                type: "string",
                required: true,
                defaultValue: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
            },

            phone: {
                type: "number",
                required: false,
                defaultValue: 9,
            },

            bio: {
                type: "string",
                required: false,
                defaultValue: "Not Provided",
            },
        },
    },
});