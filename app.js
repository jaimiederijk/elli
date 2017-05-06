
// verzameling voor alle htmlelemnten die je wil gebruiken
// zo gedaan om vervuiling tegen te gaan
var htmlElements = {
  messages: $("#messages"),
  button1:$("#button1"),
  button2:$("#button2")
};

// start punt voor de javascript code
var app = {
  init: function() {
    //de functie die click events aan button hangt
    messagesHandler.addClick();

  }
};

// lijst met antwoorden die de gebruiker geeft
var simpleUserResponses = {
  question1: {
    message1 : "Hello, mijn naam is Herbert",
    message2 : "Hello, mijn naam is Kasper"
  },
  question2: {
    message1 : "is goed",
    message2 : "is niet goed"
  }

}

var simpleElliResponses = {
  question1: {
    message1 : "<div class='messageEllie'> <p>mag ik jou vragen stellen Herbert?</p> </div>",
    message2 : "<div class='messageEllie'> <p>Hello, Kasper mag ik jou vragen stellen?</p> </div>"
  },
  question2: {
    message1 : "<div class='messageEllie'> <p>is hou van je</p> </div>",
    message2 : "<div class='messageEllie'> <p>ik haat je </p> </div>"
  }
}

// tekst in de buttons
var answers = {
  question1: {
    answer1: "ok",
    answer2: "not cool"
  },
  question2: {
    answer1: "ok",
    answer2: "not cool"
  }
}

// variable die bijhoudt op welke vraag en antwoord je zit
var questionNumber = 1;

// de verzameling functie die de chat afhandelen
var messagesHandler = {
  addClick : function () {
    // click events op de buttons
    htmlElements.button1.click( function() {

      // roep functies op met als argument welk antwoord(nummer) er gegeven moet worden
      userResponse(1);
      // timeout die vertraagd de response van Elli oproept
      setTimeout( function() {
        elliResponse(1)
      }, 1000);
    })

    htmlElements.button2.click( function() {

      userResponse(2);
      setTimeout( function() {
        elliResponse(2)
      }, 1000);
    })

    // veranderd de text in de buttons
    function changeButtonText () {
      var question = "question" + questionNumber;

      htmlElements.button1.html(answers[question].answer1);
      htmlElements.button2.html(answers[question].answer2);
    }

    // maakt het antwoord van de gebruiker en slaat deze op
    function userResponse (messageNumber) {
      var question = "question" + questionNumber;
      var message = "message" + messageNumber;
      var response = simpleUserResponses[question][message];
      var userCode = 111111; // !!!!!! FIX ME   usercode moet gebruiker afhankelijk worden

      storeUserResponse(userCode, response)

      // voorkom dat er html naar de database gestuurd wordt
      var responseHTML = "<div class='messageUser'> <p>" + response +  "</p> </div>";
      htmlElements.messages.append(responseHTML);
    }

    // maakt het antwoord van Elli
    function elliResponse (messageNumber) {
      var question = "question" + questionNumber;
      var message = "message" + messageNumber;

      htmlElements.messages.append(simpleElliResponses[question][message]);
      changeButtonText();
      questionNumber++;
    }

    // stuurt de info naar de php die het vervolgens in de database zet
    function storeUserResponse (userCode, response ) {
      // post request naar index.php waar word doorverwezen naar dbfunctions.php
      $.post("index.php", {
          questionnumber : questionNumber,
          usercode: userCode,
          response: response
      }, function() {
        console.log("response" + questionNumber + " has been stored");
      });
    }

  }
};

// activeert de app
app.init();
