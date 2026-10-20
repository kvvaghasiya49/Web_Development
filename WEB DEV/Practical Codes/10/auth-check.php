<?php
require 'session-init.php';

$timeoutSeconds = 1800;

if (!isset($_SESSION['user_id']) && isset($_COOKIE['remember_me'])) {
    $parts = explode(':', $_COOKIE['remember_me']);

    if (count($parts) === 2) {
        require 'db-mysqli.php';
        $cookieUserId = (int) $parts[0];
        $cookieToken = $parts[1];

        $stmt = $conn->prepare('SELECT user_id, full_name, role, last_login, remember_token_hash, remember_expires FROM users WHERE user_id = ?');
        $stmt->bind_param('i', $cookieUserId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        $conn->close();

        if ($row && $row['remember_token_hash'] !== null
            && strtotime($row['remember_expires']) > time()
            && password_verify($cookieToken, $row['remember_token_hash'])) {

            session_regenerate_id(true);
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['full_name'] = $row['full_name'];
            $_SESSION['role'] = $row['role'];
            $_SESSION['last_login'] = $row['last_login'];
            $_SESSION['last_activity'] = time();
        }
    }
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    $message = 'Please log in to see this page.';
    include 'templates/session-message.php';
    exit;
}

if (time() - $_SESSION['last_activity'] > $timeoutSeconds) {
    $_SESSION = array();
    setcookie(session_name(), '', time() - 3600, '/');
    session_destroy();

    http_response_code(401);
    $message = 'Your session expired because you were inactive. Please log in again.';
    include 'templates/session-message.php';
    exit;
}

$_SESSION['last_activity'] = time();

if ($_SESSION['role'] !== $requiredRole) {
    http_response_code(403);
    $message = 'Access denied. Your account is not allowed to open this page.';
    include 'templates/session-message.php';
    exit;
}
