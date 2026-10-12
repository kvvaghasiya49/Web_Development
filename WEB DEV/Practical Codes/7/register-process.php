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
$terms = isset($_POST['terms']); // checkbox only arrives in $_POST at all if it was checked

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

$dataFolder = __DIR__ . '/data';
if (!is_dir($dataFolder)) {
    mkdir($dataFolder, 0755, true);
}

$csvFile = $dataFolder . '/registrations.csv';
$isNewFile = !file_exists($csvFile);

$handle = fopen($csvFile, 'a');

if ($handle === false) {
    $errors[] = 'The server could not save your registration. Please try again.';
    include 'templates/register-error.php';
    exit;
}

flock($handle, LOCK_EX);

if ($isNewFile) {
    fputcsv($handle, array('Full Name', 'Email', 'Mobile', 'Course', 'Year', 'Gender', 'Submitted At'));
}

fputcsv($handle, array($fullname, $email, $mobile, $course, $year, $gender, date('Y-m-d H:i:s')));

flock($handle, LOCK_UN);
fclose($handle);
include 'templates/register-success.php';
