# Travel Guide App

A full-stack web application that connects travellers with local guides, helping users discover destinations, explore places, and arrange guided travel experiences.

The platform provides a foundation for connecting visitors with guides through a web-based interface, with support for user roles, booking management, and destination-related information.

## Features

### User Management
- Support for visitors, guides, and administrators.
- User registration and authentication.
- User profiles associated with cities.
- Role-based user management.

### Destination Discovery
- Browse cities and places.
- Explore destination-related information and images.
- Highlight featured places.
- Organize travel experiences by destination.

### Booking Management
- Create and manage travel bookings.
- Associate bookings with visitors, guides, and cities.
- Configure booking plans with pricing and duration.
- Store booking dates and related payment information.

### Guide Management
- Support dedicated guide accounts.
- Associate guides with visitor bookings.
- Allow users to rate guides.
- Provide a reporting mechanism for user concerns.

### Payment Integration
- Integration with Khalti Checkout for payment processing.

## Technology Stack

### Frontend
- React 18
- React Router
- Redux Toolkit
- React Redux
- Ant Design
- Bootstrap 5
- Sass
- Formik and Yup
- Khalti Checkout

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL
- bcrypt
- Axios
- Helmet
- Express Validator
- Multer

## Architecture

The project is organized into separate frontend and backend applications.

```text
travel-guide-app/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── index.js
│   │   └── app.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

The backend provides the application server and database access, while the React frontend handles the user interface and client-side navigation.

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MySQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Thefakedeal/travel-guide-app.git
cd travel-guide-app
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory.

Configure your MySQL connection using Prisma's `DATABASE_URL` environment variable:

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/travel_guide"
PORT=5000
```

Replace the placeholders with your local database credentials and create the corresponding MySQL database.

### 3. Set Up the Database

Generate the Prisma client:

```bash
npx prisma generate
```

If the repository contains an appropriate Prisma migration history, apply the migrations:

```bash
npx prisma migrate deploy
```

For a local development database without existing migrations, review the Prisma schema and use an appropriate development migration before running the application.

If the project is configured for database seeding, you can populate the database with:

```bash
npx prisma db seed
```

The seed command requires the project's seed script and database configuration to be available.

### 4. Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The backend is configured to listen on port `5000` by default.

### 5. Configure the Frontend

Open a separate terminal and navigate to the frontend directory:

```bash
cd travel-guide-app/frontend
npm install
```

The frontend package configuration proxies API requests to:

```text
http://localhost:5000
```

Make sure the backend is running before using features that require API access.

### 6. Start the Frontend

Run:

```bash
npm start
```

The React development server will start. Open the local URL displayed in your terminal, typically:

http://localhost:3000

## Database Overview

The Prisma schema defines models for the main entities in the application.

| Model | Purpose |
|---|---|
| User | Stores user information and roles |
| City | Represents cities associated with users and destinations |
| Place | Represents places within a city |
| Image | Stores image references for places |
| Experience | Represents experience categories |
| Booking | Stores booking information |
| BookingPlan | Defines booking plans, durations, and prices |
| Rating | Stores guide ratings |
| Report | Stores reports submitted about guides |
| Event | Stores city-associated events |
| Token | Stores authentication-related tokens |

The database uses MySQL, with Prisma providing the object-relational mapping layer.

## Development

### Backend

Start the backend in development mode:

```bash
cd backend
npm run dev
```

Start it without the development watcher:

```bash
npm start
```

### Frontend

Start the React development server:

```bash
cd frontend
npm start
```

Create an optimized frontend production build:

```bash
npm run build
```

## Future Improvements

Potential areas for further development include:

- Advanced destination search and filtering.
- Improved guide discovery and profile pages.
- Booking history and itinerary management.
- Enhanced booking status and cancellation workflows.
- Comprehensive automated testing.
- Improved accessibility and responsive design.
- Production deployment and monitoring.

These are potential enhancements rather than a list of existing features.

## Author

**Samir Shrestha**

- GitHub: [@Thefakedeal](https://github.com/Thefakedeal)
- LinkedIn: [Samir Shrestha](https://www.linkedin.com/in/samir-shrestha-16050a210)
- Portfolio: [samirshrestha.info.np](https://samirshrestha.info.np)

---

Developed with React, Node.js, Express, Prisma, and MySQL.
