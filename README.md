# SereneScribe | Your AI-Powered Wellness Journal

<div align="center">
  <img src="public/vite.svg" alt="SereneScribe Logo" width="100"/>
</div>

**Live Demo: [serene-scribe.vercel.app](https://serene-scribe.vercel.app/)**

**SereneScribe** is a full-stack web application designed to help users track their mental wellbeing through daily journaling. It leverages AI to provide emotional analysis, allowing users to discover patterns and gain deeper insights into their feelings over time.

This project was built from the ground up, demonstrating a complete development lifecycle from backend API creation to frontend deployment and asynchronous task handling.

---

## ✨ Key Features

* **Secure User Authentication**: Users can register and log in securely using a JWT-based authentication system.
* **CRUD for Journal Entries**: A complete Create, Read, Update, and Delete interface for managing journal entries with pagination.
* **AI-Powered Emotion Analysis**: Each journal entry is automatically analyzed by an AI model (via the Hugging Face API) to determine the dominant emotion.
* **Dynamic Data Visualization**: Interactive charts display the user's mood trends and emotion distribution over time based on their entries.
* **Responsive Design**: A modern and clean UI that works seamlessly on both desktop and mobile devices.
* **Asynchronous Processing**: AI analysis is handled as a background task to ensure a fast and responsive user experience when saving new entries.

---

## 🛠️ Tech Stack

This project utilizes a modern, robust, and scalable tech stack.

* **Frontend**:
    * **Framework**: React (with Vite) & TypeScript
    * **Styling**: Tailwind CSS & Shadcn/UI
    * **State Management**: React Context API
    * **Data Fetching**: Axios
    * **Animations**: Framer Motion

* **Backend**:
    * **Framework**: Java & Spring Boot
    * **Database**: MongoDB Atlas (NoSQL)
    * **Security**: Spring Security with JWT
    * **AI Integration**: Hugging Face Inference API (`SamLowe/roberta-base-go_emotions`)

* **Deployment**:
    * **Frontend**: Vercel
    * **Backend**: Render (using a Docker container)

---

## 🚀 Local Setup & Installation

To run this project on your local machine, you will need two separate terminal windows.

### Backend (Java Spring Boot)
1.  Clone the backend repository.
2.  Navigate to the project root.
3.  Set the required environment variables (`SPRING_DATA_MONGODB_URI`, `JWT_SECRET`, `HUGGINGFACE_API_TOKEN`).
4.  Build the application using the Maven wrapper: `./mvnw clean package`
5.  Run the application: `java -jar target/your-app-name.jar`

### Frontend (React)
1.  Clone the frontend repository.
2.  Navigate to the project root.
3.  Install dependencies: `npm install`
4.  Create a `.env.local` file and set `VITE_API_BASE_URL=http://localhost:8080/api`.
5.  Start the development server: `npm run dev`

---

## ⚠️ A Note on Deployment & Cold Starts

Both the frontend and backend for this project are deployed on free-tier hosting services (Vercel and Render, respectively). As a result:

* **Backend Wake-Up Time**: If the backend has been inactive for a period (usually 15 minutes), it will go to sleep to conserve resources. The first API request will "wake it up," which may cause an initial delay of **up to 30-40 seconds**. After this first request, the application will be fast and responsive.
* **AI Model Cold Start**: Similarly, the Hugging Face API uses a serverless model on the free tier. The first time a journal entry is created after a period of inactivity, the AI model has a "cold start" and can take 10-20 seconds to process. This is handled asynchronously on the backend, so it does not block the user, but the emotion analysis for that first entry will take a moment to appear.

This implementation demonstrates an understanding of the limitations of free-tier services and the use of professional patterns (like asynchronous processing) to handle them gracefully.
