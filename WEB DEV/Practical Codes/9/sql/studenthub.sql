CREATE DATABASE IF NOT EXISTS studenthub;
USE studenthub;
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(10) NOT NULL,
    course VARCHAR(100) NOT NULL,
    year VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    venue VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    UNIQUE KEY one_registration_per_event (student_id, event_id)
);

INSERT INTO students (full_name, email, mobile, course, year, gender) VALUES
('Aarav Shah', 'aarav.shah@example.com', '9876543210', 'B.Tech Computer Engineering', '2nd year', 'Male'),
('Priya Mehta', 'priya.mehta@example.com', '9876543211', 'B.Tech Information Technology', '3rd year', 'Female'),
('Rohan Patel', 'rohan.patel@example.com', '9876543212', 'BCA', '1st year', 'Male'),
('Ishita Desai', 'ishita.desai@example.com', '9876543213', 'B.Tech Electronics', '4th year', 'Female'),
('Kabir Joshi', 'kabir.joshi@example.com', '9876543214', 'MCA', '1st year', 'Male');

INSERT INTO events (title, description, event_date, venue) VALUES
('Placement Drive 2026', 'Campus placement drive for final year students.', '2026-10-15', 'Main Auditorium'),
('Cultural Fest', 'Annual cultural festival with music and dance events.', '2026-10-20', 'Open Air Theatre'),
('Blood Donation Camp', 'Voluntary blood donation in partnership with the city hospital.', '2026-10-08', 'Student Activity Center'),
('Guest Lecture: Web Security', 'Industry expert session on web security fundamentals.', '2026-10-12', 'Seminar Hall 2'),
('Sports Day', 'Annual inter-department sports competition.', '2026-10-25', 'College Ground');

INSERT INTO registrations (student_id, event_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 1),
(5, 5);
