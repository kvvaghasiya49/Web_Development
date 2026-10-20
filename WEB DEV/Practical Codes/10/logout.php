<?php
require 'session-init.php';

if (isset($_SESSION['user_id'])) {
    require 'db-mysqli.php';
    $stmt = $conn->prepare('UPDATE users SET remember_token_hash = NULL, remember_expires = NULL WHERE user_id = ?');
    $stmt->bind_param('i', $_SESSION['user_id']);
    $stmt->execute();
    $stmt->close();
    $conn->close();
}

$_SESSION = array();

setcookie(session_name(), '', time() - 3600, '/');
setcookie('remember_me', '', time() - 3600, '/');

session_destroy();

$message = 'You have been logged out successfully.';
include 'templates/session-message.php';
