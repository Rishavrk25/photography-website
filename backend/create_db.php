<?php
try {
    $pdo = new PDO('mysql:host=localhost', 'root', '');
    $pdo->exec('CREATE DATABASE IF NOT EXISTS shubham_videography');
    echo "Database created successfully.\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
