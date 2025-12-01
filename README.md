# Denti - AI Voice Dental Assistant

Denti AI is an voice-enabled dental assistant built using Next.js, PostgreSQL, Prisma, Clerk, Vapi, Resend, TanStack Query, TailwindCSS, ShadCN, Lucide Icons, and Date‑Fns. It allows clinics to manage appointments, enable AI phone calls, receive email notifications, and provide a smooth admin experien


---

## 🚀 Features

* AI Voice Dental Assistant powered by Vapi.

* Clinic Admin Dashboard for managing Doctors and appointments.

**Appointments Page **where patients can book and view appointments.

* Authentication & Authorization using Clerk.

* Email notifications with Resend.

* Database using PostgreSQL + Prisma ORM.

* Smart Date Handling using Date‑Fns.

* UI/UX built with Tailwind, ShadCN UI, and Lucide Icons.

* API communication managed with TanStack React Query.

* Full mobile‑responsive design.

---

## 🛠️ Tech Stack

**Frontend & Backend**: Next.js (App Router)

**Database**: Postgres + Prisma ORM

**Auth**: Clerk

**AI Voice**: Vapi

**Email**: Resend

**UI**: TailwindCSS, shadcn UI, lucide-react

**State & Data Fetching**: TanStack React Query

**Utilities**: date-fns

---

## 📦 Installation

```bash
git clone <repo-url>
cd ai-dental-assistant
npm install
```

---

## 🔑 Environment Variables

Create `.env` file and Add next values:

```
DATABASE_URL=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
VAPI_API_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_VAPI_PROJECT_ID=
```

---

## 🗄️ Database Setup

run migrations:

```bash
npx prisma migrate dev
```

push schema to production:

```bash
npx prisma migrate deploy
```

---

## 🧠 Running the Project

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## 📊 Project Structure

```
/src
  /app
    /admin
    /api
    /appointments
    /dashboard
    /pro
    /voice
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  /components
  /hooks
  /lib
/prisma
/public
.env
middleware.ts
```

---

## 🖥️ Scripts

* `npm run dev` → Start development
* `npm run build` → Build for Production
* `npm start` → Start production build

---

## 📸 Screenshots


---

## 🎥 Demo Video


---

## 📝 License

MIT

---

## ✨ Author

Developed by Mahmoud Qasem — Frontend Developer
