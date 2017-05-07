
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

var currentUserCode = 111111;// !!!!!! FIX ME   usercode moet gebruiker afhankelijk worden

var userName = "";

// de verzameling functie die de chat afhandelen
var messagesHandler = {
  addClick : function () {
    // click events op de buttons
    htmlElements.submit.click( function() {
      var formData = $('form').serializeArray();
       //var name = document.getElementById('name').value;   werkt ook maar dit is netter
      var formName = formData[0].value;
      name = formName;
      messagesHandler.storeName(currentUserCode, formName);
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
    messagesHandler.userResponse(answerNumber);
    // timeout die vertraagd de response van Elli oproept
    if (withTimeOut) {
      setTimeout( function() {
        messagesHandler.elliResponse(answerNumber);
      }, 1000);
    } else {
      messagesHandler.elliResponse(answerNumber);
    }

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
  storeName: function (userCode, namep ) {
    // post request naar dbfunctions.php
    $.post("php/dbfunctions.php", {
        usercode: userCode,
        name: namep
    }, function() {
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
      if (responseJSON.name !=="") {
        name = responseJSON.name;
      }
      for (var i = 0; i < responseJSON.responses.length; i++) {
        // if response[number] is not empty
        if (responseJSON.responses[i]!=="") {

          var answerNum = responseJSON.responses[i].slice(-1);

          messagesHandler.responseInit(answerNum,false);
        }

      }


    }


  }
}

// activeert de app
app.init();
