-- Update admin password with Node.js bcrypt hash
-- Replace the hash below with your generated hash if different

UPDATE settings 
SET admin_password = '$2b$10$vWh2nqwTVwa9e1KohDIIwOgAmxcSA7wBGSRAhDo0Ttks4k8avBc.G', 
    admin_username = 'admin' 
WHERE key = 'global';

-- Verify the update
SELECT 
    admin_username, 
    LEFT(admin_password, 10) as hash_format,
    LENGTH(admin_password) as hash_length
FROM settings 
WHERE key = 'global';



