# AnalogHeal Forensics & Recovery Labs

AnalogHeal is a high-performance, institutional-grade digital asset reclamation platform and forensic laboratory. Built for professional blockchain investigators and victims of sophisticated financial cybercrime, the platform facilitates encrypted intake, AI-driven case triage, and comprehensive asset recovery management.

## 🔬 Project Overview

The application is divided into two primary environments:
1.  **Public Forensic Node**: A conversion-optimized interface designed to establish authority and guide victims of scams (Investment, Broker, Trading, Romance, and Loan fraud) through a secure, multi-step intake process.
2.  **Administrative Terminal**: A secure laboratory command center where lead analysts manage recovery files, publish technical intelligence, and oversee institutional trust assets.

## 🚀 Key Features

### Public Portal
*   **Encrypted Intake Funnel**: A specialized multi-step form that categorizes losses and valuations, utilizing AI to enhance user descriptions into technical forensic reports.
*   **Expert Knowledge Hub**: A repository of security guides and research papers featuring an **AI Forensic Expert** that answers user questions using laboratory-specific context.
*   **Verified Proof Layer**: A real-time synchronized display of authenticated recovery results and laboratory credentials.
*   **Institutional Trust Strip**: High-fidelity visualization of lab operations and infrastructure.
*   **Live Support Integration**: Tawk.to managed live communication for immediate client triage.

### Admin Terminal (Laboratory Command)
*   **Operational Dashboard**: Real-time overview of active recovery files, lab latency, and reclamation statistics.
*   **Secure Case Management**: Full visibility into submitted recovery requests with encrypted diagnostic views for technical summaries and contact data.
*   **Intelligence Hub Manager**: A custom CMS for publishing technical guides with a specialized markdown renderer (`**bold**` and `[accent]cyan[/accent]` highlighting).
*   **Trust Asset CMS**: Direct control over institutional branding, team photos, and operational proofs.
*   **Intelligence Logs**: A simulated live-stream of global forensic node activities and network integrity scans.
*   **Client Database**: A secure registry of institutional and private client records.

## 🛠 Tech Stack

*   **Framework**: Next.js 15 (App Router) with Turbopack.
*   **Language**: TypeScript.
*   **Styling**: Tailwind CSS with custom "Midnight Gold & Forensic Cyan" authority palette.
*   **Components**: Shadcn UI (Radix-based accessibility).
*   **Database & Auth**: Supabase (PostgreSQL with Row Level Security).
*   **Generative AI**: Google Genkit (Gemini 2.5 Flash) for automated case drafting and intelligent triage.
*   **Animations**: Framer Motion for high-end institutional feel.
*   **Icons**: Lucide React.

## 📂 Project Structure

- `src/app/`: Core application routes and layouts.
- `src/app/admin/`: Protected administrative laboratory routes.
- `src/components/`: Reusable institutional UI components.
- `src/ai/`: Genkit flow definitions for forensic AI features.
- `src/lib/`: Database clients, utilities, and image constants.
- `docs/`: Institutional technical documentation.

## 🛡 Security & Compliance

The platform is architected to reflect Swiss digital privacy standards:
*   **Data Isolation**: All intake data is encrypted and isolated until reviewed by authorized analysts.
*   **RLS Policies**: Supabase Row Level Security ensures that only authenticated laboratory personnel can access sensitive recovery files.
*   **Hydration Guards**: Advanced React patterns to prevent data leakage during client-side rendering.

## 🔧 Setup & Environment

To initialize the laboratory environment, ensure the following keys are present in your `.env`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GOOGLE_GENAI_API_KEY=your_gemini_key
```

For detailed database schema information, refer to `database.md`.

---
*Authorized Laboratory Documentation | AnalogHeal Forensic Systems Ltd.*