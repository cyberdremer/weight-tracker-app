# Weight Tracker

A full-stack weight tracking application built with **React**, **Node.js**, **Express**, and **PostgreSQL**. This app allows users to create accounts, track their weight, and generate personalized diet plans that can be exported as PDFs.

## Features

- User authentication and account management
- Daily weight logging with notes
- Interactive dashboard with weight trend charts
- Personalized AI-generated 7-day diet plans
- Download and manage diet plans as PDF documents
- Responsive and modern UI with Chakra UI and MUI

## Tech Stack

- **Frontend:** React, Chakra UI, MUI, Vite
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL
- **AI Integration:** OpenAI API
- **PDF Generation:** @react-pdf/renderer

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/cyberdremer/online-weight-tracker-app.git
cd online-weight-tracker-app
```


### 2. Setup the backend
```sh
cd back_end
npm install
npx prisma migrate deploy
npm run dev
```


### 3. Setup the frontend
```sh
cd ../front_end
npm install
npm run dev
```

The frontend will be available on [localhost](http://localhost:5173)

## Usage
1. Sign up for an account.
2. Login to the created account.
3. Log your daily weight and notes.
4. View your progress on the dashboard
5. Generate a personalized diet plan with the AI Dietician

