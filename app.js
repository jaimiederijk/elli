
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
    message1 : "<div class='messageUser'> <p>Hello, mijn naam is Herbert</p> </div>",
    message2 : "<div class='messageUser'> <p>Hello, mijn naam is Kasper</p> </div>"
  },
  question2: {
    message1 : "<div class='messageUser'> <p>is goed</p> </div>",
    message2 : "<div class='messageUser'> <p>is niet goed</p> </div>"
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
    htmlElements.button1.click( function() {

      userResponse(1);
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

    var changeButtonText = function() {
      var question = "question" + questionNumber;

      htmlElements.button1.html(answers[question].answer1);
      htmlElements.button2.html(answers[question].answer2);
    }

    var userResponse = function(messageNumber) {
      var question = "question" + questionNumber;
      var message = "message" + messageNumber;

      htmlElements.messages.append(simpleUserResponses[question][message]);
    }

    var elliResponse = function(messageNumber) {
      var question = "question" + questionNumber;
      var message = "message" + messageNumber;

      htmlElements.messages.append(simpleElliResponses[question][message]);
      changeButtonText();
      questionNumber++;
    }

  }
};

// activeert de app
app.init();
