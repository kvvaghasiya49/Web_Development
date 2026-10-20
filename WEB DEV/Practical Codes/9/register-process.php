<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: register.html');
    exit;
}

$fullname = trim(htmlspecialchars($_POST['fullname'] ?? ''));
$email = trim(htmlspecialchars($_POST['email'] ?? ''));
$mobile = trim(htmlspecialchars($_POST['mobile'] ?? ''));
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';
$course = trim(htmlspecialchars($_POST['course'] ?? ''));
$year = trim(htmlspecialchars($_POST['year'] ?? ''));
$gender = trim(htmlspecialchars($_POST['gender'] ?? ''));
$terms = isset($_POST['terms']);
$errors = array();

if (!preg_match('/^[A-Za-z ]{2,}$/', $fullname)) {
    $errors[] = 'Full name must contain only letters and spaces.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Enter a valid email address.';
}
if (!preg_match('/^[0-9]{10}$/', $mobile)) {
    $errors[] = 'Mobile number must be exactly 10 digits.';
}
if (strlen($password) < 8) {
    $errors[] = 'Password must be at least 8 characters.';
}
if ($password !== $confirm_password) {
    $errors[] = 'Passwords do not match.';
}
if ($course === '') {
    $errors[] = 'Please select a course.';
}
if ($year === '') {
    $errors[] = 'Please select a year.';
}
if ($gender === '') {
    $errors[] = 'Please select a gender.';
}
if (!$terms) {
    $errors[] = 'You must accept the terms and conditions.';
}

if (count($errors) > 0) {
    include 'templates/register-error.php';
    exit;
}

require 'db-mysqli.php';
$checkStmt = $conn->prepare('SELECT student_id FROM students WHERE email = ?');
$checkStmt->bind_param('s', $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    $errors[] = 'This email is already registered. Please log in or use a different email.';
}
$checkStmt->close();

if (count($errors) > 0) {
    $conn->close();
    include 'templates/register-error.php';
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

try {
    $insertStmt = $conn->prepare(
        'INSERT INTO students (full_name, email, mobile, course, year, gender, password_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $insertStmt->bind_param('sssssss', $fullname, $email, $mobile, $course, $year, $gender, $passwordHash);
    $insertStmt->execute();
    $insertStmt->close();
} catch (mysqli_sql_exception $e) {
    $errors[] = 'The server could not save your registration. Please try again.';
    $conn->close();
    include 'templates/register-error.php';
    exit;
}

$conn->close();
include 'templates/register-success.php';
