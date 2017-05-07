
// verzameling voor alle htmlelemnten die je wil gebruiken
// zo gedaan om vervuiling tegen te gaan
var htmlElements = {
  messages: $("#messages"),
  button1:$("#button1"),
  button2:$("#button2"),
  submit: $("#submit")
};

// start punt voor de javascript code
var app = {
  init: function() {
    //de functie die click events aan button hangt
    messagesHandler.addClick();
    dataHandler.getResponseHistory();
  }
};

// naam van gebruiker
var name = "placeholder"



// lijst met antwoorden die de gebruiker geeft
var simpleUserResponses = {
  question1: {
    message1 : "Hello, mijn naam is " + name,
    message2 : ""
  },
  question2: {
    message1 : "is goed",
    message2 : "is niet goed"
  }

}

var simpleElliResponses = {
  question1: {
    message1 : "<div class='messageEllie'> <p>mag ik jou vragen stellen " + name + "?</p> </div>",
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

var currentUserCode = 111111;// !!!!!! FIX ME   usercode moet gebruiker afhankelijk worden





// de verzameling functie die de chat afhandelen
var messagesHandler = {
  addClick : function () {
    // click events op de buttons
    htmlElements.submit.click( function() {
      messagesHandler.responseInit(1, true);

      

    });
    htmlElements.button1.click( function() {
      messagesHandler.responseInit(1, true);
    });
    htmlElements.button2.click( function() {
      messagesHandler.responseInit(2, true);
    });
  },
  responseInit : function (answerNumber, withTimeOut) {
    // roep functies op met als argument welk antwoord(nummer) er gegeven moet worden
    messagesHandler.storeName();
    messagesHandler.userResponse(answerNumber);
    // timeout die vertraagd de response van Elli oproept
    setTimeout( function() {
        messagesHandler.elliResponse(answerNumber);
    }, 1000);
    

  },

  // veranderd de text in de buttons
  changeButtonText : function () {
    var question = "question" + questionNumber;

    htmlElements.button1.html(answers[question].answer1);
    htmlElements.button2.html(answers[question].answer2);
  },

  // maakt het antwoord van de gebruiker en slaat deze op
  userResponse: function (messageNumber) {

    var question = "question" + questionNumber;
    var message = "message" + messageNumber;
    var response = simpleUserResponses[question][message];
    var userCode = currentUserCode;
    messagesHandler.storeUserResponse(userCode, response+" "+messageNumber)

    // voorkom dat er html naar de database gestuurd wordt
    var responseHTML = "<div class='messageUser'> <p>" + response +  "</p> </div>";
    htmlElements.messages.append(responseHTML);



  },

  // maakt het antwoord van Elli
  elliResponse: function (messageNumber) {
    var question = "question" + questionNumber;
    var message = "message" + messageNumber;

    htmlElements.messages.append(simpleElliResponses[question][message]);
    messagesHandler.changeButtonText();
    questionNumber++;

    //controleer het questionNumber en pas als het nodig is de input aan voor het antwoord van de gebruiker
    if (questionNumber == 2) {
      $("form").toggleClass("hide");
      $("#buttonArea").toggleClass("hide");
      console.log("input veranderen");
    }
  },

  // stuurt de info naar de php die het vervolgens in de database zet
  storeUserResponse: function (userCode, response ) {
    // post request naar dbfunctions.php
    $.post("php/dbfunctions.php", {
        questionnumber : questionNumber,
        usercode: userCode,
        response: response
    }, function() {
      console.log("response" + questionNumber + " has been stored");
    });
  },


  // stuurt de info naar de php die het vervolgens in de database zet
  storeName: function (userCode, name ) {
    // post request naar dbfunctions.php
    $.post("php/dbfunctions.php", {
        usercode: userCode,
        name: name
    }, function() {
      //sla naam van gebruiker op
      name = "piet";
      console.log(name + " has been stored");
    });
  }
};




var dataHandler = {
  getResponseHistory : function () {
    $.get("php/getdata.php",{
      usercode: currentUserCode
    }, function(data, status){
        dataHandler.processData(data);
        console.log("\nStatus: " + status);
    });
  },
  processData : function (data) {
    console.log(data );
    if (data=="0 results") {

    } else {
      var responseJSON = data;

      for (var i = 0; i < responseJSON.length; i++) {
        // if response[number] is not empty
        if (responseJSON[i]!=="") {
          
          var answerNum = responseJSON[i].slice(-1);

          messagesHandler.responseInit(answerNum,false);
        }

      }

    }


  }
}

// activeert de app
app.init();
