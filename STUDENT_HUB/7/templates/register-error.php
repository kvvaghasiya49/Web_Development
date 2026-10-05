<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Registration error — StudentHub</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
  <a href="index.html" class="logo">StudentHub</a>
</header>

<main>
  <div class="form-shell">
    <div class="form-card">
      <h1>Registration could not be saved</h1>
      <p class="form-sub">Please fix the following and try again.</p>

      <ul style="color:#b3261e; font-size:14px; padding-left: 20px; margin-bottom: var(--space-4);">
        <?php foreach ($errors as $error) { ?>
          <li><?php echo $error; ?></li>
        <?php } ?>
      </ul>

      <a href="register.html" class="btn btn-primary" style="display:block; text-align:center;">← Back to Register</a>
    </div>
  </div>
</main>

</body>
</html>
