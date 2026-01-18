# BasraTech AI - Future Ready

A modern, enterprise-grade AI solutions platform built with Next.js, Material-UI, and .NET microservices.

![BasraTech AI Hero Section](https://github.com/user-attachments/assets/14e694b8-4741-443d-a0d2-1cc1a7d20bc9)

## 🚀 Features

### Frontend
- **Modern UI** - Built with Material-UI (MUI) for a professional, responsive design
- **Next.js 16** - Server-side rendering with the latest App Router
- **TypeScript** - Full type safety throughout the codebase
- **Authentication** - Login with email, Google OAuth, or Microsoft OAuth
- **MFA Support** - Multi-factor authentication for enhanced security
- **HR Management** - Generate professional salary slips with company letterhead
- **Staff Onboarding** - Complete employee onboarding and information management (Admin)
- **Time Tracking** - Staff login/logout, break management, and work hours tracking
- **Dashboard & Analytics** - Monthly summaries with charts for work hours and attendance
- **Holiday Management** - System admin can manage company holidays and recurring holidays

### Backend Microservices
- **User Service** - Authentication, authorization, and user management
- **HR Service** - Employee management, salary slip generation, staff onboarding, and time tracking
- **API Gateway** - YARP-based reverse proxy for routing and load balancing
- **CQRS Pattern** - Separation of read and write operations
- **PostgreSQL** - Reliable relational database for legacy data persistence
- **MongoDB** - Document storage for flexible staff and time tracking data models
- **RabbitMQ** - Message bus for inter-service communication

## 📋 Sections

### Frontend Pages
- **Header** - Fixed navigation with smooth scroll links
- **Hero** - Eye-catching landing section with CTA buttons
- **About** - Company overview with key achievements
- **Services** - AI service offerings with interactive cards
- **Features** - Platform capabilities and highlights
- **Testimonials** - Client testimonials with ratings
- **Contact** - Contact form and company information
- **Footer** - Comprehensive footer with links and social media
- **Login** - User authentication with OAuth support
- **Register** - User registration with MFA setup
- **HR Dashboard** - Admin-only salary slip generation
- **Staff Management** - Admin-only staff onboarding and management
- **Holiday Management** - Admin-only company holiday configuration
- **Staff Dashboard** - Personal time tracking and work hours analytics

### Backend Services
- **User Service** - `/api/auth/*`, `/api/users/*`
- **HR Service** - `/api/employees/*`, `/api/salary-slips/*`, `/api/payroll/*`, `/api/staff/*`, `/api/timetracking/*`, `/api/holidays/*`
- **API Gateway** - Unified entry point at port 5000

## 🛠️ Tech Stack

### Frontend
- [Next.js 16](https://nextjs.org/) - React framework for production
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Material-UI (MUI)](https://mui.com/) - React component library
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation

### Backend
- [.NET 8](https://dotnet.microsoft.com/) - Backend framework
- [PostgreSQL](https://www.postgresql.org/) - Primary database
- [MongoDB](https://www.mongodb.com/) - Document database
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker
- [YARP](https://microsoft.github.io/reverse-proxy/) - Reverse proxy
- [MediatR](https://github.com/jbogard/MediatR) - CQRS implementation
- [Entity Framework Core](https://docs.microsoft.com/ef/) - ORM

### DevOps
- [Docker](https://www.docker.com/) - Containerization
- [Docker Compose](https://docs.docker.com/compose/) - Multi-container orchestration
- [Azure DevOps](https://azure.microsoft.com/services/devops/) - CI/CD pipelines
- [Azure Container Apps](https://azure.microsoft.com/services/container-apps/) - Deployment

## 📦 Installation

### Prerequisites
- Node.js 20+ and npm
- .NET 8.0 SDK
- Docker and Docker Compose
- PostgreSQL (if running without Docker)
- RabbitMQ (if running without Docker)

### Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/learntocodegpt4/basratechai.git
cd basratechai
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start all services:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:5000
- RabbitMQ Management: http://localhost:15672

### Development Setup

#### Frontend Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

#### Backend Development

```bash
# User Service
cd backend/UserService
dotnet restore
dotnet run

# HR Service
cd backend/HRService
dotnet restore
dotnet run

# API Gateway
cd backend/ApiGateway
dotnet restore
dotnet run
```

## 🏗️ Project Structure

```
basratechai/
├── src/                          # Frontend source code
│   ├── app/                      # Next.js app directory
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── hr/                   # HR management pages
│   │   │   └── salary-slip/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/               # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── MuiProvider.tsx
│   └── theme/                    # MUI theme configuration
│       └── theme.ts
├── backend/                      # Backend microservices
│   ├── UserService/              # User authentication service
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── README.md
│   ├── HRService/                # HR management service
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── README.md
│   └── ApiGateway/               # YARP API Gateway
│       ├── src/
│       ├── Dockerfile
│       └── README.md
├── public/                       # Static assets
│   └── Main_Logo.png
├── docker-compose.yml            # Docker orchestration
├── Dockerfile.frontend           # Frontend Docker build
├── azure-pipelines.yml           # Azure DevOps CI/CD
├── package.json
├── next.config.ts
└── tsconfig.json
```

## 🎨 Design

The application follows a modern dark theme with:
- Dark background (#0a1628)
- Cyan/Blue gradient accents (#22d3ee to #6366f1)
- Material-UI components with custom theming
- Smooth animations and transitions
- Fully responsive design
- Card-based layouts

## 🔐 Authentication

### Supported Methods
- Email/Password with JWT tokens
- Multi-Factor Authentication (MFA)
- Google OAuth 2.0
- Microsoft OAuth 2.0

### Security Features
- JWT token-based authentication
- Secure password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Admin role-based access control

## 📄 HR Management

### Salary Slip Generation
- Professional PDF generation with company letterhead
- Includes all required details:
  - Company name and logo
  - GSTIN number
  - Proprietor name
  - Employee details
  - Salary breakdown (earnings and deductions)
  - Work days and leave days calculation
- Automatic calculation of PF and tax
- Download as PDF

### Staff Onboarding & Management (Admin)
- Complete employee onboarding with comprehensive information capture
- Personal details: Name, Email, Phone, Designation, Department, Joining Date, Address
- Emergency contact information
- Bank account details for salary processing
- Document management
- Staff status management (Active/Inactive)
- Search and filter capabilities

### Time Tracking System (Staff)
- **Login/Logout**: Track daily work start and end times
- **Break Management**: 
  - Break In: Start a break with optional type (Tea Break, Lunch Break, etc.) and comments
  - Break Out: Resume work and automatically calculate break duration
- **Real-time Status**: View current work status (Logged In, On Break, Logged Out)
- **Today's Summary**: Live view of work hours, break hours, and net work hours
- **Monthly Dashboard**:
  - Total work days for the month
  - Total work hours, break hours, and net work hours
  - Average work hours per day
  - Expected work days (excluding weekends and holidays)
  - Interactive charts showing daily work trends
  - Bar charts for work vs break hours comparison

### Holiday Management (Admin)
- Add company holidays with name, date, and description
- Mark holidays as recurring (applies every year)
- View all holidays in a sortable table
- Holidays are automatically excluded from work day calculations

### Company Details
- **Name**: BasraTech AI
- **Location**: Mumbai, India
- **GSTIN**: 27AABCU9603R1ZM
- **Proprietor**: Amreek Basra
- **Email**: amreekbasra@basratechai.com

## 🐳 Docker Deployment

### Services
- **postgres-user** (Port 5432) - User service database
- **postgres-hr** (Port 5433) - HR service database
- **mongodb** (Port 27017) - Document storage
- **rabbitmq** (Port 5672, 15672) - Message broker
- **user-service** (Port 5001) - Authentication service
- **hr-service** (Port 5002) - HR management service
- **api-gateway** (Port 5000) - API gateway
- **frontend** (Port 3000) - Next.js application

### ARM64 Support
All Docker images are built with multi-platform support for ARM64 (Apple Silicon) and AMD64.

## 🚀 CI/CD with Azure DevOps

### Pipeline Stages
1. **Build** - Build and test all services
2. **Deploy Dev** - Deploy to development environment
3. **Deploy Prod** - Deploy to production environment

### Environments
- **Development**: Triggered on `develop` branch
- **Production**: Triggered on `main` branch

### Setup
1. Create Azure Container Registry
2. Create service connection in Azure DevOps
3. Configure pipeline variables
4. Push to trigger deployment

## 📝 Environment Variables

### Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend Services
```
# Database
POSTGRES_PASSWORD=postgres123
DATABASE_HOST=localhost
DATABASE_PORT=5432

# JWT
JWT_SECRET=your-super-secret-key

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# RabbitMQ
RABBITMQ_USER=admin
RABBITMQ_PASSWORD=rabbitmq123
```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👥 Contact

- **Website**: [BasraTech AI](https://basratechai.com)
- **Email**: amreekbasra@basratechai.com
- **Location**: Mumbai, India

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

For detailed documentation on each service, see:
- [User Service Documentation](backend/UserService/README.md)
- [HR Service Documentation](backend/HRService/README.md)
- [API Gateway Documentation](backend/ApiGateway/README.md)

## 🔄 Version History

- **v1.0.0** - Initial release with MUI migration and microservices architecture
  - Replaced Tailwind CSS with Material-UI
  - Added authentication system with MFA, Google, and Microsoft OAuth
  - Implemented HR salary slip generation system
  - Created .NET microservices with CQRS pattern
  - Configured Docker containerization
  - Setup Azure DevOps CI/CD pipelines