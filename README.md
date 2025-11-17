### **Common for Frontend & Backend**

# Mini Dashboard with API Connection

This project demonstrates a mini internal dashboard that fetches, displays, and allows filtering of leads data. It consists of a React + TypeScript frontend and a Strapi backend API.

---

## **Project Overview**

* **Frontend:** React + TypeScript + Tailwind CSS

  * Overview page with a table displaying: Name, Company, Email, Status
  * Status filters (Active / Inactive)
  * Modal to add a new lead
  * Routing implemented via React Router

* **Backend:** Strapi REST API

  * Endpoints:

    * `GET /leads` – fetch all leads
    * `POST /leads` – add a new lead
    * `PUT /leads/:id` – update an existing lead
  * Data stored in SQLite (local database)

* **Deployment:**

  * Backend deployed on a dedicated server (Strapi)
  * Frontend deployed on Vercel

---

## **Decisions & Notes**

* **Tech Choice:**

  * React + TypeScript for type safety and maintainability
  * Tailwind CSS for rapid styling and responsive UI
  * Strapi for a quick REST API solution

* **Data Storage:**

  * SQLite used for simplicity and local development
  * Mock data included for demonstration purposes

* **Routing:**

  * Simple routing with React Router to navigate between pages

---

## **Running Locally**

### **Backend**

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start Strapi:

   ```bash
   npm run develop
   ```
4. API available at: `http://localhost:1337/api/leads`

### **Frontend**

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start development server:

   ```bash
   npm start
   ```
4. Access the app at: `http://localhost:3000`


## **Challenges & Progress**

* Successfully connected frontend to backend API
* Implemented filtering and modal for adding leads
* Main challenge: Ensuring responsive UI with Tailwind
* Midway update: Backend API deployed on dedicated server; frontend ready for Vercel deployment


## **Future Improvements**

* Add authentication and role-based access
* Implement editing and deleting leads
* Enhance UI with better design and interactive elements
* Move to production-ready database like PostgreSQL
