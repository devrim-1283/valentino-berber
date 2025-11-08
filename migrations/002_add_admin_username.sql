-- Add admin_username column to settings table
ALTER TABLE settings ADD COLUMN IF NOT EXISTS admin_username VARCHAR(255) DEFAULT 'admin';

-- Update existing settings to have default username
UPDATE settings SET admin_username = 'admin' WHERE admin_username IS NULL;

