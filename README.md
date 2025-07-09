# 🚀 Portfolio + Blog Boilerplate

A full-stack boilerplate using **Next.js 14**, **Tailwind CSS**, **Strapi v4**, and **PostgreSQL**.

---

## 🔨 Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Backend:** Strapi v4 (Headless CMS)
- **Database:** PostgreSQL
- **Containerization:** Docker Compose (optional)

---

## 📁 Project Structure

```
portfolio-blog-template-strapi-tailwindcss/
├── frontend/                       → Next.js 14 + Tailwind CSS
│   ├── app/                        # App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Home page
│   │   ├── blog/
|   |   |   ├──[slug]
│   │   │   |  └── page.tsx
│   │   │   └── page.tsx            # Blog listing page
│   │   └── about/
│   │       └── page.tsx            # About page (optional)
│   ├── components/                 # Reusable React components
│   │   ├── BlogCard.tsx
│   │   └── Navbar.tsx
│   ├── lib/                        # API client & utilities
│   │   └── api.ts
│   ├── public/                     # Static files (images, icons, etc.)
│   ├── styles/                     # Global styles (if needed)
│   │   └── globals.css
│   ├── postcss.config.mjs
│   ├── next.config.ts
│   ├── Dockerfile
│   └── package.json
|
├── backend/                       # Strapi CMS
│   ├── config/                    # Database + app config
│   │   └── database.ts
│   ├── src/
│   │   ├── api/
│   │   │   └── post/
│   │   │       ├── content-types/
│   │   │       │   └── post/
│   │   │       │       └── schema.json
│   │   │       ├── controllers/
│   │   │       ├── routes/
│   │   │       └── services/
│   │   └── index.ts
│   ├── public/
│   ├── .env
│   ├── Dockerfile
│   └──  package.json
│
├── docker-compose.yml              # Docker Compose orchestration
└── README.md

```

---

## ⚙️ Quick Start

### 1. Clone the repo

```bash
fork the repo
git clone https://github.com/<your-username>/portfolio-blog-template-strapi-tailwindcss.git
cd portfolio-blog-template-strapi-tailwindcss
```

### 2. Install dependencies

```bash
cd backend && yarn install
cd ../frontend && yarn install
```

### 3. Run locally

#### Start PostgreSQL + Strapi + Next.js (Dockerized)

```bash
docker-compose up --build
```

Or run manually:

### Run PostgreSQL using Docker

```bash
docker run --name postgres-strapi -e POSTGRES_USER=<'postgres_user'> -e POSTGRES_PASSWORD=<'postgres_pass'> -e POSTGRES_DB=<'strapi_db'> -p 5432:5432 -d postgres:15
```

#### Backend (Strapi):

```bash
cd backend
yarn develop
```

#### Frontend (Next.js):

```bash
cd frontend
yarn dev
```

---

## 🌐 Access the app

- **Strapi Admin:** [http://localhost:1337/admin](http://localhost:1337/admin)
- **Portfolio:** [http://localhost:3000](http://localhost:3000)
- **Blog:** [http://localhost:3000/blog](http://localhost:3000/blog)

---

## 🛠️ Configuration Highlights

### Frontend

- `frontend/app/layout.tsx` → Shared layout
- `frontend/app/page.tsx` → Portfolio homepage
- `frontend/app/blog/page.tsx` → Blog listing page
- `frontend/tailwind.config.js` → Tailwind setup
- `frontend/next.config.js` → Image optimization domains

### Backend

- PostgreSQL connection: `/backend/config/database.ts`
- Example content-type: `/backend/src/api/post/content-types/post/schema.json`

### Docker Compose

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment: ---Your ENV---

  strapi:
    build: ./backend
    ports:
      - "1337:1337"
    environment: ---Your ENV---
    depends_on:
      - postgres

  nextjs:
    build: ./frontend
    ports:
      - "3000:3000"

volumes:
  postgres-data:
```

---

## 🚧 Future Improvements

- 🔑 Add NextAuth.js for user authentication
- ☁️ Deploy PostgreSQL on Atlas or Render
- 🔄 Deploy Frontend on Vercel & Backend on DigitalOcean/Render
- 📈 Improve SEO & add dynamic OpenGraph images
- 📄 Build out portfolio sections & personal branding features

---

## 📜 License

MIT

---
