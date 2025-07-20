# crm-heist

A modern, full-stack CRM dashboard for Indian e-commerce businesses. Built with Next.js, Tailwind CSS, MongoDB, Firebase, and JWT authentication.

## Features

- **Authentication**
  - Email/password login with JWT
  - Google Sign-In via Firebase
  - Signup and password reset flows
- **Dashboard**
  - Flush, gapless layout with sidebar navigation
  - Overview cards for key business metrics
  - Real-time analytics and visualizations
- **Customer Management**
  - Add, edit, search, and filter customers
  - View customer details, contact info, region, status, and order history
- **Order Management**
  - Track orders, fulfillment status, and returns
- **Support Tickets**
  - Manage customer support requests and resolutions
- **Marketing Campaigns**
  - Create and monitor email, SMS, and social media campaigns
- **User Management**
  - Admin-only user administration
  - Role-based access control
- **Analytics**
  - KPI cards, charts, and marketing metrics dashboard

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API routes, MongoDB, JWT, bcrypt
- **Authentication:** Firebase Authentication, JWT
- **Database:** MongoDB
- **UI Components:** Custom reusable components
- **State Management:** React Context, useState, useEffect
- **Styling:** Tailwind CSS, CSS variables

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/coderheist/india-ecom-crm.git
   cd india-ecom-crm
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   pnpm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your MongoDB, Firebase, and JWT config.
4. **Run the development server:**
   ```sh
   npm run dev
   # or
   pnpm dev
   ```
5. **Open in browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
india-ecom-crm/
  app/
    dashboard/
    login/
    signup/
    forgot-password/
    ...
  components/
    customer-management.jsx
    dashboard.jsx
    ...
  lib/
    auth.js
    firebase.js
    ...
  public/
  styles/
  README.md
  package.json
  ...
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

**Project by [coderheist](https://github.com/coderheist)**
