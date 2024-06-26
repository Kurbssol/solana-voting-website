<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meme_coins";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM coins ORDER BY votes DESC";
$result = $conn->query($sql);

$coins = array();
while($row = $result->fetch_assoc()) {
    $coins[] = $row;
}

echo json_encode($coins);

$conn->close();
?>
