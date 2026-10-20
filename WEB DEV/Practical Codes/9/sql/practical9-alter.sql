USE studenthub;
ALTER TABLE students
ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '' AFTER gender;
