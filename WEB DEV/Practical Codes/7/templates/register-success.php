<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Registration successful — StudentHub</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
  <a href="index.html" class="logo">StudentHub</a>
</header>

<main>
  <div class="form-shell">
    <div class="form-card">
      <h1>You're registered!</h1>
      <p class="form-sub">
        Thanks, <?php echo $fullname; ?> — your details were saved successfully.
      </p>
      <p style="color: var(--ink-soft); font-size: 14px; text-align:center; margin-bottom: var(--space-4);">
        A login system isn't connected yet (that's a later practical), but your
        registration record is now stored on the server.
      </p>
      <a href="login.html" class="btn btn-primary" style="display:block; text-align:center;">Go to Login</a>
    </div>
  </div>
</main>

</body>
</html>
