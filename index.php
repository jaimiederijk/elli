<?php
  
?>

<html lang="nl">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <title>Elli</title>
    <meta name="description" content="afstudeerproject demo">
    <meta name="author" content="Herbert de Vrijer">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    </head>
  <body>
    <div id="messages">
      <div id="start_Ellie" class="messageEllie">
        <img src="img/Ellie.jpg">
        <p>Hallo, mijn naam is Ellie</p>
      </div>
    </div>

    <form action="index.php" method="get">
      <input type="text" name="name" id="name">
      <input type="submit" id="submit">
    </form>

    <div id="buttonArea">
      <button id="button1">Ik ben Herbert!</button>
      <button id="button2">Ik ben Kasper!</button>
    </div>
  <footer>
    <p>gemaakt door <a target="_blank" href="http://www.herbertdevrijer.nl">Herbert de Vrijer</a> voor CMD amsterdam</p>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="app.js"></script>
  </footer>
  </body>
</html>
