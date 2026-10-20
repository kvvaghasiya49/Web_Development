<?php
$requiredRole = 'admin';
require 'auth-check.php';
require 'db-mysqli.php';

$result = $conn->query('SELECT COUNT(*) AS total FROM students');
$row = $result->fetch_assoc();
$studentCount = $row['total'];

$result = $conn->query('SELECT COUNT(*) AS total FROM events');
$row = $result->fetch_assoc();
$eventCount = $row['total'];

$result = $conn->query('SELECT COUNT(*) AS total FROM registrations');
$row = $result->fetch_assoc();
$registrationCount = $row['total'];

$conn->close();

$lastLogin = $_SESSION['last_login'];
if ($lastLogin === null) {
    $lastLogin = 'This is your first login';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin dashboard — StudentHub</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="site-header">
  <a href="admin-dashboard.php" class="logo">StudentHub</a>
  <nav class="main-nav" id="main-nav" aria-label="Main navigation">
    <ul>
      <li><a href="admin-dashboard.php" aria-current="page">Admin dashboard</a></li>
      <li><a href="logout.php">Logout</a></li>
    </ul>
  </nav>
  <div class="header-controls">
    <button type="button" id="theme-toggle" class="theme-toggle" aria-label="Switch to dark mode">🌙</button>
    <button type="button" id="nav-toggle" class="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Open menu">
      <span class="bar"></span><span class="bar"></span><span class="bar"></span>
    </button>
  </div>
</header>

<main id="main-content">
  <div class="page-shell">

    <div class="page-head">
      <h1>Admin dashboard</h1>
      <p>Signed in as <?php echo htmlspecialchars($_SESSION['full_name']); ?> (<?php echo htmlspecialchars($_SESSION['role']); ?>). Last login: <?php echo htmlspecialchars($lastLogin); ?></p>
    </div>

    <div class="stat-row">
      <div class="stat-card">
        <div class="stat-label">Total students</div>
        <div class="stat-value"><?php echo $studentCount; ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total events</div>
        <div class="stat-value"><?php echo $eventCount; ?></div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Event registrations</div>
        <div class="stat-value"><?php echo $registrationCount; ?></div>
      </div>
    </div>

    <p>Only an admin account can open this page. A student who tries gets an access denied message.</p>

  </div>
</main>

<footer class="site-footer">
  <p>&copy; 2026 StudentHub, a student project in web development.</p>
  <p class="footer-badge">Charusat</p>
</footer>

<script src="js/script.js" defer></script>
</body>
</html>
