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

if ($tokenData && isset($tokenData['pairs'][0])) {
    $tokenName = $conn->real_escape_string($tokenData['pairs'][0]['baseToken']['name']);
    $tokenSymbol = $conn->real_escape_string($tokenData['pairs'][0]['baseToken']['symbol']);
    $tokenPrice = $tokenData['pairs'][0]['priceNative'];

    $sql = "INSERT INTO coins (name, contract_address, symbol, price) VALUES ('$tokenName', '$contractAddress', '$tokenSymbol', '$tokenPrice')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Token data not found']);
}

$conn->close();
?>
