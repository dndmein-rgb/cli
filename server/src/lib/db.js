import "dotenv/config"
import {PrismaClient} from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = global

let prisma = globalForPrisma.prisma

if (!prisma) {
  const connectionString = process.env.DATABASE_URL
  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  
  prisma = new PrismaClient({ adapter })
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
  }
}

export default prisma