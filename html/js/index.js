"use strict";

//call the fnction in every 4 seconds.write ajax in that function.
var timerForLoadingResult = setInterval(checkServerForFile,4000);
var url = "http://172.31.4.58:2406/getcardstats";

$('#exists').hide();
$('#doesnt-exists').show();

function checkServerForFile() {
  $.ajax({
    cache: false,
    url: url,
      success: function (result) {

        //if the file is on server
        if (result == "true") {

          console.log("Result: true");

          $('#exists').show();
          $('#doesnt-exists').hide();

          // Go to the next page
          window.location.href = "UserForm.html";

        } else {
          console.log("Result: false");
        }
      },
      error: function(result) {
        console.log("Cannot reach server.");
      },
    }
  );
}
