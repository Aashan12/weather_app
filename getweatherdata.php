<?php
function fetchData() {
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "climates";

    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $data = array();

    // Fetch the latest 7 weather data entries for Ulhasnagar
    $sql = "SELECT description, temperature, city, date, day_of_week, icon 
            FROM data_weather 
            WHERE city = 'Ulhasnagar' 
            ORDER BY id DESC 
            LIMIT 7";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    $conn->close();

    return $data;
}

header('Content-Type: application/json');
echo json_encode(fetchData());
?>
