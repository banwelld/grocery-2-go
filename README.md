# Grocery2Go

Grocery2Go is a full-stack e-commerce application designed for a premium grocery shopping experience. It features a React frontend and a Flask-RESTful backend, providing a seamless flow from product discovery to checkout.

## Key Features

### Shopping Experience
- **Interactive Catalog**: Browse a wide range of products with real-time filtering by category and dynamic sorting by price, name, or department.
- **Detailed Product Views**: Access comprehensive information for every item, including origin, description, and pricing.
- **Intuitive Shopping Cart**: Easily add, remove, or adjust product quantities with instant total calculations and visual feedback.

### User Management & Security
- **Role-Based Access Control**: Tailored experiences for Customers, Admins, and Guests.
- **Secure Authentication**: Robust login and registration flows with standardized error handling and session management.
- **Private Profiles**: Secure user profiles at `/my-profile` to manage personal information and view order history.
- **Smart Route Guards**: Proactive navigation guards that protect sensitive routes while providing helpful "nudges" to users.

### Seamless Checkout
- **Unified Checkout Flow**: A multi-step process that guides users through address entry and order confirmation.
- **Persistent Sessions**: Your cart and user data are maintained throughout your session for a frictionless experience.

### Professional Administration
- **Product Management**: Specialized admin views for adding, updating, or removing products from the inventory.
- **System Stability**: Concurrent action controls (using `runExclusive`) to prevent race conditions during updates.

---

## Technical Stack

### Frontend
- **Framework**: React 18+
- **Routing**: React Router 6
- **State Management**: Context API (Feature-based providers for Users, Products, Cart, and Orders)
- **Forms & Validation**: Formik & Yup
- **Styling**: Vanilla CSS with BEM (Block Element Modifier) architecture
- **Feedback**: React Hot Toast for non-intrusive notifications

### Backend
- **Framework**: Flask / Flask-RESTful
- **Database**: SQLite with SQLAlchemy ORM
- **Migrations**: Flask-Migrate
- **Security**: Flask-Bcrypt for password hashing
- **Serialization**: SQLAlchemy-Serializer for consistent API responses

---

## Project Structure

```text
├── client/                # React Frontend
│   ├── src/
│   │   ├── app/           # Main Layout & Global Providers
│   │   ├── components/    # Reusable UI Frames, Forms, and Tables
│   │   ├── config/        # Route Definitions, Constants, and Feedback Tokens
│   │   ├── features/      # Feature-First Modules (Cart, Collection, Order, User)
│   │   └── hooks/         # Custom Business Logic Hooks
├── server/                # Flask Backend
│   ├── app.py             # API Entry Point & Resource Definitions
│   ├── models.py          # SQLAlchemy Database Models
│   ├── config.py          # Flask & Extension Configuration
│   └── seed.py            # Development Database Seeder
```

---

## Installation & Setup

### Backend Setup
1. Navigate to the `server` directory.
2. Install dependencies: `pipenv install`
3. Enter the virtual environment: `pipenv shell`
4. Initialize the database: `flask db upgrade head`
5. (Optional) Seed the database: `python seed.py`
6. Start the server: `python app.py`

### Frontend Setup
1. Navigate to the `client` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

---

## Design Philosophy

Grocery2Go prioritizes **Rich Aesthetics** and **Visual Excellence**.
- **Modern Color Palette**: Uses LCH and OKLCH color spaces for vibrant, harmonized themes.
- **Typography**: Clean, accessible fonts (Baloo 2 and Montserrat) for a premium feel.
- **Micro-interactions**: Smooth transitions and hover effects that make the interface feel alive.
- **Responsive Layouts**: Designed to fill the viewport and adapt to content.

---
*Built by Dave Banwell.*
