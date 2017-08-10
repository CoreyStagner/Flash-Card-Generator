function Card(front, back) {
// Card Constructor
    this.front = front;
    this.back = back;
    // Card.recordCard allows the user to record the users own questions and push 
    // them to the questions array to use when running playFlashCards().
    this.recordCard = function(front, back){
        data = {
            front: this.front,
            back: this.back
        } //end data{}
        var newCard = data;
        questionsArr.push(data);
        console.log(questionsArr);
    }//end recordCard()
}//end Card({})

module.exports = Card