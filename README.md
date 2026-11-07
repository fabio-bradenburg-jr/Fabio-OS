# Life OS

Sistema Operacional Pessoal: tarefas, projetos, notas, hábitos, objetivos e IA num só lugar.

O contexto do produto está em [`MASTER_CONTEXT.md`](./MASTER_CONTEXT.md) e o planejamento em [`docs/`](./docs):
arquitetura, design bible (Apex Velocity), banco de dados, agentes de IA e roadmap de sprints.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript strict
- **Tailwind CSS 4** com os tokens Apex Velocity (`tailwind.config.ts`, ligado via `@config` em `globals.css`)
- **shadcn/ui** (Radix + CVA), componentes em `src/components/ui`
- **Prisma 7** + PostgreSQL no Supabase, com pgvector, via `@prisma/adapter-pg`
- **Better Auth** (e-mail/senha + Google OAuth)

## Rodando localmente

Pré-requisitos: Node 22+ e um projeto no Supabase.

```bash
npm install
```

```bash
cp .env.example .env.local
```

Preencha o `.env.local`. O CLI do Prisma lê `.env`; para ele, copie também as variáveis de banco para `.env`
ou exporte `DIRECT_URL` no shell.

```bash
npm run db:push
```

```bash
npm run dev
```

O `npm install` já roda `prisma generate` (script `postinstall`). O client é gerado em `src/generated/prisma`,
que fica fora do git.

## Scripts

| Script                 | O que faz                                          |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                        |
| `npm run build`        | Build de produção                                  |
| `npm run lint`         | ESLint                                             |
| `npm run typecheck`    | `tsc --noEmit`                                     |
| `npm run format`       | Prettier em todo o projeto                         |
| `npm run db:generate`  | Gera o Prisma Client                               |
| `npm run db:push`      | Aplica o schema no banco (sem migration)           |
| `npm run db:migrate`   | Cria e aplica uma migration                        |
| `npm run db:studio`    | Prisma Studio                                      |

## Banco de dados

- Conexões ficam em `prisma.config.ts` (exigência do Prisma 7): o CLI usa `DIRECT_URL` (porta 5432) e o app
  usa `DATABASE_URL` (pooler, porta 6543) em `src/lib/db.ts`.
- A extensão `vector` é declarada no schema e habilitada no `db push`. `AiMemory.embedding` é `vector(1536)`.

## Qualidade

- Pre-commit (Husky + lint-staged): ESLint e Prettier nos arquivos alterados.
- CI (`.github/workflows/ci.yml`): format check, lint, type-check e build a cada push e PR.
