USE studenthub;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'student',
    last_login DATETIME NULL,
    remember_token_hash VARCHAR(255) NULL,
    remember_expires DATETIME NULL
);

INSERT IGNORE INTO users (full_name, email, password_hash, role) VALUES
('Site Admin', 'admin@studenthub.test', '$2y$10$c2gcoIYoU/h5n.ge482r4uWaC1KkKhBuoB1MDGzyDeNnHU4DdEEQG', 'admin'),
('Test Student', 'student@studenthub.test', '$2y$10$AWYpZOeBmrg8AlkY.5/53.8a5YiCsy29JEsfYFx1pulqCzlNboWRG', 'student');
