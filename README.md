# NurseInfo - Healthcare Management System

A comprehensive healthcare management system built for nurses and healthcare professionals to efficiently manage patient records, track medical visits, monitor inventory, and conduct risk assessments.

## Features

### Patient Management
- Complete patient registration with demographic information
- Comprehensive medical history tracking (past illnesses, allergies, medications)
- Family medical history and relationship management
- Emergency contact information
- Lifestyle information (smoking, alcohol, exercise, diet)

### Visit Management
- Track patient visits with detailed vital signs
- Record blood pressure, heart rate, temperature, respiratory rate
- Monitor patient weight, height, and BMI calculations
- Document present illness, symptoms, and diagnosis
- Complete visit history for each patient

### Medical Records
- Detailed medical history per patient
- Allergy tracking and medication management
- Previous surgeries and hospitalization records
- Immunization history tracking
- Family medical history documentation

### Inventory Management
- Medicine inventory tracking
- Transaction logging for medicine stock
- Real-time inventory updates
- Medicine usage monitoring

### Risk Assessment
- Comprehensive patient risk assessments
- PDF report generation
- Patient-specific risk evaluation
- Assessment history tracking

### Family Management
- Group patients by family relationships
- Track family medical history
- Manage family member connections
- Family-wide medical pattern analysis

### Event Scheduling
- Healthcare appointment scheduling
- Event management for patients
- Visit scheduling and tracking

## Technology Stack

### Backend
- **Laravel 11** - PHP framework for robust API development
- **Laravel Sanctum** - API authentication system
- **PostgreSQL** - Primary database for data persistence
- **PHP 8.2+** - Modern PHP for enhanced performance

### Frontend
- **React** - Modern JavaScript library for user interface
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

### Development Tools
- **Composer** - PHP dependency management
- **npm** - Node package management
- **Laravel Pint** - PHP code style fixer
- **PHPUnit** - PHP testing framework

## Installation

### Prerequisites
- PHP 8.2 or higher
- Node.js and npm
- PostgreSQL database
- Composer

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd NurseInfo
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   - Configure your PostgreSQL database in `.env`
   - Run migrations:
   ```bash
   php artisan migrate
   ```

5. **Start the Laravel server**
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. **Navigate to React directory**
   ```bash
   cd react
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout

### Patient Management
- `GET /api/patients` - List all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/{id}` - Get patient details
- `PUT /api/patients/{id}` - Update patient information
- `DELETE /api/patients/{id}` - Delete patient record

### Visit Management
- `GET /api/patients/{id}/visits` - Get patient visits
- `POST /api/patients/{id}/visits` - Create new visit
- `GET /api/visits/latest` - Get latest visits across all patients

### Medical Records
- `GET /api/patients/{id}/medical-history` - Get medical history
- `PATCH /api/patients/{id}/medical-history` - Update medical history

### Inventory Management
- `GET /api/medicines` - List medicines
- `POST /api/medicines` - Add new medicine
- `POST /api/inventory-transactions` - Record transaction

### Risk Assessment
- `POST /api/risk-assessments` - Create risk assessment
- `GET /api/patients/{id}/risk-assessments` - Get patient assessments
- `GET /api/risk-assessments/{id}/download` - Download PDF report

## Database Schema

### Core Tables
- **users** - System user accounts
- **patients** - Patient demographic and medical information
- **visits** - Patient visit records and vital signs
- **families** - Family relationship management
- **medicines** - Medicine inventory
- **inventory_transactions** - Stock movement tracking
- **risk_assessments** - Patient risk evaluation records
- **events** - Appointment and event scheduling

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
./vendor/bin/pint
```

### Development Server
```bash
composer run dev
```
This command runs Laravel server, queue worker, logs, and Vite development server concurrently.

## Project Structure

```
├── app/
│   ├── Http/Controllers/Api/    # API controllers
│   ├── Models/                  # Eloquent models
│   └── Http/Requests/          # Form request validation
├── database/
│   └── migrations/             # Database schema migrations
├── routes/
│   └── api.php                 # API route definitions
├── react/                      # React frontend application
│   ├── src/                    # React source code
│   └── public/                 # Static assets
└── resources/                  # Laravel resources
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contact

For questions or support regarding this healthcare management system, please refer to the project documentation or submit an issue through the repository's issue tracker.