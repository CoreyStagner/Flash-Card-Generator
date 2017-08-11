function ClozeCard(front, back) {
// Card Constructor
    this.full = front;
    this.back = back;
    this.front = this.full.replace(this.back, "_______");
    // Card.recordCard allows the user to record the users own questions and push 
    // them to the questions array to use when running playFlashCards().
    this.recordCard = function(front, back){
        data = {
            type: "cloze",
            full: this.front,
            front: this.front, // needs to be fixed
            back: this.back
        }; //end data{}
        var newCard = data;
        questionsArr.push(data);
        console.log(questionsArr);
    }//end recordCard()
}//end Card({})

module.exports = ClozeCard