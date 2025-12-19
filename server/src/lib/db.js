import "dotenv/config"
import {PrismaClient} from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = global

let prisma = globalForPrisma.prisma

if (!prisma) {
  try {
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set")
    }
    
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    
    prisma = new PrismaClient({ adapter })
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma
    }
  } catch (error) {
    console.error("Failed to initialize Prisma:", error.message)
    throw error
  }
}

if (!prisma) {
  throw new Error("Failed to initialize Prisma client")
}

export default prisma