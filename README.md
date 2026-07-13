# DocMind

AI-powered document Q&A assistant with RAG, citations, guardrails, and evals.

## Tech Stack

- **Backend:** NestJS + TypeScript + Prisma
- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Database:** PostgreSQL + pgvector (Neon)
- **LLM:** Claude API (Anthropic)
- **Embeddings:** OpenAI text-embedding-3-small

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (optional, for local Postgres)

### Setup

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup database
cd ../backend
npx prisma migrate dev

# Start development servers
cd ..
npm run dev:backend   # Backend on port 3001
npm run dev:frontend  # Frontend on port 3000
```

### Environment Variables

Create `backend/.env`:

```env
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
EMBEDDING_MODEL=text-embedding-3-small
SIMILARITY_THRESHOLD=0.75
```

## Project Structure

```
DocMind/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── documents/ # Upload + chunking + embedding
│   │   ├── rag/       # Retrieval + generation
│   │   ├── guardrail/ # Input/output safety
│   │   ├── eval/      # Test suite + LLM-as-judge
│   │   ├── prisma/    # Database service
│   │   └── common/    # Shared services
│   └── prisma/
│       └── schema.prisma
├── frontend/          # Next.js app
│   └── src/
│       ├── app/       # Pages (/, /chat, /eval)
│       ├── components/
│       └── lib/
├── docker-compose.yml
└── PLAN.md
```

## Architecture

```
Next.js (Vercel) ← REST + SSE → NestJS (Railway) → Claude API
                                        │
                                        ▼
                              Postgres + pgvector (Neon)
```

## License

MIT
