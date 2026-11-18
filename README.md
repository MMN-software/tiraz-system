# Tiraz System — Medical Equipment Company Platform

A full-stack company website and product catalogue for an Iranian medical and beauty equipment supplier. Built with **Next.js 16 (App Router)**, **TypeScript**, **Drizzle ORM** and **PostgreSQL (Neon)**, with a fully Persian, right-to-left interface.

It covers the public site (catalogue, blog, inquiries) as well as user accounts and an admin panel for managing content.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_(Neon)-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## Features

**Public site**
- Product catalogue with category sidebar, filters, sorting toolbar and quick view
- Product pages with gallery, FAQ, related products and an inquiry (request-for-quote) form
- Wishlist and side-by-side product comparison
- Blog with article pages
- SEO basics: `sitemap.ts`, `robots.ts`, per-page metadata
- UX details: navigation progress bar, skeleton loaders, toasts, skip-to-content link, back-to-top

**User accounts**
- Registration, login, password change and password recovery flow
- Profile area: account info, saved items, submitted inquiries and messages

**Admin panel** (`/admin`)
- Manage products, categories, articles, users, incoming inquiries and site settings
- REST-style route handlers under `/api/admin/*`

## Architecture

```
src/
├── app/                  # App Router pages + API route handlers
│   ├── api/              # auth, articles, categories, inquiries, settings, admin/*
│   ├── admin/            # Admin dashboard
│   └── products/ blog/ profile/ compare/ wishlist/ …
├── components/           # home, products, profile, common, ui
└── lib/
    ├── db/               # Drizzle schema + Neon client
    └── api/              # Repository layer (products, articles, auth, inquiries…)
drizzle/                  # SQL migrations
docs/                     # Reference-site analysis and requirements checklist
```

- **Data layer:** Drizzle ORM schema (`users`, `products`, `categories`, `articles`, `inquiries`, `settings`, `sessions`) with versioned SQL migrations
- **Repository pattern:** pages and route handlers talk to `lib/api/*-repository.ts` instead of querying the database directly
- **Discovery docs:** `docs/` contains the analysis of the client's previous website and the confirmed feature checklist this build was planned from

## Getting started

```bash
git clone https://github.com/MMN-software/tiraz-system.git
cd tiraz-system
npm install
```

Create `.env.local` (never commit it):

```bash
DATABASE_URL=postgres://USER:PASSWORD@HOST/DB?sslmode=require
DIRECT_URL=postgres://USER:PASSWORD@HOST/DB?sslmode=require
```

```bash
npx drizzle-kit migrate   # apply migrations
npm run dev               # http://localhost:3000
```

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion · Drizzle ORM · Neon serverless PostgreSQL · Lucide icons

---

Built by **[Mohammad Mehdi Nemati](https://github.com/MMN-software)** · Available for freelance work — [get in touch](mailto:mohammadmehdi.neemati@gmail.com)
