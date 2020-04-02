var questions = new Array();
var maxNumber = 20;
var questionAmount = 10;
var name = "";
var level = 0;
var promptQuestionAmount = false;

var leaderboardEntry = new Array();

function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * Math.floor(max));
}

function returnToWelcome() {
  document.getElementById("welcomeScreen").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("leaderboard").style.display = "none";
  resetInterfaces();
}

//Minion Name, ID, Elixir Cost, Minion Type(minion, spell, building)
var minions = [
    ["Skeletons", 12345, 1, "minion"],
    [],
    []
];

function resetInterfaces() {
  document.getElementById("questionArea").innerHTML = "";
  document.getElementById("background").style.background =
    'linear-gradient( to bottom right, rgb(0, 0, 0, 0.3), rgb(128, 128, 128)),url("https://wallpapertag.com/wallpaper/full/9/b/9/80891-math-background-1920x1200-meizu.jpg")';

  document.getElementById("time").innerHTML = "<b>Time:</b>";
  document.getElementById("score").innerHTML = "<b>Score:</b>";
  document.getElementById("quiz-button").innerHTML = "Start!";
}

function leaderboardShow() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("leaderboard").style.display = "block";
    
    var table = document.getElementById("leaderboard-table");
    
    //Clears entries defore redrawing rows to avoid duplicates.
    for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
        }
    
    for (var x = 0; x < leaderboardEntry.length; x++) {
        var row = table.insertRow();
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = (x+1);
    cell2.innerHTML = leaderboardEntry[x][0];
    cell3.innerHTML = leaderboardEntry[x][1];
    cell4.innerHTML = leaderboardEntry[x][2];
    cell5.innerHTML = leaderboardEntry[x][3];
    }
}

function userJoin() {
  name = document.getElementById("nameInput").value;
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("leaderboard").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  if (document.getElementById("radio1").checked) {
    level = 1;
    maxNumber = 10;
  } else if (document.getElementById("radio2").checked) {
    level = 2;
    maxNumber = 20;
  } else if (document.getElementById("radio3").checked) {
    level = 3;
    maxNumber = 100;
  } else {
    level = 4;
    maxNumber = 100;
  }

  document.getElementById("playerMessage").innerHTML =
    "Goodluck <strong>" +
    name +
    "</strong>, you are attempting <strong>level " +
    level +
    "</strong>, press <strong>start</strong> to begin.";
}

function createQuestion() {
  //Generate two numbers
  //pick sign
  //prompt question
  //return in list, first num, sign in string form, correct answer, entered answer.
  var numOne = getRandomInt(maxNumber);
  var numTwo = getRandomInt(maxNumber);
  while (numOne % numTwo !== 0) {
    numOne++;
  }

  var sign = 0;

  if (level === 1) {
    sign = getRandomInt(2);
  } else if (level === 2) {
    sign = getRandomInt(3);
  } else if (level === 4) {
    sign = getRandomInt(3);
  } else {
    sign = getRandomInt(4);
  }

  var correctAnswer = 0;

  var signString = "";

  if (sign === 1) {
    signString = "+";
    correctAnswer = returnAnswer(numOne, numTwo, signString);
  } else if (sign === 2) {
    signString = "-";
    correctAnswer = returnAnswer(numOne, numTwo, signString);
  } else if (sign === 3) {
    signString = "*";
    correctAnswer = returnAnswer(numOne, numTwo, signString);
  } else {
    signString = "/";
    correctAnswer = returnAnswer(numOne, numTwo, signString);
  }

  var userAnswer = prompt(numOne + " " + signString + " " + numTwo + " = ...");
  return [numOne, numTwo, signString, correctAnswer, userAnswer];
}

function wasCorrect(correct, user, format) {
  //alert("User Input: " + user + " correct was: " + correct);
  if (Math.abs(correct - user) > 0.1) {
    if (format !== "html") {
      return 0;
    } else {
      return (
        ' <b style="color: red;">not correct! X</b> should\'ve been <b style="color: red;">' +
        correct +
        "</b>!"
      );
    }
  } else {
    if (format !== "html") {
      return 1;
    } else {
      return ' <b style="color: #7ab20a;">correct! &checkmark;</b>';
    }
  }
  /*return correct === user
    ? ' <b style="color: green;">correct! &checkmark</b>'
    : ' <b style="color: red;">not correct! X</b>';
    */
}

function returnHTMLString(index) {
  return (
    '<div class="question">' +
    "<h2>Question " +
    (index + 1) +
    "</h2>" +
    "<hr>" +
    "<p>The question was</p>" +
    "<h3><b>" +
    questions[index][0] +
    " " +
    questions[index][2] +
    " " +
    questions[index][1] +
    " = ...</b></h3>" +
    "<p>You guessed <b>" +
    questions[index][4] +
    "</b></p>" +
    "<h3>This is " +
    wasCorrect(questions[index][3], questions[index][4], "html") +
    "</h3>" +
    "</div>"
  );
}

function returnScore() {}

function returnAnswer(numOne, numTwo, signString) {
  if (signString === "+") {
    return numOne + numTwo;
  } else if (signString === "-") {
    return numOne - numTwo;
  } else if (signString === "*") {
    return numOne * numTwo;
  } else {
    return numOne / numTwo;
  }
}

function resetQuestionArea() {
  document.getElementById("questionArea").innerHTML = "";
  questions = [];
}

function printQuestions() {
  if (promptQuestionAmount) {
    questionAmount = prompt("How many questions would you like?");
  }
  var correct = 0;
  var start = new Date().getTime();
  resetQuestionArea();
  for (var x = 0; x < questionAmount; x++) {
    var questionInfo = createQuestion();
    questions.push([
      questionInfo[0],
      questionInfo[1],
      questionInfo[2],
      questionInfo[3],
      questionInfo[4]
    ]);
  }

  var htmlString = "";

  for (var x = 0; x < questionAmount; x++) {
    htmlString += returnHTMLString(x);
    correct += wasCorrect(questions[x][3], questions[x][4], "int");
  }

    
    
   
    
  var end = new Date().getTime();
    
    
    var time = (end-start) + " ms";
    var score = correct + "/" + questionAmount;
     //Leaderboard entry consists of name, level, time and score
    leaderboardEntry.push([name, level, time, score]);
    
  document.getElementById("time").innerHTML =
    "<b>Time: " + time + "</b>";
  document.getElementById("score").innerHTML =
    "<b>Score: " + score + "</b>";
  document.getElementById("questionArea").innerHTML = htmlString;
  document.getElementById("quiz-button").innerHTML = "Play Again!";
  if ((correct / questionAmount) * 100 > 70) {
    //If above 70%, green background tint
    document.getElementById("background").style.background =
      'linear-gradient(to bottom right,rgb(0, 0, 0, 0.2),rgb(0, 255, 0)),url("https://wallpapertag.com/wallpaper/full/9/b/9/80891-math-background-1920x1200-meizu.jpg")';
  } else if ((correct / questionAmount) * 100 < 40) {
    //If below 40%, red background tint
    document.getElementById("background").style.background =
      'linear-gradient(to bottom right,rgb(0, 0, 0, 0.2),rgb(255, 0, 0)),url("https://wallpapertag.com/wallpaper/full/9/b/9/80891-math-background-1920x1200-meizu.jpg")';
  } else {
    //If below 40%, red background tint
    document.getElementById("background").style.background =
      'linear-gradient(to bottom right,rgb(0, 0, 0, 0.2),rgb(255, 165, 0)),url("https://wallpapertag.com/wallpaper/full/9/b/9/80891-math-background-1920x1200-meizu.jpg")';
  }
    

}
