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
}
function gameChoice(){
    score = 0;
    rounds = questionsArr.length;
    console.log("there is " + rounds + " Rounds")
    inquire.prompt([
        {
            type: "list",
            message: "Are you over 21?",
            choices: ["Yes", "No"],
            name: "adult"
        }// end prompt()
    ]).then(function(response){
        var ra = response.adult;
        console.log(ra);
        if(ra === "Yes"){
            console.log("You are consenting that you are over 21. You may even not be but honestly, who cares! Have fun and study hard!");
            inquire.prompt([
                {
                    type:"list",
                    message: "Grab a drink, and let's study. What do you want to do?",
                    choices: ["Study Flash Cards", "Create New Cards", "Save Cards"],
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
                } else if(rg === "Save Cards"){
                    console.log("Saving your cards to your library!");
                    setQuestions();
                }else{
                    console.log("I have no idea how you got here!");
                }// end else if()
            }); // end .then()
        } else if(ra === "No") {
            console.log("Lame, you admitted that are under 21. There was no way for me to validate that.");
            inquire.prompt([
                {
                    type:"list",
                    message: "Since you are under age, which game do you want to play?",
                    choices: ["Standard Trivia Game", "Advanced Trivia Game"],
                    name: "game"
                }// end prompt
            ]).then(function(response){
                var rg = response.game;
                    console.log(rg);
                    if(rg === "Standard Trivia Game"){
                        startBasicTrivia();
                    } else if(rg === "Advanced Trivia Game"){
                        startAdvancedTrivia();
                    } else{
                        console.log("I have no idea how you got here!");
                    }
            });// end then()
        } else {
            console.log("Something is not working on my age prompt question!")
        }//end else if()
    });// end inquire.prompt(Are you 21?)
}// end gameChoice()

// Sandbox

// setQuestions();
// getQuestions();
gameChoice();