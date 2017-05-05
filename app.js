var htmlElements = {
  messages: $("#messages"),
  button1:$("#button1"),
  button2:$("#button2")

};
var app = {
  init: function() {
    messagesHandler.addClick();

  }
};

var simpleResponses = {
  question1: {  
    message1 : "<div class='messageUser'> <p>Hello, mijn naam is Herbert</p> </div>",
    message2 : ""
  }

}
// tekst in knoppen
var answers = {
  question1: {
    answer1: "cool",
    answer2: "not cool"
  },
  question2: {
    answer1: "coloe",
    answer2: "not cool"
  }
}

var questionNumber = 1;

var messagesHandler = {
  addClick : function () {
    htmlElements.button1.addEventListener("click", function() {
      debugger
      questionNumber++;
      var question = "question" + questionNumber;
      htmlElements.messages.append(simpleResponses[question].message1);
      buttonText();
    })

    htmlElements.button2.onclick = function() {
     questionNumber++;
      var question = "question" + questionNumber;
      htmlElements.messages.append(simpleResponses[question].message2);
      buttonText();
    }

    var buttonText = function() {
     var question = "question" + questionNumber;
      htmlElements.button1.innerHTML= answers[question].answer1;
      htmlElements.button1.innerHTML = answers[question].answer2; 
    }
    

  }
};
app.init();
