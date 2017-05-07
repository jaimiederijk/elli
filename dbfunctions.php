<?php
  require 'connection.php';

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $userCode = $userCodeHis = $response = $questionNumber = $responseWithNumber = "";

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userCode = test_input($_POST["usercode"]);
    $response = test_input($_POST["response"]);
    $questionNumber = test_input($_POST["questionnumber"]);

    $responseWithNumber = "response".$questionNumber;

    $sql = "UPDATE `leerlingen` SET `".$responseWithNumber."`= '".$response."' WHERE user_code = '".$userCode."' ";

    if ($conn->query($sql) === TRUE) {
        echo "New response created successfully";
        $_POST = array();
        // header("Location: index.php"); // redirect back to your contact form
        exit;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }

  // haal data op
  if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!empty($_GET["usercode"])) {
      $userCodeHis = $_GET["usercode"];

      $sql = "SELECT * FROM `leerlingen` WHERE user_code = '".$userCodeHis."'";
      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
        $array = array($row["response1"], $row["response2"], $row["response3"], $row["response4"], $row["response5"], $row["response6"] );

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
