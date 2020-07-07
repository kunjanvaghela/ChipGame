var turn=1;
var columnClass;
var rowClass;
var colorr;
var player1;
var player2;

function status(){
  if (turn==1){
    $("#status").text(player1+": it is your turn, please pick a column to drop your red chip.");
  }
  else if (turn==2) {
    $("#status").text(player2+": it is your turn, please pick a column to drop your blue chip.");
  }
}

function onclick(){
  var className=($(this).children().attr("class")).split(" ");
  columnClass=$("."+className[1]);
  // rowClass=$("."+className[2]);

  for (var i = (columnClass.length-1); i >=0; i--) {
    // console.log($(columnClass.eq(i)));

    // First check if the td is gray or not
    if($(columnClass.eq(i)).css("background-color")!="rgb(128, 128, 128)"){
      continue;
    }

    // Now assign the colors
    if (turn==1){
      colorr="rgb(255, 0, 0)";
      $(columnClass.eq(i)).css("background-color",colorr);
      rowClass=$(columnClass.eq(i)).attr("class").split(" ")[2];
      rowClass=$("."+rowClass);
      // console.log(rowClass);
      checkIfWon();
      if (turn!=0){turn=2;}
    }
    else if (turn==2){
      colorr="rgb(0, 0, 255)";
      $(columnClass.eq(i)).css("background-color",colorr);
      rowClass=$(columnClass.eq(i)).attr("class").split(" ")[2];
      rowClass=$("."+rowClass);
      checkIfWon();
      if (turn!=0){turn=1;}
    }
    status();
    break;
  }
}

function checkIfWon(){
  var countConsec=0
  for (var i = 0; i < rowClass.length ; i++) {
    if ($(rowClass.eq(i)).css("background-color") == colorr){
      countConsec++;
    }
    else{
      countConsec=0;
    }
    if (countConsec==4){
      if (turn==1){
        $("#status").text(player1+" has won! Refresh your browser to play again!");
      }
      else if (turn==2) {
        $("#status").text(player2+" has won! Refresh your browser to play again!");
      }
      turn=0;
    }
  }
}

player1=prompt("Player 1: Enter your name, you will be Red");
player2=prompt("Player 2: Enter your name, you will be Blue");
status();
$('td').click(onclick)
