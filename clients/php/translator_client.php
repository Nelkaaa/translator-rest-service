<?php

$url = "http://localhost:8080/translator-rest-service/api/translator/translate";

$data = json_encode([
    "text" => "Hello, how are you?",
    "targetLanguage" => "Moroccan Arabic Darija"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_USERPWD, "noha:noha123!");

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
echo "Translation: " . $result["translation"];

?>