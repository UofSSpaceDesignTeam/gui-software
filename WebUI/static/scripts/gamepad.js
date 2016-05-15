function GamePad(){
  //Added by Liam//
  var buttonInfo ='{"button": "0"}'
  var obj = JSON.parse(buttonInfo);
  var hasGP = false;
  var repGP;

  var SendDataButton = [];
  var SendDataAxes = [];

  var Test = 0;
  var RoverYPos = 0;
  var RoverXPos = 0;
  SendDataButton[0] = parseFloat(document.getElementById("XPos").value);
  SendDataButton[1] = parseFloat(document.getElementById("YPos").value);

  function canGame() {
    return "getGamepads" in navigator;
  }


  function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
      html += "id: "+gp.id+"<br/>";


    for(var i=0;i<gp.buttons.length;i++) {



      html+= "Button "+(i+1)+": ";
      if(gp.buttons[i].pressed) html+= " pressed";
        html+= "<br/>";
      
      //Updates Rover Position//
      if(gp.buttons[1].pressed){
        SendDataButton[0]+=0.001;
        document.getElementById("XPos").value =SendDataButton[0];

      }
      else if(gp.buttons[0].pressed){ 
        SendDataButton[1]-=0.001;
        document.getElementById("YPos").value = SendDataButton[1];
      }
      else if(gp.buttons[3].pressed){ 
        SendDataButton[1]+=0.001;
        document.getElementById("YPos").value = SendDataButton[1];
      }
      else if(gp.buttons[2].pressed){ 
        SendDataButton[0]-=0.001;
        document.getElementById("XPos").value = SendDataButton[0];
      }

    }

      SendDataAxes[0] = gp.axes[0];
      document.getElementById("Stick1X").value = SendDataAxes[0];
      SendDataAxes[1] = gp.axes[1];
      document.getElementById("Stick1Y").value = SendDataAxes[1];


    //Loops through Axis values 
    for(var i=0;i<gp.axes.length; i+=2) {
    }

    $.ajax({
            url: "/data/buttons",
            method: "POST",
            data: JSON.stringify({"buttons" : SendDataButton}),
            contentType: "application/json"
          });

    $.ajax({
            url: "/data/axes",
            method: "POST",
            data: JSON.stringify({"axes" : SendDataAxes}),
            contentType: "application/json",
            complete: function(results) {
                console.log("Success");
              }

          });


   
  }

  $(document).ready(function() {

    if(canGame()) {

      var prompt = "To begin using your gamepad, connect it and press any button!";
      $("#gamepadPrompt").text(prompt);

      $(window).on("gamepadconnected", function() {
        hasGP = true;
        $("#gamepadPrompt").html("Gamepad connected!");
        console.log("connection event");
        repGP = window.setInterval(reportOnGamepad,100);
      });

      $(window).on("gamepaddisconnected", function() {
        console.log("disconnection event");
        $("#gamepadPrompt").text(prompt);
        window.clearInterval(repGP);
      });

      //setup an interval for Chrome
      var checkGP = window.setInterval(function() {
        console.log('checkGP');
        if(navigator.getGamepads()[0]) {
          if(!hasGP) $(window).trigger("gamepadconnected");
          window.clearInterval(checkGP);
        }
      }, 500);
    }

  });
}


