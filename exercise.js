$(document).ready(function () {
  $('#ajax-form button[type="submit"]').click((event) => {
    event.preventDefault()
    // Step 9 and step 10 code goes here
    console.log(document.getElementById("ajax-form"))
    var val_a = document.getElementById("ajax-form");
    var notes = null;
    for (var i = 0; i < val_a.childNodes.length; i++) {
      console.log(val_a.childNodes[i])
      if (val_a.childNodes[i].name == "lname") {
        notes = val_a.childNodes[i];
        break;
      }
    }
    console.log(notes.value)
    $.get('./step5', {
      fname: $(
        '#ajax-form input[name="fname"]'
      ).val(),
      lname: notes.value,

    }, (data) => {

      var a = document.createElement("a")
      a.textContent = data
      document.getElementById("ajax-output").appendChild(a)
    })

    // Step 11 code goes here
  })
});
