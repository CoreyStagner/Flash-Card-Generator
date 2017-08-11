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

function Card(front, back) {
// Card Constructor
    this.front = front;
    this.back = back;
    // Card.recordCard allows the user to record the users own questions and push 
    // them to the questions array to use when running playFlashCards().
    this.recordCard = function(front, back){
        data = {
            type: "basic",
            front: this.front,
            back: this.back
        } //end data{}
        var newCard = data;
        questionsArr.push(data);
        console.log(questionsArr);
    }//end recordCard()
}//end Card({})

module.exports = Card