<?php
  header('Content-Type: application/json');
  require 'connection.php';

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

   $userCodeHis = "";

  // haal data op
  if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!empty($_GET["usercode"])) {
      $userCodeHis = $_GET["usercode"];

      $sql = "SELECT * FROM `leerlingen` WHERE user_code = '".$userCodeHis."'";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
        $array = array("responses" => array(
          $row["response1"], $row["response2"], $row["response3"], $row["response4"], $row["response5"], $row["response6"]),
          "name" => $row["name"]
        );


        echo json_encode($array);
      }
      } else {
          echo "0 results";
      }
    }

  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
  $conn->close();
?>
