
CREATE DATABASE IF NOT EXISTS bloodbridge;

USE bloodbridge;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    role ENUM('admin', 'donor', 'patient', 'hospital') NOT NULL,

    account_status ENUM('active', 'inactive', 'blocked')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- DONORS TABLE
CREATE TABLE donors (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    blood_group ENUM(
        'A+', 'A-', 'B+', 'B-',
        'AB+', 'AB-', 'O+', 'O-'
    ) NOT NULL,

    date_of_birth DATE,

    gender VARCHAR(20),

    city VARCHAR(100),

    state VARCHAR(100),

    address TEXT,

    availability_status ENUM(
        'available', 'unavailable'
    ) DEFAULT 'available',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- PATIENTS TABLE
CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    blood_group ENUM(
        'A+', 'A-', 'B+', 'B-',
        'AB+', 'AB-', 'O+', 'O-'
    ) NOT NULL,

    city VARCHAR(100),

    state VARCHAR(100),

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- HOSPITALS TABLE
CREATE TABLE hospitals (
    hospital_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL UNIQUE,

    hospital_name VARCHAR(150) NOT NULL,

    registration_number VARCHAR(100) UNIQUE,

    city VARCHAR(100),

    state VARCHAR(100),

    address TEXT,

    verification_status ENUM(
        'pending', 'verified', 'rejected'
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- BLOOD REQUESTS TABLE
CREATE TABLE blood_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,

    patient_id INT,

    hospital_id INT,

    blood_group ENUM(
        'A+', 'A-', 'B+', 'B-',
        'AB+', 'AB-', 'O+', 'O-'
    ) NOT NULL,

    units_required INT NOT NULL,

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100),

    urgency ENUM(
        'normal', 'urgent', 'emergency'
    ) DEFAULT 'normal',

    request_status ENUM(
        'pending', 'approved', 'fulfilled', 'cancelled'
    ) DEFAULT 'pending',

    required_by DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id),

    FOREIGN KEY (hospital_id)
        REFERENCES hospitals(hospital_id),

    CHECK (units_required > 0),

    CHECK (
        patient_id IS NOT NULL
        OR hospital_id IS NOT NULL
    )
);


-- DONATIONS TABLE
CREATE TABLE donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,

    donor_id INT NOT NULL,

    request_id INT,

    donation_date DATE,

    units_donated INT DEFAULT 1,

    donation_status ENUM(
        'scheduled', 'completed', 'cancelled'
    ) DEFAULT 'scheduled',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (donor_id)
        REFERENCES donors(donor_id),

    FOREIGN KEY (request_id)
        REFERENCES blood_requests(request_id),

    CHECK (units_donated > 0)
);


-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    notification_type VARCHAR(50),

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
