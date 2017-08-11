///////////////////////////////////////////////////////////////////////////////////////////////////
//
//      Flash Card Generator
//
//      A CLI node application that will allow you to create your own flash cards to be used for 
//      studying, create trivia questions for your friends, or just to have some fun.
//
//      This application was written by:
//          CS Dev (Corey Stagner)
//          Copyright © 2017. All Rights Reserved.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Requires
var fs = require("fs"); // Allows user to access the file system surrounding the app
var inquire = require("inquirer"); // Allows the user to interact with the app and have the app see the users input
var chalk = require("chalk"); // Allows adding color to text in the CLI
var Card = require("./Card"); // Imports the Card Constructor
var ClozeCard = require("./ClozeCard.js"); // Imports the Cloze Card Constructor

// Initial Values
var questionsArr = []; // Creates an empty array
getQuestions(); // Fills Array with the library.json file
var score = 0; // Declares and set the variable to zero for the first run
var wrong = 0; // Declares and set the variable to zero for the first run

// Functions



function getQuestions(){
// Function used to get the questions[] from the library.json file
    fs.readFile("library.json", "utf8", fileReader);
    // end fs.readFile()
}//end getQuestions()

function fileReader(err, data) {
// Function used to read the library.json file and assign it to the questionsArr
    if (err) {
        console.log(err);
    }
    questionsArr = JSON.parse(data);
}//end fileReader()

function setQuestions(){
// Function used to set the questions[] to the library.json file
    fs.writeFile("library.json", JSON.stringify(questionsArr), function(err){
        if(err) console.log(err);
    });//end fs.writeFile()
}//end setQuestions

function playFlashCards(){
// function that runs through array asking the questions and hold the score values
// to inform the user once they are done
    if(questionsArr.length > 0){
        console.log("QUESTION: ");
        theCard = pickCard();
        // console.log(theCard.front);
        // console.log(theCard.back);
        inquire.prompt([
            {
                type: "input",
                message: theCard.front,
                name: "answer"
            }
            ]).then(function(response){
                var guess = response.answer;
                var correct = theCard.back;
                console.log("You guessed " + guess);
                if (guess === correct){
                    console.log(chalk.green("Correct"));
                    score++;
                } else {
                    console.log(chalk.red(`That was Incorrect
                  The question was "${theCard.front}"
            The correct answer was "${theCard.back}"`));
                    wrong++;
                }
                // recursion of function
                playFlashCards();
            });// end inquire.prompt.then()
    }else{
        console.log("Game is Over! \nYou got " + score + " correct.\nYou missed " + wrong + "!");
    }// end if/else()
}
function gameChoice(){
    score = 0;
    wrong = 0;
    inquire.prompt([
        {
            type:"list",
            message: "Grab a drink, and let's study. What do you want to do?",
            choices: ["Study Flash Cards", "Create New Cards", "Clear All Flash Cards", "Quit school and be a bum!"],
            name: "game"
        }// end prompt()
    ]).then(function(response){
        var rg = response.game;
        console.log(rg);
        if(rg === "Study Flash Cards"){
            console.log("You are studying your flash cards. Now you will ace this test.");
            playFlashCards();
        } else if(rg === "Create New Cards"){
            inquire.prompt([
                {
                    type: "list",
                    message: "What kind of card would you like to create?",
                    choices: ["Q & A", "Fill in the blank"],
                    name: "cardType"
                }
            ]).then(function(response){
                var newCardType = response.cardType;
                console.log(newCardType);
                if(newCardType === "Q & A"){
                    cardCreate();
                } else if (newCardType === "Fill in the blank"){
                    clozeCardCreate();
                } else {
                    console.log("Stop Hammertime");
                }
            });
            // cardCreate();
            // console.log("Let's make a new card");
            // inquire.prompt([
            //     {
            //         type: "input",
            //         message: "What is your question?",
            //         name: "front"
            //     }
            // ]).then(function(response){
            //     front = response.front;
            //     console.log("You just submitted this front: \n" + front);
            //     inquire.prompt([
            //         {
            //             type: "input",
            //             message: "What is answer to your question?",
            //             name: "back"
            //         }
            //     ]).then(function(input){
            //         var back = input.back;
            //         // console.log("back is " + back);
            //         // console.log("You just submitted this back: \n" + back);
            //         var newCard = new Card(front, back);
            //         questionsArr.push(newCard);
            //         setQuestions();
            //         gameChoice();
            //     });// end answer inquire.prompt.then()
            // });// end question inquire.prompt.then()
        } else if(rg === "Clear All Flash Cards"){
            clearQuestions();
        } else if(rg === "Quit school and be a bum!"){
            console.log(chalk.inverse("That is a personal decision, but I am going to recommend against that!"));
        } else{
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

function clearQuestions(){
    questionsArr = [];
    fs.writeFile("library.json", "[]", function(err){
        if(err){
            console.log("Error: " + err);
        }//end if();
    })
    gameChoice();
};

function cardCreate(){
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
                    gameChoice();
                });// end answer inquire.prompt.then()
            });
}

function clozeCardCreate(){
    console.log("Started Cloze Card Construction");
                console.log("Let's make a new card");
            inquire.prompt([
                {
                    type: "input",
                    message: "What is the full text?",
                    name: "front"
                }
            ]).then(function(response){
                front = response.front;
                inquire.prompt([
                    {
                        type: "input",
                        message: "What would you like hidden?",
                        name: "back"
                    }
                ]).then(function(input){
                    var back = input.back;
                    // console.log("back is " + back);
                    // console.log("You just submitted this back: \n" + back);
                    var newCard = new ClozeCard(front, back);
                    questionsArr.push(newCard);
                    setQuestions();
                    gameChoice();
                });// end answer inquire.prompt.then()
    // var newCard = new ClozeCard("Pickles is Kevins Favorite Variable", "Pickles");
    // questionsArr.push(newCard);
    // setQuestions();
            });
}// end clozeCardCreate()

gameChoice();