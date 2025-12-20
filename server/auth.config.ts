import 'dotenv/config';
import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { deviceAuthorization } from "better-auth/plugins"; 
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/gemcli'
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    basePath:'/api/auth',
    trustedOrigins: ["http://localhost:3000"],
    plugins: [
        deviceAuthorization({ 
            verificationUri: "/device", 
        }), 
    ],
    socialProviders: { 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID || '', 
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '', 
        }, 
    }, 
    secret: process.env.BETTER_AUTH_SECRET || 'dev-secret',
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3005',
})

export default auth
