<?php
  require 'connection.php';

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $nameErr = $numberErr = $emailErr = $searchErr = "";
  $name = $pNumber = $email = $search = "";
  $errorBoal = false;

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST["search"])) {
      $search =  $_POST["search"];
    }
    else if (!empty($_POST["newcontact"])) {

      if (empty($_POST["name"])) {
          $nameErr = "Name is required";
          $errorBoal = true;
      } else {
          $name = test_input($_POST["name"]);
          if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
            $nameErr = "Only letters and white space allowed";
            $errorBoal = true;
          }
      }
      if (empty($_POST["number"])) {
          $numberErr = "number is required";
          $errorBoal = true;
      } else {
          $pNumber = test_input($_POST["number"]);
          $testPhone = strlen(preg_replace('/[^0-9]/', '', $_POST['number']));
          if ($testPhone < 9 || $testPhone > 15 ) {
            $numberErr = "Invalid phone number";
            $errorBoal = true;
          }
      }
      if (empty($_POST["email"])) {
          $emailErr = "email is required";
          $errorBoal = true;
      } else {
          $email = test_input($_POST["email"]);
          if (!filter_var($email, FILTER_VALIDATE_EMAIL) === true) {
            $emailErr = "Invalid email";
            $errorBoal = true;
          }
      }
      if (!$errorBoal) {
        $sql = "INSERT INTO persons (name, phone_number, email) VALUES ('".$name."', '".$pNumber."', '".$email."')";
        if (!$search) {
          if ($conn->query($sql) === TRUE) {
              echo "New Contact created successfully";
              $_POST = array();
              header("Location: index.php"); // redirect back to your contact form
              exit;
          } else {
              echo "Error: " . $sql . "<br>" . $conn->error;
          }
        }


      }

    }
  }

  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="app.css">
    <title>Contacts</title>
    <script>
      'article aside footer header nav section time'.replace(/\w+/g,function(n){document.createElement(n)});
    </script>

  </head>
  <body>

    <header>
      <h1>Contact List</h1>
      <nav>
        <ul>
          <li>
            <a href="#create_contact">Create contact</a>
          </li>
        </ul>
        <form id="search_form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" >
        <label>
          <input placeholder='jan' type="text" name="search">:Search Name
              <span class="error">* <?php echo $searchErr;?></span>
        </label>
        <label>
          <input type="submit" value="Search" name="searchcontact">
        </label>
        </form>
      </nav>

    </header>
    <main>
      <article id="contacts">

        <?php
          $personsList = "";
          $sql2 = "SELECT * FROM persons ORDER BY name";
          $result = $conn->query($sql2);
          $rows[] = array();


          if ($result->num_rows > 0) {
            echo $result;
            while($row = $result->fetch_assoc()) {
              $firstLetter =  mb_substr($row["name"],0,1);
              if (stripos($row["name"], $search) !== false) {// check if search exists

                if (stripos($personsList, "<h3>".$firstLetter."</h3>") !== false) {

                  $personsList = $personsList. "<div tabindex='0'><p >".$row["name"]."</p>
                    <ul>
                      <li>
                        <a href='tel:+".$row["phone_number"]."'>".$row["phone_number"]."</a>
                      </li>
                      <li>
                        <a href='mailto:".$row["email"]."'>".$row["email"]."</a>
                      </li>
                    </ul></div>";
                } else {
                  $personsList = $personsList.
                    "</section><section class='letter_category'><h3>".$firstLetter."</h3>
                    <div tabindex='0'><p>".$row["name"]."</p>
                    <ul>
                      <li>
                        <a  href='tel:+".$row["phone_number"]."'>".$row["phone_number"]."</a>
                      </li>
                      <li>
                        <a href='mailto:".$row["email"]."'>".$row["email"]."</a>
                      </li>
                    </ul></div>";
                }
              }
            }

            echo $personsList;
          }

        ?>
        </section>
      </article>
      <section id="create_contact">

        <h2>New contacts</h2>

          <form id="add_contact_form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" >
          <label>
            <input placeholder='John' type="text" name="name">:Name
                <span class="error">* <?php echo $nameErr;?></span>
          </label><br>
          <label>
            <input placeholder='060000000' type="tel" name="number">:Phonenumber
                <span class="error">* <?php echo $numberErr;?></span>
          </label><br>
          <label>
            <input placeholder= 'Jointhecontactlist@now.nl' type="email" name="email">:Email
                <span class="error">* <?php echo $emailErr;?></span>
          </label><br>
          <label>
            <input type="submit" name="newcontact">
          </label>
        </form>

      </section>
    </main>
    <footer>

    </footer>

  </body>

  <script src="app.js"></script>
</html>
