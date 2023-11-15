-- Role Table
INSERT INTO Role (role) VALUES
    ('admin'),
    ('user');
-- -- -- Status Table
INSERT INTO Status (status) VALUES
    ('active'),
    ('inactive'),
    ('suspended');

-- User Table
INSERT INTO "user" (user_name, login_password, login_password_salt, master_password, master_password_salt, created_at, role_id, status_id) VALUES
    ('admin_user',  'hashed_login_password', 'login_salt', 'hashed_master_password', 'master_salt', '2023-01-01 12:00:00', 1, 1),
    ('john_doe',  'hashed_login_password', 'login_salt', 'hashed_master_password', 'master_salt', '2023-01-02 10:30:00', 2, 1);
    -- Add more user records as needed

-- Application Table
INSERT INTO Application (app_name) VALUES
    ('App1'),
    ('App2'),
    ('App3');

-- -- Password Table
INSERT INTO Password (user_id, app_id, password) VALUES
    (1, 1, 'hashed_password_1'),
    (1, 2, 'hashed_password_2'),
    (2, 1, 'hashed_password_3');
--     -- Add more password records as needed

-- -- Activity Table
INSERT INTO Activity (activity) VALUES
    ('Login'),
    ('Logout'),
    ('Update Profile'),
    ('Edit Password'),
    ('Edit Application'),
    ('Delete Password'), 
    ('Delete Application');

-- -- Log Table
INSERT INTO Log (activity_id, user_id, created_at, updated_at) VALUES
    (1, 1, '2023-01-01 12:05:00', '2023-01-01 12:05:00'),
    (2, 2, '2023-01-02 10:35:00', '2023-01-02 10:35:00');
--     -- Add more log records as needed
