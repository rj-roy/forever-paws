<div align="center">

# Forever Paws

**Every paw deserves a forever home.**

A full-stack pet adoption platform connecting adopters with shelters and rescue organizations.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000?style=for-the-badge&logo=vercel)](https://forever-paws-nine.vercel.app/)

[![Server Repo]](https://github.com/rj-roy/forever-paws-server)

</div>

---

## Overview

Forever Paws is a modern pet adoption platform where adopters can browse, search, and apply to adopt pets from verified shelters. Shelters can list pets, manage adoption applications, and track the entire adoption lifecycle — all from a single dashboard.

## Features

### For Adopters
- **Browse & Search Pets** — Filter by species, breed, age, size, and location with real-time results
- **Detailed Pet Profiles** — Image galleries, health badges, temperament tags, and shelter info
- **Apply to Adopt** — Comprehensive multi-step adoption application with status tracking
- **AI Chat Assistant** — Ask the Gemini-powered assistant to find pets matching your preferences

### For Shelters
- **List Pets** — Multi-step form with image uploads via Cloudinary
- **Manage Pets** — Edit, delete, and track pet status (Available, Pending, Adopted)
- **Review Applications** — Approve, reject, or schedule interviews for incoming applications

### General
- **Authentication** — Email/password + Google OAuth with role-based access (Adopter, Shelter, Admin)
- **Dark/Light Mode** — System-aware theme with manual toggle
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **AI-Powered Search** — Natural language pet search powered by Google Gemini with function calling

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Server Components) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Auth | [Better Auth](https://www.better-auth.com/) (Email + Google OAuth) |
| Database | [MongoDB](https://www.mongodb.com/) |
| AI | [Google Gemini](https://ai.google.dev/) (3.5 Flash) |
| Image Hosting | [Cloudinary](https://cloudinary.com/) |
| Deployment | [Vercel](https://vercel.com/) |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Cloud project (for Gemini API + OAuth)
- Cloudinary account

### Installation

```bash
# Clone the client repo
git clone https://github.com/rj-roy/forever-paws.git
cd forever-paws

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Auth
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_BASE=http://localhost:3000

# Database
DB_URI=your-mongodb-connection-string
DB_NAME=forever-paws

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** This client requires the [Forever Paws Server](https://github.com/rj-roy/forever-paws-server) running simultaneously for pet and adoption data.

## Project Structure

```
src/
├── app/
│   ├── auth/                    # Login / Sign up
│   ├── dashboard/
│   │   ├── profile/             # User profile (all roles)
│   │   ├── shelter/             # Shelter dashboard + adoption requests
│   │   └── adopter/             # Adopter dashboard + application tracking
│   ├── (pages)/
│   │   ├── pets/                # Browse, detail, list-a-pet
│   │   ├── chat/                # AI chat (full page)
│   │   ├── about/
│   │   ├── how-it-works/
│   │   └── contact/
│   └── api/
│       ├── auth/                # Better Auth handler
│       └── chat/                # Gemini AI streaming endpoint
├── components/
│   ├── auth/                    # Auth forms and buttons
│   ├── dashboard/               # Profile, shelter, adopter dashboards
│   ├── pages/                   # Pet cards, filters, detail sections
│   ├── shared/                  # Navbar, Footer, ChatWidget
│   └── ui/                      # Theme toggle, skeletons
├── lib/
│   ├── auth.ts                  # Server auth config
│   ├── auth-client.ts           # Client auth config
│   ├── gemini.ts                # Gemini AI setup
│   └── cloudinary.ts            # Image upload utility
├── providers/                   # Theme provider
└── types/                       # TypeScript types
```

## License

This project is open source. Feel free to fork and customize it for your own use.

---

Built with care for animals everywhere.
