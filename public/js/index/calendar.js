document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    const url = window.location.href + "/data";
    serverRequest(url, "GET", {}, (res) => {
        
        console.log(res)
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: res
          });
          calendar.render();
    })
  });