# Staff Onboarding and Time Tracking System

## Overview

This document describes the new staff onboarding and time tracking system added to BasraTech AI. The system provides comprehensive employee management, time tracking, and analytics features designed for a consultancy company.

## Features

### 1. Staff Onboarding (Admin Only)

**Purpose**: Allow administrators to onboard new employees with complete information capture.

**Access**: `/hr/staff-management`

**Capabilities**:
- Create new staff records with comprehensive information:
  - Personal Details: Staff ID, Name, Email, Phone Number, Designation, Department, Joining Date, Address
  - Emergency Contact: Name, Relationship, Phone Number
  - Bank Details: Bank Name, Account Holder Name, Account Number, IFSC Code
  - Document Management: Upload and store employee documents
- View all staff members in a sortable table
- Filter active/inactive staff
- Update staff information
- Manage staff status (Active/Inactive)

**API Endpoints**:
- `POST /api/staff/onboard` - Create new staff member
- `GET /api/staff` - List all staff
- `GET /api/staff/{id}` - Get staff by ID
- `GET /api/staff/user/{userId}` - Get staff by user ID
- `PUT /api/staff/{id}` - Update staff information

### 2. Time Tracking System (Staff Members)

**Purpose**: Enable staff to track their daily work hours, breaks, and view attendance analytics.

**Access**: `/staff/dashboard`

**Capabilities**:

#### Daily Time Tracking
- **Login**: Record the start of work day
  - Automatically creates a time log entry for the current date
  - Can update if already logged in today
- **Logout**: Record the end of work day
  - Calculates total work hours
  - Calculates net work hours (work hours - break hours)
  - Updates time log status
- **Break In**: Start a break
  - Optional break type (Tea Break, Lunch Break, etc.)
  - Optional comment field for break reason
  - Updates status to "On Break"
- **Break Out**: Resume work after break
  - Automatically calculates break duration
  - Updates total break time
  - Returns status to "Logged In"

#### Real-time Status Display
- Current work status with color-coded badges:
  - 🟢 Logged In (Green)
  - 🟡 On Break (Orange)
  - 🔴 Logged Out (Red)
- Today's work summary:
  - Total work hours
  - Total break hours
  - Net work hours (actual productive time)

#### Monthly Analytics Dashboard
- **Summary Cards**:
  - Total Work Days: Days actually worked in the month
  - Total Work Hours: Sum of all work hours
  - Average Hours/Day: Average productive hours per working day
  - Expected Work Days: Total business days (excludes weekends and holidays)

- **Interactive Charts**:
  - Line Chart: Daily work hours trend over the month
  - Bar Chart: Work hours vs break hours comparison
  - Color-coded data points for better visualization

- **Work Day Calculations**:
  - Automatically excludes weekends (Saturday, Sunday)
  - Automatically excludes company holidays
  - Shows actual working days vs expected working days

**API Endpoints**:
- `POST /api/timetracking/login` - Log in (start work)
- `POST /api/timetracking/logout` - Log out (end work)
- `POST /api/timetracking/break-in` - Start a break
- `POST /api/timetracking/break-out` - End a break
- `GET /api/timetracking/today/{staffId}` - Get today's time log
- `GET /api/timetracking/logs/{staffId}?startDate={date}&endDate={date}` - Get time logs for date range
- `GET /api/timetracking/summary/{staffId}/{year}/{month}` - Get monthly summary with analytics

### 3. Holiday Management (Admin Only)

**Purpose**: Allow administrators to manage company holidays that affect work day calculations.

**Access**: `/hr/holidays`

**Capabilities**:
- Add new holidays with:
  - Holiday name
  - Date
  - Recurring flag (for annual holidays like Independence Day)
  - Optional description
- View all holidays in a sortable table
- Color-coded badges for holiday types:
  - 🔄 Recurring (Blue)
  - 📅 One-time (Green)
- Holidays are automatically considered in work day calculations

**API Endpoints**:
- `POST /api/holidays` - Add a new holiday
- `GET /api/holidays` - Get all holidays
- `GET /api/holidays?startDate={date}&endDate={date}` - Get holidays for date range
- `GET /api/holidays/{year}/{month}` - Get holidays for specific month

## Technical Architecture

### Backend

**Technology Stack**:
- .NET 10.0
- MongoDB for document storage (Staff, TimeLog, Holiday entities)
- PostgreSQL for legacy Employee/SalarySlip data
- CQRS pattern with MediatR
- RESTful API design

**Database Schema**:

**MongoDB Collections**:

1. **staff**
   - Personal information
   - Emergency contact
   - Bank details
   - Document references
   - Active/inactive status

2. **timelogs**
   - Daily work records
   - Login/logout timestamps
   - Break logs (array of break periods)
   - Calculated work hours
   - Status (LoggedIn, OnBreak, LoggedOut)

3. **holidays**
   - Holiday name and date
   - Recurring flag
   - Description
   - Created by (admin reference)

4. **workhourssummary** (future use)
   - Pre-calculated monthly summaries
   - Performance optimization

**CQRS Commands**:
- `OnboardStaffCommand` - Create new staff
- `UpdateStaffCommand` - Update staff info
- `LoginTimeCommand` - Record login
- `LogoutTimeCommand` - Record logout
- `BreakInCommand` - Start break
- `BreakOutCommand` - End break
- `AddHolidayCommand` - Add holiday

**CQRS Queries**:
- `GetStaffByIdQuery` - Get staff details
- `GetStaffByUserIdQuery` - Get staff by user ID
- `GetAllStaffQuery` - List all staff
- `GetTodayTimeLogQuery` - Get today's time log
- `GetTimeLogsQuery` - Get time logs for range
- `GetMonthlyTimeLogSummaryQuery` - Get monthly analytics
- `GetHolidaysQuery` - Get holidays
- `GetMonthHolidaysQuery` - Get month holidays

### Frontend

**Technology Stack**:
- Next.js 16 with App Router
- React 19
- Material-UI (MUI) v7
- TypeScript
- Recharts for data visualization

**Pages**:
1. `/hr/staff-management` - Admin staff management
2. `/hr/holidays` - Admin holiday management
3. `/staff/dashboard` - Staff time tracking and analytics

**Components**:
- Staff onboarding form with validation
- Time tracking control panel
- Real-time status indicators
- Interactive charts (Line and Bar)
- Data tables with sorting and filtering

## User Flows

### Admin: Onboard New Staff
1. Navigate to `/hr/staff-management`
2. Click "Onboard New Staff"
3. Fill in the comprehensive form:
   - Required: Staff ID, User ID, Name, Email, Designation, Department, Joining Date
   - Optional: Phone, Address, Emergency Contact, Bank Details
4. Submit form
5. Staff appears in the table
6. Staff can now access the system using their User ID

### Staff: Daily Work Tracking
1. Staff logs into the system
2. Navigate to `/staff/dashboard`
3. Morning:
   - Click "Login" button to start work day
   - Status changes to "Logged In"
4. Mid-day:
   - Click "Break In" to start lunch
   - Optionally add break type and comment
   - Status changes to "On Break"
   - Click "Break Out" to resume work
   - Status returns to "Logged In"
5. Evening:
   - Click "Logout" to end work day
   - System calculates and displays total work hours
   - Status changes to "Logged Out"
6. View today's summary and monthly analytics

### Admin: Manage Holidays
1. Navigate to `/hr/holidays`
2. Click "Add New Holiday"
3. Fill in holiday details:
   - Name (e.g., "Diwali", "Independence Day")
   - Date
   - Check "Recurring" if it repeats annually
   - Optional description
4. Submit form
5. Holiday appears in table
6. Holiday is excluded from work day calculations

## Business Rules

### Work Hours Calculation
- **Total Work Hours** = Logout Time - Login Time
- **Total Break Hours** = Sum of all break durations
- **Net Work Hours** = Total Work Hours - Total Break Hours

### Work Days Calculation
- **Expected Work Days** = Days in Month - Weekends - Holidays
- **Actual Work Days** = Days with completed time logs (login + logout)
- **Weekends**: Saturday and Sunday are automatically excluded
- **Holidays**: Company holidays (from holidays collection) are excluded

### Status Management
- Cannot logout without logging in
- Cannot break out without breaking in
- Cannot start a new break while already on break
- Can only have one active break at a time
- Login time is required before any other action

## Integration with Existing Systems

### User Service Integration
- Staff records reference User IDs from the authentication system
- User roles determine access:
  - Admin: Can access `/hr/staff-management` and `/hr/holidays`
  - Staff: Can access `/staff/dashboard`

### HR Service Integration
- Time tracking data can be used for:
  - Payroll processing
  - Attendance reports
  - Performance evaluation
  - Work hour verification

## Security Considerations

1. **Authentication Required**: All endpoints require valid JWT tokens
2. **Role-Based Access**: Admin-only endpoints are protected
3. **Data Validation**: Input validation on both frontend and backend
4. **MongoDB Security**: Connection secured with authentication
5. **CORS Configuration**: Restricted to allowed origins only

## Future Enhancements

### Potential Features
1. **Leave Management**: Integration with leave/vacation system
2. **Overtime Tracking**: Automatic overtime calculation
3. **Notifications**: Remind staff to login/logout
4. **Reports**: Export time tracking data to Excel/PDF
5. **Mobile App**: Native mobile app for easier time tracking
6. **Geofencing**: Location-based login/logout
7. **Approval Workflow**: Manager approval for time corrections
8. **Integration**: Connect with payroll systems
9. **Analytics**: Advanced analytics and predictive insights
10. **Shift Management**: Support for different work shifts

## Deployment

### Environment Variables

**HRService**:
```bash
MongoDB__ConnectionString=mongodb://admin:password@mongodb:27017
MongoDB__DatabaseName=basratech_hr
```

**Docker Compose**:
MongoDB service is already configured in `docker-compose.yml` with health checks.

### Database Initialization
- MongoDB collections are created automatically on first use
- No migrations needed (schema-less NoSQL database)

## API Documentation

Full API documentation is available via Swagger UI:
- Development: http://localhost:5002/swagger
- Production: Configured in API Gateway

## Support and Troubleshooting

### Common Issues

**Issue**: Staff cannot login
- **Solution**: Verify User ID exists in User Service
- **Solution**: Check staff is marked as Active

**Issue**: Time log not showing
- **Solution**: Ensure MongoDB connection is working
- **Solution**: Check staff ID is correct

**Issue**: Holidays not excluded
- **Solution**: Verify holiday date format is correct
- **Solution**: Check holiday is in the database

### Logs
Check application logs for detailed error messages:
```bash
docker logs basratech-hr-service
```

## Contact
For technical support or feature requests, contact the development team.

---
**Last Updated**: January 2026
**Version**: 1.0.0
