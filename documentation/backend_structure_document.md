# Luxe Nails Spa Backend Structure Document

This document provides a clear overview of the backend setup for the Luxe Nails Spa website. It covers the architecture, any data handling, hosting environment, infrastructure components, security, and maintenance practices. The language is kept simple so anyone can understand how the backend works.

## 1. Backend Architecture

- **Static Site Generation (SSG) & Incremental Static Regeneration (ISR)**
  - All public pages (Home, Services, Gallery, Contact Us) are built ahead of time.  
  - Users receive fast, ready-to-serve HTML files from a global network of servers (CDN).
  - When content changes, only the updated pages rebuild, keeping deployment quick and efficient.

- **Serverless Functions (API Routes)**
  - One lightweight endpoint handles contact form submissions (`POST /api/contact`).  
  - Each API call spins up a small, on-demand function—no always-on server is needed.
  - This pattern scales automatically: more visitors simply trigger more function instances.

- **Node.js Build Process**
  - During development or on each code push, Node.js runs the build tasks (compiling TypeScript, optimizing images, generating pages).  
  - After build completes, assets and serverless functions are deployed together.

How this supports project goals:
- **Scalability:** Static pages plus serverless functions handle any amount of traffic without manual server resizing.
- **Maintainability:** All backend logic (just one API function) lives alongside the frontend code, keeping the codebase simple.
- **Performance:** Pre-built pages and global CDN ensure fast loading, while serverless functions respond quickly to form submissions.

## 2. Database Management

In this initial version, there is no traditional database.
- All public content is static HTML, CSS, and JavaScript files.
- Contact form submissions are not stored in a database; they are forwarded via email or sent to a simple third-party service (see API Design).

Future plans may include:
- Adding a lightweight NoSQL database (e.g., MongoDB Atlas or Firebase Firestore) to store inquiries.
- Introducing a SQL database (e.g., Postgres) if the site evolves to include user accounts or bookings.

## 3. Database Schema

Currently, this phase does not use a database. However, if we add one later, a simple schema for storing contact inquiries might look like:

For a SQL database (PostgreSQL):
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

For a NoSQL database (e.g., Firestore or MongoDB):
- Collection: `contact_submissions`
- Document shape:
  - `name`: string
  - `email`: string
  - `phone`: string
  - `message`: string
  - `submittedAt`: timestamp

## 4. API Design and Endpoints

We use a single RESTful endpoint to handle the contact form:

- **POST /api/contact**
  - **Purpose:** Receive form data (name, email, phone, message) from the frontend.
  - **Request Body (JSON):**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "123-456-7890",
      "message": "I’d like to book an appointment."
    }
    ```
  - **Behavior:**
    - Validate required fields and correct email format.
    - Forward the message to the spa’s email address using an email service (e.g., SendGrid or Mailgun).
    - Respond with a JSON status:
      - Success: `{ "status": "success" }`
      - Error: `{ "status": "error", "message": "Invalid input" }`

This single endpoint keeps the backend simple yet fulfills the core need of handling inquiries.

## 5. Hosting Solutions

- **Vercel Platform**
  - Automatically builds and deploys the site whenever code is pushed to GitHub.
  - Serves static assets (HTML, CSS, JS) via a global CDN for fast load times everywhere.
  - Runs serverless functions (API routes) in response to requests—no manual server setup.

Benefits:
- **Reliability:** Vercel manages uptime, SSL certificates, and scaling.
- **Scalability:** Serverless functions grow with traffic; static pages are cached worldwide.
- **Cost-effectiveness:** You pay only for build minutes and actual function executions; there’s no dedicated server cost.

## 6. Infrastructure Components

- **Content Delivery Network (CDN)**
  - Cached static files distributed globally to minimize latency.

- **Serverless Function Runtime**
  - Each API call triggers a lightweight Node.js environment.

- **Build & Deployment Pipeline**
  - GitHub ⟶ Vercel: Automatic builds, previews, and production deploys.

- **DNS & SSL**
  - Managed by Vercel: automatic HTTPS ensures secure connections.

Together, these components deliver a smooth experience: pages load near-instantly, and form submissions happen without delays.

## 7. Security Measures

- **HTTPS Everywhere**
  - Vercel provides SSL certificates and redirects all traffic to HTTPS.

- **Input Validation**
  - The contact API checks for required fields and enforces valid email formats.
  - A hidden “honeypot” field helps block automated spam bots.

- **Environment Variables**
  - API keys (email service, any future databases) live in Vercel’s secure environment, never in code.

- **Rate Limiting (Future)**
  - Can be added per-function to prevent abuse.

- **CORS Policies**
  - The API only accepts requests from the official site domain to avoid cross-site attacks.

These measures protect user data and ensure the spa’s contact form isn’t misused.

## 8. Monitoring and Maintenance

- **Error Logging**
  - Serverless function errors appear in Vercel’s dashboard.

- **Performance Metrics**
  - Vercel Analytics tracks page load times, bandwidth, and request counts.

- **Health Checks**
  - Automated uptime monitoring can be added (e.g., with Pingdom or UptimeRobot) to alert if the site goes down.

- **Dependency Updates**
  - Regularly review and update npm packages to patch security issues.

- **Code Reviews & CI**
  - Pull requests in GitHub trigger preview deployments for easy testing before merging.

- **Backups (Future)**
  - If a database is added, schedule automatic backups and test restores.

These practices ensure the backend stays reliable and any issues are caught quickly.

## 9. Conclusion and Overall Backend Summary

The Luxe Nails Spa backend is designed to be as simple and efficient as possible:

- **Static-first approach** delivers fast pages to every visitor.
- **Serverless API** covers the essential need for contact form handling without a dedicated server.
- **Vercel hosting** provides automatic builds, global CDN, and secure HTTPS out of the box.
- **Minimal data storage** keeps the scope lean, with clear future paths to add a database or more endpoints.
- **Security and monitoring** measures guard user data and ensure smooth operation.

This setup aligns perfectly with the project’s goals: a fast, reliable, and easy-to-maintain website that welcomes visitors and handles inquiries smoothly, all without unnecessary backend complexity. Future growth—such as bookings, user accounts, or analytics—can plug into this foundation when the time is right.