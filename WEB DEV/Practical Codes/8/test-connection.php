<?php
// ============================================
// test-connection.php
// Nothing fancy — just proves db.php works. Open this file in a
// browser and screenshot the result for your Practical 8 submission.
// ============================================

require 'db.php';

// if db.php's try/catch had failed, die() would have already stopped
// the page before reaching this line — so getting here means the
// connection genuinely succeeded.
echo 'Connected to the studenthub database successfully!';

// bonus proof: count how many students are in the table right now,
// using a prepared statement (no user input here, but same pattern
// we'll reuse everywhere from Practical 9 onward)
$stmt = $pdo->prepare('SELECT COUNT(*) AS total FROM students');
$stmt->execute();
$result = $stmt->fetch();

echo '<br>Students currently in the database: ' . $result['total'];
