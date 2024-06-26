<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meme_coins";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = intval($_GET['id']);

$sql = "UPDATE coins SET votes = votes + 1 WHERE id = $id";
$conn->query($sql);

$conn->close();
?>
