$(document).ready(function () {
  // Function to display the current date and update it every minute
  function displayCurrentDate() {
    var currentDay = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(currentDay);
  }

  // Function to color-code time blocks based on the current time and update every minute
  function colorCodeTimeBlocks() {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to load saved events from local storage
  function loadEvents() {
    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var savedEvent = localStorage.getItem(blockId);
      if (savedEvent) {
        $(this).find('.description').val(savedEvent);
      }
    });
  }

  // Save event text to local storage when the save button is clicked
  $('.saveBtn').on('click', function () {
    var blockId = $(this).closest('.time-block').attr('id');
    var eventText = $(this).siblings('.description').val();
    localStorage.setItem(blockId, eventText);
  });

  // Initialize the application
  displayCurrentDate();
  colorCodeTimeBlocks();
  loadEvents();

  // Call the colorCodeTimeBlocks function every minute (60000 milliseconds)
  setInterval(colorCodeTimeBlocks, 60000);

  // Call the displayCurrentDate function every minute (60000 milliseconds)
  setInterval(displayCurrentDate, 60000);
});
