# Database Migrations

This directory contains PostgreSQL database migration files.

## Running Migrations

### Using psql

```bash
psql -U your_username -d your_database -f migrations/001_initial_schema.sql
```

### Using Environment Variable

```bash
psql $DATABASE_URL -f migrations/001_initial_schema.sql
```

### Using Node.js Script (recommended)

Create a migration script that reads the SQL file and executes it using the pg library.

## Migration Files

### 001_initial_schema.sql

Initial database schema with all tables:
- `barbers` - Barber/stylist information
- `services` - Services offered by the salon
- `appointments` - Customer appointments (with unique constraint on barber_id + start_time)
- `settings` - Global site settings including admin password
- `testimonials` - Customer testimonials
- `gallery` - Gallery images

## Important Notes

1. **Unique Constraint**: The `appointments` table has a unique constraint on `(barber_id, start_time)` to prevent double bookings.

2. **Admin Password**: The default admin password is stored in the settings table. It should be hashed using bcrypt. The default password is `VALENTINO2024`.

3. **UUID**: All tables use UUID as primary keys for better distribution and security.

4. **Timestamps**: All tables have `created_at` and `updated_at` timestamps that are automatically managed by triggers.

## Environment Variables

Make sure to set the following environment variable:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

Or individual variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=berber_db
DB_USER=postgres
DB_PASS=password
```

