<?php
$dbHost = 'localhost';
$dbName = 'studenthub';
$dbUser = 'root';
$dbPass = '';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {

    die('Database connection failed. Please try again later.');
}
