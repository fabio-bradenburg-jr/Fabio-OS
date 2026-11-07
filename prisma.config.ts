import 'dotenv/config'
import { defineConfig } from 'prisma/config'

// Prisma 7: as URLs saem do schema e vêm para cá.
// O CLI (migrate, db push, studio) usa a conexão direta (porta 5432).
// Em runtime, o app usa DATABASE_URL (pooler, porta 6543) via adapter em src/lib/db.ts.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '',
  },
})
