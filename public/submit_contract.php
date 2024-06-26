<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meme_coins";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$contractAddress = $conn->real_escape_string($data['contract_address']);

$apiUrl = "https://api.dexscreener.com/latest/dex/tokens/$contractAddress";
$apiResponse = file_get_contents($apiUrl);
$tokenData = json_decode($apiResponse, true);

if ($tokenData && isset($tokenData['pair'])) {
    $tokenName = $conn->real_escape_string($tokenData['pair']['baseToken']['name']);
    $tokenSymbol = $conn->real_escape_string($tokenData['pair']['baseToken']['symbol']);
    $tokenPrice = $tokenData['pair']['priceNative'];

    $sql = "INSERT INTO coins (name, contract_address, symbol, price) VALUES ('$tokenName', '$contractAddress', '$tokenSymbol', '$tokenPrice')";
    $conn->query($sql);
}

$conn->close();
?>
