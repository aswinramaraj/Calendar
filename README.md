# 📅 MyDates Ecosystem: Automated Calendar & Multi-Channel Notification Engine

[![Frontend Deployment](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com)
[![Backend Hosting](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://github.com)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://github.com)
[![Alerts](https://img.shields.io/badge/Notifications-Twilio%20%7C%20Nodemailer-F22F46?style=for-the-badge&logo=twilio&logoColor=white)](https://github.com)

> **A high-scale, full-stack scheduling architecture that transitions standard grid-based calendar management into an automated multi-channel morning broadcast.**

The **MyDates Ecosystem** is a fully decoupled, production-grade scheduling and notification platform. Designed to eliminate the passivity of traditional calendars, this app pairs a responsive modern web UI with a continuous cloud backend service. Every morning at precisely **6:00 AM**, a background automated cron engine evaluates scheduling matrices, queries a MongoDB cluster, and dispatches real-time daily agendas directly to the user via the **Twilio WhatsApp Business API** and **Nodemailer SMTP**.

---

## 🚀 Architectural Capabilities

*   **State-Driven Interactive Grid:** A highly responsive front-end calendar layout engineered with **React** and **Tailwind CSS v4** for clean, utility-first UI states, dynamic date transitions, and optimized layout workflows.
*   **6:00 AM Cron Orchestrator:** A robust, automated backend scheduler handled via `node-cron` that acts as a continuous background daemon, waking up exactly at dawn to calculate pending event states.
*   **Dual-Pipeline Notification Engine:** 
    *   💬 **WhatsApp Channel:** Dispatches rich text, actionable summary alerts directly to the user’s mobile phone through the Twilio sandbox API.
    *   📧 **Inbox Channel:** Compiles and transmits deep HTML email briefs securely via custom SMTP transport layers.
*   **Secure Infrastructure Splitting:** Independent deployment pipelines isolating client-side rendering (Vercel) from server-side computational routing (Render) with strict CORS policies.

---

## 🧱 Data & Communication Flow

┌────────────────────────┐
 │   React Web Frontend   │  ◄── Host State: Vercel Cloud
 │     (Tailwind v4)      │
 └───────────┬────────────┘
             │ (Secure HTTPS Axios REST Handshake)
             ▼
 ┌────────────────────────┐
 │   Node.js / Express    │  ◄── Live Deployment: Render Cloud
 │        API Server      │
 └─────┬────────────┬─────┘
       │            │
Mongoose │            │ (6:00 AM Cron Automation Loop)
Queries  │            ▼
▼   ┌──────────────────────────────────────────────┐
┌───────────┐ │            Cross-Modal Delivery              │
│  MongoDB  │ │  ├─► Twilio Webhook ──► WhatsApp Device Alert │
│  Atlas    │ │  └─► Nodemailer SMTP ──► Email Inbox Digest  │
└───────────┘


