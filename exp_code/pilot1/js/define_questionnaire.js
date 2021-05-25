/* PRESENT FINAL QUESTIONNAIRE */

/* present recap of instructions to be presented at different parts of the instructions */ 
var prequest_screen = {
	type: "html-keyboard-response-minimumRT",
	stimulus: function() {

			return "<div class='divmiddle'>" +
			"<p>The main part of the experiment is over!</p>" +
		"<p>You will now be presented a final questionnaire in order for us to understand better your choices. Please try to answer accurately, as this will" +
		" help us improve our research. Some questions are multiple-option, and some require you to write a brief answer by means of the keyboard.</p>" +
			"</div>" +
			"<div class='divbottom'>" +
			"<p>Press the <strong>space bar</strong> to start the questionnaire.</p>" +
			"</div>"
	} ,
	choices: ['Space'],
	minimum_RT: minRT_500,
	post_trial_gap: 500		
} /* end of prequest_screen */

var final_questionnaire_multop = { /* multiple-option forced-choice questions */
  type: 'survey-multi-choice',
  questions: [
	  
    { prompt: "Robbie's choice were always random. But did you feel that?", 
	  name: 'q_Robbie_random', 
	  options: [
		  "I felt that Robbie's choices were always random", 
	  "I felt that Robbie's choices were sometimes not random", 
	"I felt that Robbie's choices were most of the times non random", 
		  "I felt that Robbie's choices were never random"], 
		  required: true, 
		  horizontal: false },
	  
    { prompt: "In relation to that, did you feel that, within a block, Robbie learned about each deck's probability and used that learning to choose?", 
		  name: 'q_Robbie_random', 
		  options: [
			  "I felt that Robbie did not use any learning", 
			  "I felt that Robbie chose based on his learning sometimes", 
			  "I felt that Robbie chose based on his learning most of the times", 
			  "I felt that Robbie always chose based on his learning"], 
			  required: true, 
			  horizontal: false },
	
    { prompt: "Did you feel that, independently of the reward probability, Robbie was biased toward choosing any of the decks?", 
			  name: 'q_Robbie_deckbias', 
			  options: [
				  "I felt that Robbie was biased toward choosing the blue deck",
				   "I felt that Robbie was not biased toward any deck", 
				  "I felt that Robbie was biased toward choosing the pink deck"], 
				  required: true, 
				  horizontal: false },
	  
    { prompt: "Did you feel that, independently of the reward probability, Robbie was biased toward choosing the deck that occupied any of the two positions (left or right) on the screen?", 
				  name: 'q_Robbie_locbias', 
				  options: [
					  "I felt that Robbie was biased toward choosing the deck on the left of the screen", 
					  "I felt that Robbie was not biased toward any of the two positions", 
					  "I felt that Robbie was biased toward choosing the deck on the right of the screen"], 
					  required: true, 
					  horizontal: false },
	
    { prompt: "Did you feel that, independently of the reward probability, you had a tendency toward choosing more the deck that occupied any of the two positions (left or right) on the screen?", 
					  name: 'q_subj_locbias', 
					  options: [
						  "I had a tendency to choose more the deck on the left of the screen",
						   "I had no tendency to choose based on the position of the decks on the screen", 
						  "I had a tendency to choose more the deck on the right of the screen"], 
						  required: true, 
						  horizontal: false },
	  
    { prompt: "Did you feel that, independently of the reward probability, you had a tendency toward choosing more one of the decks based on its color?",
						   name: 'q_subj_colorbias', 
						  options: [
							  "I had a tendency to choose more the blue deck", 
							  "I had no tendency to choose based on the deck's color", 
							  "I had a tendency to choose more the pink deck"], 
							  required: true, 
							  horizontal: false },
	  
	{ prompt: "When choosing whether to pick a card from one of the two decks, did you make those choices considering the past choices (either yours or Robbie's) on that block?", 
	  name: 'q_pastch', 
							  options: [
								  "I did not consider any past choice", 
								  "I considered past choices"], 
								  required: true, 
								  horizontal: false },
	  
	{ prompt: "When choosing whether to pick a card from one of the two decks, did you give the same importance to the choices you made than to the choices you " + 
	  "observed from Robbie?", 
								  name: 'q_weight_obsac', 
								  options: [
									  "I only chose based on the choices I made", 
									  "I gave more importance to my choices, but still learn from Robbie's choices", 
									  "I gave the same importance to the choices I made and from the choices I observed from Robbie"], 
									  required: true, 
									  horizontal: false },
	  
	{ prompt: "Even if each deck's reward probability changed from block to block, did you also take into account any learning about both decks' probabilities from past blocks?",  
	  name: 'q_pastch', 
									  options: [
										  "I did not consider any learning from past blocks", 
										  "I considered learning from past blocks"], 
										  required: true, 
										  horizontal: false }
  ],
data: {
	questionnaire: 1, /* so later questionnaire data can be filtered */ 
}
};

var final_questionnaire_free = { /* free answer questions, in which participants can write a text */
  type: 'survey-text-mod',
  questions: [
    {prompt: "Please write in a few lines any choice strategy you may have used.", 
	  name: 'q_chostrat'}, 
    {prompt: "Please write any other consideration you may have so we can better understand your choices when analyzing them.", 
	  name: 'q_generalcons'}
  ],
  data: {
  	questionnaire: 1, /* so later questionnaire data can be filtered */ 
  }
};

/*Putting questionnaire into a timeline so we can present it or skip it via the variable present_questionnaire */
var tl_final_questionnaire = {
	timeline: [prequest_screen, final_questionnaire_multop, final_questionnaire_free],
	conditional_function: function(){
		if ( present_questionnaire == 1){
			return true;
		} else {
			return false;
		}
	}   
}