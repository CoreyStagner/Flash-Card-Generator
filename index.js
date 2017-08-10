// Requires
var fs = require("fs"), obj;
var inquire = require("inquirer");
var chalk = require("chalk");
var colors = require("colors");


// Initial Values
var questionsArr = [];
getQuestions();

// Set up Functions
function Card(front, back) {                     // Constructor for the Card
    this.front = front;
    this.back = back;
    this.recordCard = function(front, back){     // Function the record the card and add it to questionArr
        data = {
            front: this.front,
            back: this.back
        } //end data{}
        var newCard = data;
        questionsArr.push(data);
        console.log(questionsArr);
    }//end recordCard()
}//end Card({})

// var test = new Card("The answer to life?", "42").recordCard();
// var test = new Card("This is a test", "But you failed").recordCard();
// setQuestions();

function getQuestions(){                         // Function used to get the questions[] from the library.json file
    fs.readFile("library.json", "utf8", fileReader);
    console.log("getQuestions(): " + questionsArr.length + " rounds");
    // end fs.readFile()
}//end getQuestions()

function fileReader(err, data) {                 // Function used to read the library.json file and assign it to the questionsArr
    if (err) {
        console.log(err);
    }
    questionsArr = JSON.parse(data);
    console.log(questionsArr);
}//end fileReader()

function setQuestions(){                         // Function used to set the questions[] to the library.json file
    fs.writeFile("library.json", JSON.stringify(questionsArr), function(err){
        if(err) console.log(err);
    });//end fs.writeFile()
}//end setQuestions

function playFlashCards(){
    console.log("You are studying your flash cards. Now you will ace this test.");
    if(questionsArr.length > 0){
        console.log(questionsArr.length);
        console.log("Game continues");
        // console.log(numRounds);
        theCard = pickCard();
        console.log(theCard.front);
        console.log(theCard.back);
        // console.log("Your Question is " + JSON.stringify(theCard, null, 2));
        inquire.prompt([
            {
                type: "input",
                message: theCard.front,
                name: "answer"
            }
            ]).then(function(response){
                var guess = String(response.answer);
                var correct = String(theCard.back);
                console.log("You guessed " + guess);
                console.log("You should have guessed " +theCard.back)
                if (guess.toLowerCase === correct.toLowerCase){
                    console.log("Correct");
                    score++;
                } else {
                    console.log("Wrong");
                }
                // recursion of function
                playFlashCards();
            });// end inquire.prompt.then()
    }else{
        console.log("Game is Over");
        console.log("Congradulations, out of " + rounds + ", you got " + score + " correct.")
    }// end if/else()
}
function gameChoice(){
    score = 0;
    inquire.prompt([
        {
            type:"list",
            message: "Grab a drink, and let's study. What do you want to do?",
            choices: ["Study Flash Cards", "Create New Cards"],
            name: "game"
        }// end prompt()
    ]).then(function(response){
        var rg = response.game;
        console.log(rg);
        if(rg === "Study Flash Cards"){
            playFlashCards();
        } else if(rg === "Create New Cards"){
            console.log("Let's make a new card");
            inquire.prompt([
                {
                    type: "input",
                    message: "What is your question?",
                    name: "front"
                }
            ]).then(function(response){
                front = response.front;
                console.log("You just submitted this front: \n" + front);
                inquire.prompt([
                    {
                        type: "input",
                        message: "What is answer to your question?",
                        name: "back"
                    }
                ]).then(function(input){
                    var back = input.back;
                    // console.log("back is " + back);
                    // console.log("You just submitted this back: \n" + back);
                    var newCard = new Card(front, back);
                    questionsArr.push(newCard);
                    setQuestions();
                });// end answer inquire.prompt.then()
            });// end question inquire.prompt.then()
        }else{
            console.log("I have no idea how you got here!");
        }// end else if()
    }); // end .then()
}// end gameChoice()

function pickCard(){
    var questionsRemaining = questionsArr.length;
    var randomIndex = Math.floor(Math.random() * questionsRemaining);
    var chosenCard = questionsArr[randomIndex];
    // console.log(chosenCard);
    questionsArr.splice(randomIndex, 1);
    return chosenCard;
}// end pickCard()

// Sandbox

// setQuestions();
// getQuestions();
gameChoice();