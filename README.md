## Deployed link

```
https://product-dashboard-neon.vercel.app/
```

##  Prerequisites

- Node.js 18.x or higher
- npm, yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DilinJose/productDashboard.git
```

### 2. Install Dependencies

Using yarn:
```bash
yarn install
```

### 3. Run Development Server

```bash
yarn dev
```

### 4. Open the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


## Project Structure

```
crud/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   └── login/           # Login/Register/OTP pages
│   ├── (protected)/         # Protected routes
│   │   ├── dashboard/       # Product catalog
│   │   ├── order-list/      # User orders
│   │   └── order-success/   # Order confirmation
│   ├── api/                 # Next.js API routes (proxies)
│   │   ├── verify/          # OTP verification
│   │   ├── login-register/  # User registration
│   │   ├── new-products/    # Product listing
│   │   ├── purchase-product/# Purchase endpoint
│   │   └── user-orders/     # User orders API
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility libraries
│   │   ├── auth.ts          # Authentication helpers
│   │   └── axios.ts         # API client configuration
│   ├── service/             # API service layer
│   ├── store/               # Zustand stores
│   └── types/               # TypeScript types
├── middleware.ts            # Route protection middleware
├── next.config.ts           # Next.js configuration
└── package.json
```


## Tech Decisions

### Framework & Runtime

**Next.js 16.1.1 (App Router)**
- **Reason**: Modern React framework with built-in routing, API routes, and server-side capabilities
- **Benefits**: File-based routing, server components, optimized performance, seamless deployment

**React 19.2.3**
- **Reason**: Latest React version with improved performance and developer experience
- **Benefits**: Concurrent features, better hydration, improved hooks

**TypeScript 5**
- **Reason**: Type safety and improved developer experience
- **Benefits**: Catch errors at compile time, better IDE support, self-documenting code

### Styling

**Tailwind CSS 4**
- **Reason**: Utility-first CSS framework for rapid UI development
- **Benefits**: Consistent design system, small bundle size, responsive design utilities

### State Management

**Zustand 5.0.9**
- **Reason**: Lightweight, simple state management solution
- **Benefits**: Minimal boilerplate, TypeScript support, persist middleware for localStorage
- **Usage**: User store and order store for client-side state

### HTTP Client

**Axios 1.13.2**
- **Reason**: Popular HTTP client with interceptors and better error handling
- **Benefits**: Request/response interceptors for token injection, automatic JSON parsing
- **Configuration**: Base URL configured, Authorization header automatically added via interceptor

### Animation

**GSAP 3.14.2 + @gsap/react**
- **Reason**: Powerful animation library for smooth UI interactions
- **Benefits**: High performance, cross-browser compatibility, React integration
