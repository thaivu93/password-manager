-- Table creation
CREATE TABLE IF NOT EXISTS Role (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(30) UNIQUE NOT NULL);

CREATE TABLE IF NOT EXISTS Status (
    status_id SERIAL PRIMARY KEY,
    status VARCHAR(30) UNIQUE NOT NULL); 

CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    -- hashed login kpassword
    login_password VARCHAR(100) NOT NULL,
    login_password_salt VARCHAR(50) NOT NULL,

    master_password VARCHAR(100) NOT NULL,
    master_password_salt  VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --  
    role_id INT REFERENCES Role(role_id),
    status_id INT REFERENCES Status(status_id));

CREATE TABLE IF NOT EXISTS Application (
    app_id SERIAL PRIMARY KEY,
    app_name VARCHAR(50) UNIQUE NOT NULL);

CREATE TABLE IF NOT EXISTS Password (
    user_id INT REFERENCES "user"(user_id),
    app_id INT REFERENCES Application(app_id),
    -- hashed password
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(user_id, app_id));

CREATE TABLE IF NOT EXISTS Activity (
    activity_id SERIAL PRIMARY KEY, 
    activity VARCHAR(50) UNIQUE NOT NULL);

CREATE TABLE IF NOT EXISTS Log (
    activity_id INT REFERENCES Activity(activity_id),
    user_id INT REFERENCES "user"(user_id),
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (activity_id, user_id, created_at));

