<?php
// ============================================
// register-process.php
// Receives the Register form's data, checks it is really valid
// on the SERVER (the browser's JavaScript check can always be
// turned off or bypassed, so this is the check that actually
// matters), then saves a row into data/registrations.csv.
// ============================================

// ----- 1. Only continue if this is a real form submission (POST) -----
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: register.html');
    exit;
}

// ----- 2. Read each field and sanitize it -----
// trim() removes stray spaces, htmlspecialchars() turns characters
// like < and > into safe text so nobody can sneak HTML/script code
// into our stored data.
$fullname = trim(htmlspecialchars($_POST['fullname'] ?? ''));
$email = trim(htmlspecialchars($_POST['email'] ?? ''));
$mobile = trim(htmlspecialchars($_POST['mobile'] ?? ''));
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';
$course = trim(htmlspecialchars($_POST['course'] ?? ''));
$year = trim(htmlspecialchars($_POST['year'] ?? ''));
$gender = trim(htmlspecialchars($_POST['gender'] ?? ''));
$terms = isset($_POST['terms']); // checkbox only arrives in $_POST at all if it was checked

// ----- 3. Validate everything, same rules as the JavaScript, but
// this time it's the copy that can't be skipped -----
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

// ----- 4. If anything failed, show the errors and stop here -----
if (count($errors) > 0) {
    include 'templates/register-error.php';
    exit;
}

// ----- 5. Everything passed — save the record to the CSV file -----
// Note: we deliberately do NOT save the password itself. Storing
// plain-text passwords anywhere, even in a class project, is a bad
// habit to practice. Real login (with password_hash()) comes in a
// later practical once we have a proper database.

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

// flock() locks the file for a moment so two students submitting
// at the exact same second don't end up corrupting each other's row
flock($handle, LOCK_EX);

if ($isNewFile) {
    fputcsv($handle, array('Full Name', 'Email', 'Mobile', 'Course', 'Year', 'Gender', 'Submitted At'));
}

fputcsv($handle, array($fullname, $email, $mobile, $course, $year, $gender, date('Y-m-d H:i:s')));

flock($handle, LOCK_UN);
fclose($handle);

// ----- 6. Show the success page -----
include 'templates/register-success.php';
