<?php
require 'db.php';
echo 'Connected to the studenthub database successfully!';
$stmt = $pdo->prepare('SELECT COUNT(*) AS total FROM students');
$stmt->execute();
$result = $stmt->fetch();

echo '<br>Students currently in the database: ' . $result['total'];
