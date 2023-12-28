// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var CurrHour = dayjs().hour()
var EventShit = localStorage.getItem('Events');
var TimeDisplay = $('#currentDay')

if (EventShit) {
  
  EventShit = JSON.parse(EventShit);

} else {

  EventShit = []

}

function SaveEventStorage(NewArray) {

  localStorage.setItem('Events', JSON.stringify(NewArray))
  EventShit = NewArray

}

function displayTime() {
  var CurrentTime = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  TimeDisplay.text(CurrentTime);
}

for (var i = 0; i <= 24; i++) {

  var CurrentSquare = $('#hour-' + i)
  var SaveButton = CurrentSquare.find('button')
  var CurrSquareText =  CurrentSquare.find('textarea')

  CurrSquareText.val('')

  // Load Events

  for (var i2 = 0; i2 < EventShit.length; i2++) {

    if (EventShit[i2].Hour && EventShit[i2].Hour == i) {

      CurrSquareText.val(EventShit[i2].Event)

    }

  } 

  SaveButton.on('click', function(event) {

    event.preventDefault();

    // Saves the section to localstorage, this is a really fuckin' stupid method but the other one I thought of didn't work soooooooooooooooo

    var SectionNum = this.parentElement.id.replace('hour-','')

    var CommitJQuery = $('#hour-' + SectionNum)
    var TextShit = CommitJQuery.find("textarea").val().trim()

    var FoundTheShit = false

    for (var i2 = 0; i2 < EventShit.length; i2++) {

      if (EventShit[i2].Hour && EventShit[i2].Hour == SectionNum) {

        FoundTheShit = true
        EventShit[i2].Event = TextShit

      }

    }  

    if (!FoundTheShit) {

      var NewEvent = {
        Hour: SectionNum,
        Event: TextShit
      }

      EventShit.push(NewEvent)

    }

    SaveEventStorage(EventShit)

  });

  // Colors

  if (CurrHour > i) {

    CurrentSquare.addClass('past');

  }else if (CurrHour == i) {

    CurrentSquare.addClass('present');

  } else {

    CurrentSquare.addClass('future');

  }

}  

displayTime()
setInterval(displayTime, 1000);

$(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //



  // TODO: Add code to display the current date in the header of the page.



});
