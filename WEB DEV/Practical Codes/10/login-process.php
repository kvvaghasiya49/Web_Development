<?php
require 'session-init.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html');
    exit;
}

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$remember = isset($_POST['remember']);

if ($email === '' || $password === '') {
    $message = 'Please enter your email and password.';
    include 'templates/login-error.php';
    exit;
}

require 'db-mysqli.php';

$stmt = $conn->prepare('SELECT user_id, full_name, password_hash, role, last_login FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user || !password_verify($password, $user['password_hash'])) {
    $conn->close();
    $message = 'Invalid email or password.';
    include 'templates/login-error.php';
    exit;
}

session_regenerate_id(true);

$_SESSION['user_id'] = $user['user_id'];
$_SESSION['full_name'] = $user['full_name'];
$_SESSION['role'] = $user['role'];
$_SESSION['last_login'] = $user['last_login'];
$_SESSION['last_activity'] = time();

$update = $conn->prepare('UPDATE users SET last_login = NOW() WHERE user_id = ?');
$update->bind_param('i', $user['user_id']);
$update->execute();
$update->close();

if ($remember) {
    $token = bin2hex(random_bytes(32));
    $tokenHash = password_hash($token, PASSWORD_DEFAULT);
    $expires = time() + (30 * 24 * 60 * 60);
    $expiresText = date('Y-m-d H:i:s', $expires);

    $save = $conn->prepare('UPDATE users SET remember_token_hash = ?, remember_expires = ? WHERE user_id = ?');
    $save->bind_param('ssi', $tokenHash, $expiresText, $user['user_id']);
    $save->execute();
    $save->close();

    setcookie('remember_me', $user['user_id'] . ':' . $token, array(
        'expires' => $expires,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax'
    ));
}

$conn->close();

if ($user['role'] === 'admin') {
    header('Location: admin-dashboard.php');
} else {
    header('Location: student-dashboard.php');
}
exit;
