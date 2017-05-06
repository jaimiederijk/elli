<?php
  require 'connection.php';

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $userCode = $response = $questionNumber = $responseWithNumber = "";

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

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
  $conn->close();
?>
