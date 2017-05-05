var htmlElements = {
  contacts: document.getElementsByTagName('div')

};
var app = {
  init: function() {
    contactsInteractions.addClick();

  }
};

var contactsInteractions = {
  addClick : function () {
    for (var i = 0; i < htmlElements.contacts.length; i++) (function(i) { //temp scope to make it work with onclick
      htmlElements.contacts[i].removeAttribute("tabindex");
      htmlElements.contacts[i].onclick = function() {
        if (htmlElements.contacts[i].className == "show") {
          htmlElements.contacts[i].className = htmlElements.contacts[i].className.replace(/\bshow/g, "");
        } else {
          htmlElements.contacts[i].className = "show";
        }

      }
    })(i);

  }
};
app.init();
