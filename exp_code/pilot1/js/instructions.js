/* DEFINE INSTRUCTIONS */
var exp_instructions = { 

	timeline: [


		/* Instructions, screen 1 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			return "<div class='divmiddle'>" +
			"<p>" + 'Hello! Welcome to this experiment, and thank you for participating. ' +
			'We are interested in how people make choices and how these choices evolve. Your collaboration is much appreciated.'+ "</p>" +
			"<p></p>" +
			"<p>We will start by briefly explaining what you will have to do in this experiment.</p>" +
			"<p></p>" +
			"<p>Press the <strong>space bar</strong> to start with the instructions.</p>" +  
			"</div>"} ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, screen 1 */

		,


		/* Instructions, screen 2 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			if (instr_deckpos==0){	/* color for left deck is blue */
				var card_left = "card_back_blue";
				var card_right = "card_back_pink";		
			} else { /* color for arm left deck is pink */
				var card_left = "card_back_pink";
				var card_right = "card_back_blue";	
			}


			return "<div class='divtop'>" +
			"<p>This experiment is organized in trials.</p>" +
			"<p>Each trial involves a choice between drawing a card from a blue deck, " + 
			"and drawing a card from a pink deck. Like the ones you have below.</p>" +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>" } ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, screen 2 */

		,

		/* Instructions, screen 3 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			return "<div class='divtop'>" +
			"<p>After being drawn, the card will be flipped.</p>" +
			"<p>Cards can be rewarded, like the one on the left, or not rewarded, like the one on the right.</p>" +
			"<p>Each rewarded card will increase the probability of receiving more money at the end of the experiment, " + 
			"so it is good for you to draw as many rewarded cards as possible!</p>" +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/card_hit.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/card_miss.png" />' +
			"<p> </p></div>" + //idem
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>" } ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, screen 3 */

		,

		/* Instructions, choice 1 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			if (instr_deckpos==0){	/* color for left deck is blue */
				var card_left = "card_back_blue";
				var card_right = "card_back_pink";		
			} else { /* color for arm left deck is pink */
				var card_left = "card_back_pink";
				var card_right = "card_back_blue";	
			}


			return "<div class='divtop'>" +
			"<p>Try to draw a card from one of the decks</p>" +
			"<p>If you want to draw a card from the <strong>left</strong> deck, press the letter <strong>S</strong> on the keyboard.</p>" +
			"<p>If you want to draw a card from the <strong>right</strong> deck, press the letter <strong>D</strong> on the keyboard. </p>" +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>" } ,
			choices: ['s', 'd'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, choice 1 */

		,

		/* Instructions, choice 1 feedback */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;

			if (instr_ordhitmiss==0){ /* in this first example, chosen card will be rewarded */
				var card_revealed = "card_hit";	
				var message_forrew = "was rewarded";
			} else { /* in this first example, chosen card will NOT be rewarded */
				var card_revealed = "card_miss";
				var message_forrew = "was not rewarded";		
			}	


			if (key_pressed==83){	/* S was pressed, so left choice */

				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = card_revealed;
					var card_right = "card_back_pink";		
				} else { /* color for arm left deck is pink */
					var card_left = card_revealed;
					var card_right = "card_back_blue";	
				}

			} else { /* D was pressed, so right choice */
	
				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = "card_back_blue";
					var card_right = card_revealed;		
				} else { /* color for arm left deck is pink */
					var card_left = "card_back_pink";
					var card_right = card_revealed;	
				}
	
			}

			return "<div class='divtop'>" +
			"<p>" + 'Your chosen card has been revealed and this card '+ message_forrew + "</p>" +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>"} ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, choice 1 feedback */

		,

		/* Instructions, choice 2 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			if (instr_deckpos==0){	/* color for left deck is blue */
				var card_left = "card_back_blue";
				var card_right = "card_back_pink";		
			} else { /* color for arm left deck is pink */
				var card_left = "card_back_pink";
				var card_right = "card_back_blue";	
			}


			return "<div class='divtop'>" +
			"<p>Alright, let's make another choice. Try to draw a card from one of the decks</p>" +
			"<p>If you want to draw a card from the <strong>left</strong> deck, press the letter <strong>S</strong> on the keyboard.</p>" +
			"<p>If you want to draw a card from the <strong>right</strong> deck, press the letter <strong>D</strong> on the keyboard. </p>" +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>" } ,
			choices: ['s', 'd'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, choice 2 */

		,
	
		/* Instructions, choice 2 feedback */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;

			if (instr_ordhitmiss==0){ /* in this second example, chosen card will be NOT rewarded */
				var card_revealed = "card_miss";	
				var message_forrew = "was not rewarded";
			} else { /* in this second example, chosen card will be rewarded */
				var card_revealed = "card_hit";
				var message_forrew = "was rewarded";		
			}	


			if (key_pressed==83){	/* S was pressed, so left choice */

				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = card_revealed;
					var card_right = "card_back_pink";		
				} else { /* color for arm left deck is pink */
					var card_left = card_revealed;
					var card_right = "card_back_blue";	
				}

			} else { /* D was pressed, so right choice */
	
				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = "card_back_blue";
					var card_right = card_revealed;		
				} else { /* color for arm left deck is pink */
					var card_left = "card_back_pink";
					var card_right = card_revealed;	
				}
	
			}

			return "<div class='divtop'>" +
			"<p>" + 'Your chosen card has been revealed and this card '+ message_forrew + "</p>" +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>"} ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, choice 2 feedback */


		,

		/* Instructions, screen 1 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			return "<div class='divmiddle'>" +
			"<p>Good job! You are now familiarized with what a great deal of trials will look like</p>" +
			"<p></p>" +
			"<p>Trials will be grouped in blocks. Each block is a group of trials.</p>" +
			"<p></p>" +
			"<p>Within each block, the blue deck will have its own probability of giving a rewarded card, and "+
			"the pink deck will have its own separate reward probability.</p>" +
			"<p>For instance, the blue deck could have a 50% probability of giving a rewarded card, and "+
			"the pink deck could have a 70% probability of giving a rewarded card.</p>" +
			"<p>Of course, in order to maximize your final payment, " +
			"it would make sense to choose the deck with the highest reward probability.</p>" +
			"<p>However, the only way to discover such deck is to repeatedly draw cards from both decks until you have some sense " +
			"of which one is more likely to give a rewarded card.</p>" +
			"<p>Bear in mind, though, that once a block is over, the reward probability associated to each deck will change, " +
			"so you will have to discover them again!</p>" +
			"<p></p>" +
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>"} ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, screen 1 */
				
		,

		/* Instructions, screen 4 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			return "<div class='divmiddle'>" +
			"<p>However, in some blocks you won't make all the choices yourself. This guy below is Robbie the robot.</p>" +
			'<p><img src="images/head_robbie_front.png" /></p>' +
			"<p>At the start of some blocks, you will see Robbie choosing for a few trials. " + 
			"Robbie chooses randomly, so he is equally likely to draw a card from the blue and from the pink decks." + 
			" Moreover, he does not learn with practice. " +
			" He will never care about which deck is more likely to give a rewarded card. His choices will always be random. </p>" +
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>" } ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, screen 4 */
			
		,
			
			
		/* Instructions, Robbie's choice 1 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() {

			if (instr_deckpos==0){	/* color for left deck is blue */
				var card_left = "card_back_blue";
				var card_right = "card_back_pink";		
			} else { /* color for arm left deck is pink */
				var card_left = "card_back_pink";
				var card_right = "card_back_blue";	
			}

			return "<div class='divtop'>"+
			'<p>When observing Robbie, you will have to press the space bar to reveal his choice. Let\'s give it a try!</p>' +
			'<p>Here you see Robbie from behind. Press the <strong>space bar</strong> to see Robbie\'s chosen card.</p>' +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>"+
			"<div class='divobservee'>" + 
			'<p><img src="images/head_robbie_back.png" /></p>' +
			"</div>"},
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, Robbie's choice 1 */ 
			
		,
				
		/* Instructions, Robbie's choice 1 feedback */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() {

			if (instr_robbieordhitmiss==0){ /* in this first Robbie example, chosen card will be rewarded */
				var card_revealed = "card_hit";
				var message_forrew = "was rewarded";	
			} else { /* in this first Robbie example, chosen card will NOT be rewarded */
				var card_revealed = "card_miss";	
				var message_forrew = "was not rewarded";
			}	


			if (instr_robbiecho1==0){	/* in this first Robbie example, chosen card is left */

				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = card_revealed;
					var card_right = "card_back_pink";		
				} else { /* color for arm left deck is pink */
					var card_left = card_revealed;
					var card_right = "card_back_blue";	
				}

			} else { /* in this first Robbie example, chosen card is right */
	
				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = "card_back_blue";
					var card_right = card_revealed;		
				} else { /* color for arm left deck is pink */
					var card_left = "card_back_pink";
					var card_right = card_revealed;	
				}
	
			}

			return "<div class='divtop'>"+
			'<p> Robbie\'s choice was ' + message_forrew + '</p>' +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>"+
			"<div class='divobservee'>" + 
			'<p><img src="images/head_robbie_back.png" /></p>' +
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>"},
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, Robbie's choice 1 feedback */ 	
		
		,
			
			
		/* Instructions, Robbie's choice 2 */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() {

			if (instr_deckpos==0){	/* color for left deck is blue */
				var card_left = "card_back_blue";
				var card_right = "card_back_pink";		
			} else { /* color for arm left deck is pink */
				var card_left = "card_back_pink";
				var card_right = "card_back_blue";	
			}

			return "<div class='divtop'>"+
			'<p>Let\'s give it another try!</p>' +
			'<p>Press the <strong>space bar</strong> to see Robbie\'s chosen card.</p>' +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>"+
			"<div class='divobservee'>" + 
			'<p><img src="images/head_robbie_back.png" /></p>' +
			"</div>"},
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, Robbie's choice 2 */ 
			
		,
				
		/* Instructions, Robbie's choice 2 feedback */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() {

			if (instr_robbieordhitmiss==0){ /* in this second Robbie example, chosen card will NOT be rewarded */
				var card_revealed = "card_miss";	
				var message_forrew = "was not rewarded";
			} else { /* in this first Robbie example, chosen card will be rewarded */
				var card_revealed = "card_hit";
				var message_forrew = "was rewarded";	
			}	


			if (instr_robbiecho2==0){	/* in this second Robbie example, chosen card is left */

				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = card_revealed;
					var card_right = "card_back_pink";		
				} else { /* color for arm left deck is pink */
					var card_left = card_revealed;
					var card_right = "card_back_blue";	
				}

			} else { /* in this second Robbie example, chosen card is right */
	
				if (instr_deckpos==0){	/* color for left deck is blue */
					var card_left = "card_back_blue";
					var card_right = card_revealed;		
				} else { /* color for arm left deck is pink */
					var card_left = "card_back_pink";
					var card_right = card_revealed;	
				}
	
			}

			return "<div class='divtop'>"+
			'<p> Robbie\'s choice was ' + message_forrew + '</p>' +
			"</div>" +	
			"<div class='divmiddle'>"+
			"<div class='cardleft'>"+
			'<img src="images/' + card_left + '.png" />' +
			"<p> </p></div>" + //create extra space (where prompt would be) to make cards be in same position as in choice phase
			"<div class='cardright'>"+
			'<img src="images/' + card_right + '.png" />' +
			"<p> </p></div>" + //idem
			"</div>"+
			"<div class='divobservee'>" + 
			'<p><img src="images/head_robbie_back.png" /></p>' +
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +  
			"</div>"},
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, Robbie's choice 2 feedback */ 
		
		,
							
		/* Instructions, screen XXX */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() { 

			return "<div class='divmiddle'>" +
			"<p>Good job! You now know what to do in observation trials</p>" +
			"<p></p>" +
			"<p>Some blocks will be OBSERVATION + ACTION BLOCKS. They will be arranged in 10 observation trials, "+
			"and then 10 action trials: in observation trials you will observe Robbie choosing," +
			" and in action trials you will choose yourself</p>" +
			"<p></p>" +
			"<p>Some other blocks will be ONLY ACTION BLOCKS. You will simply choose yourself for 20 trials.</p>"+
			"<p></p>" +
			"<p>Both observation and action trials are important! Your final payment will depend on both, and "+
			"observation trials will allow you to familiarize yourself with "+
			"the reward probabilities of each deck so later on you can choose better in action trials. So pay attention to both!</p>" +
			"</div>" +
			"<div class='divbottom'>" + 
			text_instr_presstocontinue +
			"</div>"} ,
			choices: ['Space'],
			minimum_RT: minRT_long,
			post_trial_gap: 500
		} /* end of Instructions, screen XXX */
				

		,
		
		
		/* Instructions, conf scale 1 */ 
		{type: 'cont-scale',
		mapping: function(){ 
			if (instr_deckpos==0){	/* color for left deck is blue */
				return 0
			} else { /* color for arm left deck is pink */
				return 1 }} , 
				prompt: function() { 

					return "<div class='divtopmid'>" +
					"<p>Just a couple more things left to  explain!</p>" +
					"<p></p>" +
					"<p>At the end of some trials, a line will appear, like the one you see below. "+
					"You will have to use this line as a scale to rate how confident you are that, within that block, one of the two decks " +
					"is more likely than the other to give a rewarded card. </p>" +
					"<p>Each half of the scale refers to one deck, which you can identify by its color. </p>" +
					"<p>If you place the cursor of your mouse on the line, you will see a number appears,  " +
					"and the number changes as you move your cursor. Feel free to try it now, and click anywhere within the scale to continue. "+
					"</div>"} ,
					response_ends_trial: true,
					post_trial_gap: 500
				} /* end of Instructions, conf scale 1 */
																													
				,
					
				/* Instructions, conf scale 2 */ 
				{type: 'cont-scale',
				mapping: function(){ 
					if (instr_deckpos==0){	/* color for left deck is blue */
						return 0
					} else { /* color for arm left deck is pink */
						return 1 }} , 
						prompt: function() { 

							return "<div class='divtopmid'>" +
							"For both halves of the line, this number goes from 50 at the center to 100 at the extreme. </p>" +
							"<p>When after a trial the line appears, you simply have to think, for that block, which deck has the highest "+
							" reward probability, and then use the scale to express to what extent you are confident of it.</p>" +
							"<p>For example, if you are 100% sure that, on that block, the pink deck is more likely to give rewarded cards than the blue deck, " +
							"go to the half of the scale of the pink deck, put your cursor over the point where 100 appears, "+
							"and click with your mouse. </p>" +
							"<p>If you are 68% sure the blue deck has a higher reward probability than the pink deck, " +
							"move your mouse within the half of the scale of the blue deck, place it where 68 appears, and click it. </p>" +
							"<p>If you have absolutely no idea of which deck is more likely to give a rewarded card on that block, " +
							"click on the center of the scale, where 50 appears. This 50 means that, if you were forced to choose "+
							"between both decks, you would choose at random (and so each deck would be equally likely (50%) to be chosen). </p>" +
							"</div>" +
							"<div class='divbottom'>" +
							"<p>Familiarize yourself with the scale and, when you are ready to continue, click anywhere within it to continue.</p>" +
							"</div>"} ,
							response_ends_trial: true,
							post_trial_gap: 500
						} /* end of Instructions, conf scale 2 */
						
						,
						
						/* Instructions, payoff screen */ 
						{type: "html-keyboard-response-minimumRT",
						stimulus: function() { 

							return "<div class='divmiddle'>" +
							"<p>As a final thing, we just how to explain what your final payment will depend on.</p>" +
							"<p></p>" +
							"<p>Just for completing this experiment, you will receive an initial sum of XXX.</p>"+
							"<p></p>" +
							"<p>But your payoff will also depend on your choices! As you know, trials are grouped in blocks. For each block, we will randomly pick one of its choices. "+
							"In ONLY ACTION BLOCKS, it will be one of the 20 choices you have made in its 20 trials. " +
							" In OBSERVATION + ACTION BLOCKS, it could be one of the choices you made, or one of the choices Robbie made. </p>" +
							"<p></p>" +
							"<p>If the picked choice for that block was rewarded, you will receive a bonus of XXX. Otherwise you will not receive any bonus.</p>"+
							"<p></p>" +
							"<p>Again, this means that it is in your best interest to draw as many rewarded cards as possible, " + 
							"as this will increase the probability of getting a bigger sum of money at the end of the experiment." +
							"</div>" +
							"<div class='divbottom'>" + 
							text_instr_presstocontinue +
							"</div>"} ,
							choices: ['Space'],
							minimum_RT: minRT_long,
							post_trial_gap: 500
						} /* end of Instructions, payoff screen */
								
					] /*end of timeline */

					,

					conditional_function: function(){
						if ( present_instructions == 1){
							return true;
						} else {
							return false;
						}
					}  
				} /*end of defining instructions */
				
				
				
				/* present recap of instructions to be presented at different parts of the instructions */ 
				var recap_screen = {
					type: "html-keyboard-response-minimumRT",
					stimulus: function() {
				
							return "<div class='divmiddle'>" +
							"<p>Okay! Let\'s quickly go through the basics of the experiment</p>" +
							"<p></p>" +
							"<p>- On each <strong>TRIAL</strong> of the experiment, a choice has to be made between drawing a card "+
							"from the <strong>BLUE DECK</strong> and drawing a card from the <strong>PINK DECK</strong>. "+
							"Your chosen card will be flipped over and you will see if you received a reward or not."+
							"<p></p>" +
							"<p>- Trials are grouped in <strong>BLOCKS</strong>, with 20 trials each. On each block, each deck has a different <strong>REWARD PROBABILITY</strong></p>" +
							"<p></p>" +
							"<p>- Some blocks are <strong>OBSERVATION + ACTION BLOCKS</strong>. The first 10 trials are  "+
							"<strong>OBSERVATION TRIALS</strong>. You will see Robbie making random " +
							"choices, and these trials are a good opportunity to learn about the reward probability of each deck. " +
							"The last 10 trials are <strong>ACTION TRIALS</strong>. You will choose between both decks yourself.</p>" +
							"<p></p>" +
							"<p>- Other blocks are <strong>ONLY ACTION BLOCKS</strong>. You will choose yourself on all 20 trials."+
							"<p></p>" +
							" <p>- Within a block, the reward probabilities do not change (not even from observation to action trials). "+
							"However, when a new block starts, the reward probability of each deck changes, so you will have to learn them from "+
							"the start.</p>" +
							"<p></p>" +
							" <p>- After some observation and action trials, you will be shown a scale, where you will have to indicate, "+
							" on that block, how sure you are that one deck is more likely to give a rewarded card than the other. "+
							"For each deck, your confidence can range from 50 (I have no idea whether that deck has a higher reward probability than the other) "+
							" to 100 (I am completely sure that deck has a higher reward probability than the other).</p>" +
							"<p></p>" +
							" <p>- Remember that your final payment depends both on the number of rewarded cards you draw and "+
							"on how accurate your ratings on the scale are.</p>" +
							text_instr_presstocontinue
					} ,
					choices: ['Space'],
					minimum_RT: minRT_long,
					post_trial_gap: 500		
				} /* end of recap_screen */
				
				
				/*Putting recap screen into a timeline so it can be presented at the end of instructions, and before practice */
				var tl_recap_screen_afterinstructions = {
					timeline: [recap_screen],
					conditional_function: function(){
						if ( present_instructions == 1){
							return true;
						} else {
							return false;
						}
					}   
				}
				
				/*Putting recap screen into a timeline so it can be presented at the end of practice block, and before main experiment part */
				var tl_recap_screen_afterpractice = {
					timeline: [recap_screen],
					conditional_function: function(){
						if ( present_practice == 1){
							return true;
						} else {
							return false;
						}
					}   
				}
				
				
				/* present recap of instructions to be presented at different parts of the instructions */ 
				var premain_screen = {
					type: "html-keyboard-response-minimumRT",
					stimulus: function() {
				
							return "<div class='divmiddle'>" +
							"<p>Time to start with the main part of the experiment!</p>" +
							"</div>" +
							"<div class='divbottom'>" +
							"<p>Press the <strong>space bar</strong> to start the first block.</p>" +
							"</div>"
					} ,
					choices: ['Space'],
					minimum_RT: minRT_500,
					post_trial_gap: 500		
				} /* end of recap_screen */