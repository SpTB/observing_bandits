/* DEFINE POSSIBLE SCREENS OF A TRIAL */ 

/* prepare variables for observation trial and show them on screen so we know what is going on */ 
var inittext_prac_obstrial = {
	type: "html-keyboard-response",
	stimulus: function() { 
			
		return "<div class='divmiddle'>" + 
		"<p>OBSERVATION PHASE</p>" + 
		"<p>" + 'participant id '+ subj_id + "</p>" +
		"<p>" + ' current phase '+ curphase_prac + "</p>" +
		"<p>" + 'current trial '+ curtri_prac + '       current index '+ curind_trial_prac + "</p>" +
		"<p>" + 'Indices of rated trials in this block are '+ rattri_obs_prac + "</p>" +
		"<p>" + ' scale mapping is '+ scalecols_prac + "</p>" +
		"<p>" + 'rewards arm A '+ rewarr_obs_armA_prac + "</p>" +
		"<p>" + 'rewards arm B '+ rewarr_obs_armB_prac + "</p>" +
		"<p>" + 'rewards arm left '+ rewarr_obs_armleft_prac + "</p>" +	
		"<p>" + 'rewards arm right '+ rewarr_obs_armright_prac + "</p>" +	
		"<p>" + 'All observee choices '+ choobservees_arr_prac + "</p>" +
		"<p>" + 'Observee chooses arm '+ choobservees_arr_prac[curind_trial_prac] + ' , and arm A is on '+ locarmAarr_prac + 
		' and is color '+ colarmAarr_prac + 'and reward is '+ rewchoobs_arr_prac[curind_trial_prac] + "</p>" +
		"</div>" +
		"<div class='divbottom'>" + 
		"<p>Press the <strong>space bar</strong> to start the block.</p>" + 
		"</div>"
	} ,
	choices: ['Space'],
	post_trial_gap: 0		
} /* end of inittext_prac_obstrial */
		
		
/*Putting parameter info screen into a timeline (so we can switch it on/off via parameter debug_mode) */
var tl_inittext_prac_obstrial = {
	timeline: [inittext_prac_obstrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
	conditional_function: function(){
		if (debug_mode == 1 && present_practice == 1){
			return true;
		} else {
			return false;
		}
	}   
}
		
			
			
			
/* defining observation trial */
var prac_obstrial = { 
		
	timeline: [
			
		/* Waiting until observee's choice is displayed */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() {
				
			var curobsname = namobservee_prac;
			var curobspic = picobservee_prac;				
			var curlocA = locarmAarr_prac; /* current location of arm A, 0 = left, 1 = right */
				
			if (colarmAarr_prac == 0){	/* color for arm A deck is blue */
				var card_armA = "card_back_blue";
				var card_armB = "card_back_pink";		
			} else { /* color for arm A deck is pink */
				var card_armA = "card_back_pink";
				var card_armB = "card_back_blue";	
			}
							
			if (curlocA == 0){ /* arm A appears on left */	
				var card_left = card_armA;
				var card_right = card_armB;		
			} else { /* arm A appears on right */
				var card_left = card_armB;
				var card_right = card_armA;	
			}
					
			return "<div class='divtop'>"+
			'<p>PRACTICE BLOCK, OBSERVATION TRIAL ' + curtri_prac + '</p>' +
			'<p>Press the <strong>space bar</strong> to see ' + curobsname + '\'s chosen card.</p>' +
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
			'<img src="images/' + curobspic + '.png" />' +
			"</div>"},
			choices: ['Space'],
			minimum_RT: minRT_200,
			post_trial_gap: 0,
			data: {
				block: function () { return curblock_prac },
				phase: function () { return curphase_prac },
				trial: function () { return curtri_prac },
				task_type: "observee_uncovered_prac"}
			},
			

			/* Displaying observee's choice */ 
			{type: "html-keyboard-response-minimumRT",
			stimulus: function() { 
				var curobsname = namobservee_prac;
				var curobspic = picobservee_prac;	
				var obschoice = choobservees_arr_prac[curind_trial_prac]; /*jsPsych.data.get().last(2).values()[0].obscho; /* choobservees_arr[curind_trial_prac]; */ 
				var rewchoice = rewchoobs_arr_prac[curind_trial_prac];
				var curlocA = locarmAarr_prac; /* current location of arm A, 0 = left, 1 = right */
					
				if (curlocA == 0){ /* location of arm A is left */	
					if ( obschoice == 0) { /* choice is arm A */
						var locchoice = 0; /* choice is left */
					} else { /* choice is arm B */
						var locchoice = 1; /* choice is right */
					}						
				} else { /* location of arm A is right */	
					if ( obschoice == 0) { /* choice is arm A */
						var locchoice = 1; /* choice is right */
					} else { /* choice is arm B */
						var locchoice = 0; /* choice is left */
					}						
				}
					
				if (colarmAarr_prac == 0){	/* color for arm A deck is blue */
					var card_armA = "card_back_blue";
					var card_armB = "card_back_pink";		
				} else { /* color for arm A deck is pink */
					var card_armA = "card_back_pink";
					var card_armB = "card_back_blue";	
				}
														
							
				if (curlocA == 0){ /* arm A appears on left */	
											
					if(locchoice == 0){ /*choice is left arm */
						var card_right = card_armB;	/* card right will be that corresponding to deck of arm B facing down */
							
						if(rewchoice == 1){ /*rewarded choice */
							var card_left = "card_hit";
						} else { /* non-rewarded choice */
							var card_left = "card_miss";
						}			
																
					} else { /*choice is right arm */
						var card_left = card_armA;	/* card left will be that corresponding to deck of arm A facing down */
							
						if(rewchoice == 1){ /*rewarded choice */
							var card_right = "card_hit";
						} else { /* non-rewarded choice */
							var card_right = "card_miss";
						}
					}	
									
				} else { /* arm A appears on right */

					if(locchoice == 0){ /*choice is left arm */
						var card_right = card_armA;	/* card right will be that corresponding to deck of arm A facing down */
							
						if(rewchoice == 1){ /*rewarded choice */
							var card_left = "card_hit";
						} else { /* non-rewarded choice */
							var card_left = "card_miss";
						}			
																
					} else { /*choice is right arm */
						var card_left = card_armB;	/* card left will be that corresponding to deck of arm B facing down */
							
						if(rewchoice == 1){ /*rewarded choice */
							var card_right = "card_hit";
						} else { /* non-rewarded choice */
							var card_right = "card_miss";
						}
					}	
				}
						
				if(rewchoice == 1){ /*rewarded choice */
					text_obschorew = 'rewarded';
				}else{ /*non-rewarded choice */
					text_obschorew = 'not rewarded';
				}
							

				return "<div class='divtop'>"+
				'<p>' + curobsname + '\'s choice was ' + text_obschorew + '</p>' +
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
				'<img src="images/' + curobspic + '.png" />' +
				"</div>" +
				"<div class='divbottom'>" + 
				'<p>Press the <strong>space bar</strong> to observe ' + curobsname + ' drawing another card.</p>' + 
				/*'<p>Press <strong>M</strong> to stop observing ' + curobsname + ' and start choosing yourself.</p>' + */
				"</div>" 
								
			},

			choices: ['Space'],
			minimum_RT: minRT_200,
			post_trial_gap: 0,
			data: {
				block: function () { return curblock_prac },
				phase: function () { return curphase_prac },
				trial: function () { return curtri_prac },
				task_type: "observee_feedback_prac",
						
						
						
				choice_arm: function () { /* if condition is only action, save observer's chosen arm, either A (0) or B (0) */
 
					if ( condtype_arr_prac == 1 ) { /* condition is only action */

						var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
						var curlocA = locarmAarr_prac;
		
						if(key_pressed == 83){ /* response is left */

							if(curlocA == 0) { /* arm A was on the left */
								return 0
							} else { /* arm A was on the right */
								return 1
							}	
						} else { /* response is right */
							if(curlocA == 0) { /* arm A was on the left */
								return 1
							} else { /* arm A was on the right */
								return 0
							}	
						}
							
					} else { /* condition is obs + action, so we will use predetermined observee choice (that will overwrite this value) and do not need anything here */
						return 9999 /* write any value so function can return it, but it will later be overwritten by corresponding value of choobservees_arr */
					}
				} , /* end of function choice_arm */
						
						
				choice_location: function () { /* save observer's location of chosen arm, either left (0) or right (1) */

					if (choobservees_arr_prac[curind_trial_prac] == 0){ /* observee chose arm A */
								
						if (locarmAarr_prac == 0){ /* arm A is on left side */
							return 0 /* choice is left */
						} else { /* arm A is on right side */
							return 1} /* choice is right */
								
						} else { /* observee chose arm B */
								
							if (locarmAarr_prac == 0){ /* arm A is on left side */
								return 1 /* choice is right */
							} else { /* arm A is on right side */
								return 0} /* choice is left */							
							}		
						} , /* end of function choice_location */

						choice_rewarded: function () { /* save whether observee's choice was rewarded (1) or not (0) */
			
							if (choobservees_arr_prac[curind_trial_prac] == 0){ /* observee chose arm A */
									
								if ( rewarr_obs_armA_prac[curind_trial_prac] == 1){ /* arm A was rewarded */
									return 1
								} else { /* arm A was not rewarded */
									return 0
								}
										
							} else { /* observee chose arm B */
									
								if ( rewarr_obs_armB_prac[curind_trial_prac] == 1){ /* arm B was rewarded */
									return 1
								} else { /* arm B was not rewarded */
									return 0
								}
							}
						} /* end of function choice_rewarded */			
						
					} /* end of adding data */
			
				} /* end of displaying observee's choice */
			
			], /* end of timeline */
			conditional_function: function(){
				if (present_practice == 1){
					return true;
				} else {
					return false;
				}
			}   		
		} /* end of prac_obstrial */
		
			
		/*Putting prac_obstrial into a timeline (so we can present it only when condition is obs + ac, and skip it when it is onlyac) */
		var tl_prac_obstrial = {
			timeline: [prac_obstrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
			conditional_function: function(){
				if (curphase_prac == "mixed_observation"){
					return true;
				} else {
					return false;
				}
			}   
		}
			
			
		/* Rating observee's confidence */
		var rating_observee_prac = {
			type: 'cont-scale',
			mapping: function(){ return scalecols_prac}, /* if 0, left half of scale is blue; if 1, left half is pink */
			prompt: function(){ 
				var curobsname = namobservee_prac;
					
				return "<div class='divtop'>" +
				'<p>How confident do you think ' + curobsname + ' is that, on the current block, one deck is more likely to give a rewarded card than the other?</p>' +
				"</div>" },
				response_ends_trial: true,
				post_trial_gap: 100, /* adding 100 ms to mimmick time if no rating is given XXX */			
				data: {
					block: function () { return curblock_prac },
					phase: function () { return curphase_prac },
					trial: function () { return curtri_prac },
					task_type: "rating_observee_prac"}
				}

				/*Putting rating defined before into a timeline (necesssary to be able to skip rating sometimes) */
				var tl_rating_observee_prac = {
					timeline: [rating_observee_prac], /* in this timeline we should add any other rating we need, should we need two XXX*/
					conditional_function: function(){
						if (present_rating_observee == 1 && rattri_obs_prac[curind_trial_prac] == 1 && present_practice == 1){
							return true;
						} else {
							return false;
						}
					}   
				}
				
				
				
				/* Rating observer's confidence */
				var rating_observer_prac = {
					type: 'cont-scale',
					mapping: function(){ return scalecols_prac}, /* if 0, left half of scale is blue; if 1, left half is pink */
					prompt: function(){ 
						return "<div class='divtop'>" +
						'<p>How confident are YOU that, on the current block, one deck is more likely to give a rewarded card than the other?</p>' +
						"</div>" },
						response_ends_trial: true,
						post_trial_gap: 100, /* adding 100 ms to mimmick time if no rating is given XXX */			
						data: {
							block: function () { return curblock_prac },
							phase: function () { return curphase_prac },
							trial: function () { return curtri_prac },
							task_type: "rating_observer_prac"}
						}


						/*For observation phase, putting rating defined before into a timeline (necesssary to be able to skip rating sometimes) */
						var tl_rating_observer_obs_prac = {
							timeline: [rating_observer_prac], /* in this timeline we should add any other rating we need, should we need two XXX*/
							conditional_function: function(){
								if (present_rating_observer == 1 && rattri_obs_prac[curind_trial_prac] == 1 && present_practice == 1){
									return true;
								} else {
									return false;
								}
							}   
						}
					
						/*For action phase, putting rating defined before into a timeline (necesssary to be able to skip rating sometimes) */
						var tl_rating_observer_ac_prac = {
							timeline: [rating_observer_prac], /* in this timeline we should add any other rating we need, should we need two XXX*/
							conditional_function: function(){
								if (present_rating_observer == 1 && rattri_ac_prac[curind_trial_prac] == 1 && present_practice == 1){
									return true;
								} else {
									return false;
								}
							}   
						}


						/* Updating relevant variables */ 
						var update_prac_obstrial = {
							type: "html-keyboard-response",
							stimulus:"<p> </p>" ,
							response_ends_trial: false,
							trial_duration: 250,
							post_trial_gap: 0,
							conditional_function: function(){
								if (present_practice == 1){
									return true;
								} else {
									return false;
								}
							}   ,
							on_finish: function(data){
									
									
								if (curphase_prac == "mixed_observation"){
									choarm = choobservees_arr_prac[curind_trial_prac];
									choloc = jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "observee_feedback_prac"}).select('choice_location').values;
									chorew = jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "observee_feedback_prac"}).select('choice_rewarded').values;	
								} else {
									choarm = jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "choice_feedback_prac"}).select('choice_arm').values /* chosen arm, 0 = arm A, 1 = arm B */
									choloc = jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "choice_feedback_prac"}).select('choice_location').values;
									chorew = jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "choice_feedback_prac"}).select('choice_rewarded').values;	
								}
			
								/* adding info to all parts of this trial */
								jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac }).addToAll({
									practice: 1,
									observee_name: namobservee_prac, /* observee's name */
									observee_pic: picobservee_prac, /* observee's picture */
									observee_behav: "random", /* observee's choice behavior */
									observee_timewin: "unique", /* observee's time window */
									prob_armA: prob_armA_prac, /* reward probability of arm A */ /*XXX change when having different probabilities */
									prob_armB: prob_armB_prac, /* reward probability of arm B */ /*XXX change when having different probabilities */
									rew_armA: rewarr_obs_armA_prac[curind_trial_prac], /* reward given by arm A? , 0 = no, 1 = yes */
									rew_armB: rewarr_obs_armB_prac[curind_trial_prac], /* reward given by arm B? , 0 = no, 1 = yes */
									loc_armA: locarmAarr_prac, /* current location of arm A, 0 = left, 1 = right */						
									colarmA: colarmAarr_prac, /* which color deck arm A is be associated to. 0 = blue, 1 = pink. */
									ratscalemapping: locarmAarr_prac, /* mapping for rating scales. 0 = arm A left side, arm B right side, 1 = arm B left side, arm A right side. */
									rew_armleft: rewarr_obs_armleft_prac[curind_trial_prac], /* reward given by left arm? , 0 = no, 1 = yes */
									rew_armright: rewarr_obs_armright_prac[curind_trial_prac], /* reward given by right arm? , 0 = no, 1 = yes */
									rattri: rattri_obs_prac[curind_trial_prac], /* is this a trial with rating? , 0 = no, 1 = yes*/
									choice_arm: choarm, /* observee's choice. 0 = arm A, 1 = arm B */ /* XXX WARNING: saved even in onlyac blocks. So we generate behavior for those too, even if not used. Ok as long as only random observee exists, change for other experiments*/
									choice_location: choloc, /* observee's chosen location, 0 = left, 1 = right */
									choice_rewarded: chorew, /* was observee's choice rewarded?, 0 = no, 1 = yes */
									resp_ratobservee: convratresp(
										jsPsych.data.get().last(3).filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "rating_observee_prac"}).select('rating_response').values
										, rattri_obs_prac[curind_trial_prac]),
										resp_ratobserver: convratresp(
											jsPsych.data.get().last(2).filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "rating_observer_prac"}).select('rating_response').values, rattri_obs_prac[curind_trial_prac])
											/* jjsPsych.data.getLastTimelineData().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "rating_observee_prac"}).select('button_pressed').values, */	
										});
			
										/* update trial number and index */
										curtri_prac = curtri_prac + 1;
										curind_trial_prac = curind_trial_prac + 1;
		
										if(curtri_prac > numtrials_obs){
											curtri_prac = 1;
											curind_trial_prac = 0;
												
											curphase_prac = "mixed_action";/* change phase to late phase of this block's condition*/
										}
									}
								} /* end update_prac_obstrial */
		
		
								/*Putting update_prac_obstrial into a timeline so it can be presented if practice is presented, and otherwise skipped */
								var tl_update_prac_obstrial = {
									timeline: [update_prac_obstrial],
									conditional_function: function(){
										if ( present_practice == 1){
											return true;
										} else {
											return false;
										}
									}   
								}
										
										
								/* prepare variables for action trial and show them on screen so we know what is going on */ 
								var inittext_prac_actrial = {
									type: "html-keyboard-response",
									stimulus: function() { 
			
										var curlocA = locarmAarr_ac[curind_block][curind_trial_prac];
			
										return "<div class='divmiddle'>" + 
										"<p>ACTION PHASE</p>" + 										
										"<p>" + 'participant id '+ subj_id + "</p>" +
										"<p>" + ' current phase '+ curphase_prac + "</p>" +
										"<p>" + 'current trial '+ curtri_prac + '       current index '+ curind_trial_prac + "</p>" +
										"<p>" + 'Indices of rated trials in this block are '+ rattri_ac_prac + "</p>" +
										"<p>" + ' scale mapping is '+ scalecols_prac + "</p>" +
										"<p>" + 'rewards arm A '+ rewarr_ac_armA_prac + "</p>" +
										"<p>" + 'rewards arm B '+ rewarr_ac_armB_prac + "</p>" +
										"<p>" + 'rewards arm left '+ rewarr_ac_armleft_prac + "</p>" +	
										"<p>" + 'rewards arm right '+ rewarr_ac_armright_prac + "</p>" +	
										"<p>" + ' arm A is on '+ locarmAarr_prac + 
										' and is color '+ colarmAarr_prac + "</p>" +
										"</div>" +
										"<div class='divbottom'>" + 
										"<p>Press the <strong>space bar</strong> to start the block.</p>" + 
										"</div>"
									} ,
									choices: ['Space'],
									post_trial_gap: 0,
									data: { /*save key variables in data so they are stored and can be retrieved later for conditional statements */
										rew_armA: function () { /* save whether arm A will give reward if chosen */
											ci = curind_trial_prac;
											return rewarr_ac_armA_prac[curind_trial_prac] /*ci */
										},  /* end of rew_armA function */ 
				
										rew_armB: function () { /* save whether arm A will give reward if chosen */
											ci = curind_trial_prac;
											return rewarr_ac_armB_prac[curind_trial_prac] /* ci */
										},  /* end of rew_armB function */ 
										loc_armA: function () { /* save location of arm A */
											ci = curind_trial_prac;
											return locarmAarr_ac[curind_block][curind_trial_prac] /* ci */
										}  /* end of loc_armA function */ 
									} /* end of data adding */ 		
								} /* end of inittext_prac_actrial */
		
		
								/*Putting parameter info screen into a timeline (so we can switch it on/off via parameter debug_mode) */
								var tl_inittext_prac_actrial = {
									timeline: [inittext_prac_actrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
									conditional_function: function(){
										if (debug_mode == 1 && present_practice == 1){
											return true;
										} else {
											return false;
										}
									}   
								}
		
								/* defining action trial */
								var prac_actrial = { 
		
									timeline: [
			
										/* Making choice */ 
										{type: "html-keyboard-response-minimumRT",
										stimulus: function() { 
			
											var curlocA = locarmAarr_prac;
												
								
											if (colarmAarr_prac == 0){	/* color for arm A deck is blue */
												var card_armA = "card_back_blue";
												var card_armB = "card_back_pink";		
											} else { /* color for arm A deck is pink */
												var card_armA = "card_back_pink";
												var card_armB = "card_back_blue";	
											}
							
											if (curlocA == 0){ /* arm A appears on left */	
												var card_left = card_armA;
												var card_right = card_armB;		
											} else { /* arm A appears on right */
												var card_left = card_armB;
												var card_right = card_armA;	
											}
												
											if (curphase_prac == "onlyac_late"){ /* late phase of only action block, so trial number continues from earlier phase on this block, so 11 to 20 */  
												var texttritoshow = numtrials_obs + curtri_prac;
											} else { /* trial counter appearing with respect to that phase, so 1 to 10 */
												var texttritoshow = curtri_prac;
											}	
				
											return "<div class='divtop'>" +
											'<p>PRACTICE BLOCK, ACTION TRIAL ' + texttritoshow + '</p>' +
											"<p>Draw a card from one of the decks</p>" +
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
											minimum_RT: minRT_200,
											post_trial_gap: 500,
											data: {
												block: function () { return curblock_prac },
												phase: function () { return curphase_prac },
												trial: function () { return curtri_prac },
												task_type: "choice_prac"}
											} /* end of making choice */
	
											,
			
											/* Giving feedback */ 
											{type: "html-keyboard-response-minimumRT",
											stimulus: function() { 
				
												var ci = curind_trial_prac;			
												var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
													
												
												if (curphase_prac == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
													var cur_rewleft = rewarr_ac_armleft_prac[curind_trial_prac]; /* current reward for left cardd */
													var cur_rewright = rewarr_ac_armright_prac[curind_trial_prac]; /*current reward for right card */
													var curlocA = locarmAarr_prac; /* current location of arm A */	
												} else { /* otherwise using values from ac array */
													var cur_rewleft = rewarr_ac_armleft_prac[curind_trial_prac]; 
													var cur_rewright = rewarr_ac_armright_prac[curind_trial_prac];
													var curlocA = locarmAarr_ac;	
												}
												

									
												if (colarmAarr_prac == 0){	/* color for arm A deck is blue */
													var card_armA = "card_back_blue";
													var card_armB = "card_back_pink";		
												} else { /* color for arm A deck is pink */
													var card_armA = "card_back_pink";
													var card_armB = "card_back_blue";	
												}
							
							
												if (curlocA == 0){ /* arm A appears on left */	
											
													if(key_pressed == 83){ /* choice is left arm */
														var card_right = card_armB;	/* card right will be that corresponding to deck of arm B facing down */
							
														if(cur_rewleft == 1){ /* left arm gives reward */
															var card_left = "card_hit";
															var text_obschorew = 'rewarded';
														} else { /* non-rewarded choice */
															var card_left = "card_miss";
															var text_obschorew = 'not rewarded';
														}			
																
													} else { /*choice is right arm */
														var card_left = card_armA;	/* card left will be that corresponding to deck of arm A facing down */
							
														if(cur_rewright == 1){ /* right arm gives reward */
															var card_right = "card_hit";
															var text_obschorew = 'rewarded';
														} else { /* non-rewarded choice */
															var card_right = "card_miss";
															var text_obschorew = 'not rewarded';
														}
													}	
									
												} else { /* arm A appears on right */

													if(key_pressed == 83){ /* choice is left arm */
														var card_right = card_armA;	/* card right will be that corresponding to deck of arm A facing down */
							
														if(cur_rewleft == 1){ /* left arm gives reward */
															var card_left = "card_hit";
															var text_obschorew = 'rewarded';
														} else { /* non-rewarded choice */
															var card_left = "card_miss";
															var text_obschorew = 'not rewarded';
														}			
																
													} else { /*choice is right arm */
														var card_left = card_armB;	/* card left will be that corresponding to deck of arm B facing down */
							
														if(cur_rewright == 1){ /* right arm gives reward */
															var card_right = "card_hit";
															var text_obschorew = 'rewarded';
														} else { /* non-rewarded choice */
															var card_right = "card_miss";
															var text_obschorew = 'not rewarded';
														}
													}	
												}
						
												return "<div class='divtop'>"+
												'<p>Your choice was ' + text_obschorew + '</p>' +
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
												"<p>Press the <strong>space bar</strong> to go the next trial.</p>" +  
												"</div>"
				
											}, /* end stimulus function */
											post_trial_gap: 0,
											choices: ['Space'],
											minimum_RT: minRT_200,
											data: { /*save key variables in data so they are stored and can be retrieved later for conditional statements */
												block: function () { return curblock_prac },
												phase: function () { return curphase_prac },
												trial: function () { return curtri_prac },
												task_type: "choice_feedback_prac",
				
												choice_location: function () { /* save observer's location of chosen arm, either left (0) or right (1) */
					
													var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
										
													if(key_pressed == 83){ /* response is left */
														return 0
													} else { /* response is right */
														return 1}
													} , /* end of function choice_location */
					
					
													choice_arm: function () { /* save observer's chosen arm, either A (0) or B (0) */
					
														var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
															
														if (curphase_prac == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
															var curlocA = locarmAarr_prac;	
														} else { /* otherwise using values from ac array */
															var curlocA = locarmAarr_prac;		
														}
										
														if(key_pressed == 83){ /* response is left */
							
															if(curlocA == 0) { /* arm A was on the left */
																return 0
															} else { /* arm A was on the right */
																return 1
															}	
														} else { /* response is right */
															if(curlocA == 0) { /* arm A was on the left */
																return 1
															} else { /* arm A was on the right */
																return 0
															}	
														}
													} , /* end of function choice_arm */
														
														
													choice_rewarded: function () { /* save whether observer's choice was rewarded (1) or not (0) */
					
														var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
																			
														if (curphase_prac == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
															var currewarmleft = rewarr_ac_armleft_prac[curind_trial_prac];
															var currewarmright = rewarr_ac_armright_prac[curind_trial_prac];
														} else { /* otherwise using values from ac array */
															var currewarmleft = rewarr_ac_armleft_prac[curind_trial_prac];
															var currewarmright = rewarr_ac_armright_prac[curind_trial_prac];		
														}
										
														if(key_pressed == 83){ /* response is left */
																
															if ( currewarmleft == 1){ /* left arm was rewarded */
																return 1
															} else { /* left arm was not rewarded */
																return 0
															}
																	
														} else { /* response is right */
																
															if ( currewarmright == 1){
																return 1
															} else {
																return 0
															}
														}
													} /* end of function choice_rewarded */
														
															
												} /* end of adding data */				
											} /* end of feedback */
		
										], /* end of timeline */
										conditional_function: function(){
											if (present_practice == 1){
												return true;
											} else {
												return false;
											}
										}
									} /* end of prac_actrial */
			
			
									/*Putting prac_actrial into a timeline (so we can present it also as early phase when cond is onlyac, and skip it when it is obs + ac) */
									var tl_onlyac_actrial_early_prac = {
										timeline: [prac_actrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
										conditional_function: function(){
											if (curphase_prac == "onlyac_early"){
												return true;
											} else {
												return false;
											}
										}   
									}
			
									/* Updating relevant variables */ 
									var update_prac_actrial = {
										type: "html-keyboard-response",
										stimulus: "<p> </p>",
										response_ends_trial: false,
										trial_duration: 250,
										post_trial_gap: 0,
										conditional_function: function(){
											if (present_practice == 1){
												return true;
											} else {
												return false;
											}
										}   ,
										on_finish: function(data){
											/* adding info to all parts of this trial */
											jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac }).addToAll({
												practice: 1,
												prob_armA: prob_armA_prac , /* reward probability of arm A */ /*XXX change when having different probabilities */
												prob_armB:  prob_armB_prac , /* reward probability of arm B */ /*XXX change when having different probabilities */
												rew_armA:  rewarr_ac_armA_prac[curind_trial_prac], /* reward given by arm A? , 0 = no, 1 = yes */
												rew_armB: rewarr_ac_armB_prac[curind_trial_prac], /* reward given by arm B? , 0 = no, 1 = yes */
												loc_armA: locarmAarr_prac, /* current location of arm A, 0 = left, 1 = right */
												colarmA: colarmAarr_prac, /* which color deck arm A is be associated to. 0 = blue, 1 = pink. */
												ratscalemapping: locarmAarr_prac, /* mapping for rating scales. 0 = arm A left side, arm B right side, 1 = arm B left side, arm A right side. */
												col_armA: colarmAarr_prac, /* current color of arm A, 0 = blue, 1 = pink */
												rew_armleft: rewarr_ac_armleft_prac[curind_trial_prac], /* reward given by left arm? , 0 = no, 1 = yes */
												rew_armright: rewarr_ac_armright_prac[curind_trial_prac], /* reward given by right arm? , 0 = no, 1 = yes */
												rattri: rattri_ac_prac[curind_trial_prac], /* is this a trial with rating? , 0 = no, 1 = yes*/
												choice_arm: jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "choice_feedback_prac"}).select('choice_arm').values, /* chosen arm, 0 = arm A, 1 = arm B */
												choice_location: jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "choice_feedback_prac"}).select('choice_location').values, /* chosen location, 0 = left, 1 = right */
												choice_rewarded: jsPsych.data.get().filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "choice_feedback_prac"}).select('choice_rewarded').values, /* was observer's choice rewarded?, 0 = no, 1 = yes */
												resp_ratobserver: convratresp(
													jsPsych.data.get().last(2).filter({block:curblock_prac, phase: curphase_prac, trial: curtri_prac, task_type: "rating_observer_prac"}).select('rating_response').values, rattri_ac_prac[curind_trial_prac])
												});
						
												/* update trial number and index, and block if necessary */
												curtri_prac = curtri_prac + 1;
												curind_trial_prac = curind_trial_prac + 1;
				
												if(curtri_prac > numtrials_ac){
													curblock_prac = curblock_prac + 1;
													curtri_prac = 1;
													curind_trial_prac = 0;
														
													curphase_prac = phasepool_early[condtype_arr_prac];/* change phase to early phase of next block's condition. Block index has been updated so we can use this index for next block */
												}
											} /* end on_finish function */
										}/* end update_prac_actrial */
										
										/*Putting update_prac_actrial into a timeline so it can be presented if practice is presented, and otherwise skipped */
										var tl_update_prac_actrial = {
											timeline: [update_prac_actrial],
											conditional_function: function(){
												if ( present_practice == 1){
													return true;
												} else {
													return false;
												}
											}   
										}
						
			
			
										/* present screen with feedback on reward for the block that just finished */ 
										var screen_rewardfeedback_prac = {
											type: "html-keyboard-response-minimumRT",
											stimulus: function() { 
													
												if (condtype_arr_prac == 0) { /* this was an obs + ac block. Using curindblock - 1 because block index has already been updated for next block */
													numrewtri = jsPsych.data.get().filter({block:curblock_prac-1, phase: 'mixed_action', task_type: 'choice_feedback_prac', choice_rewarded: 1}).count() ;
														
												} else { /* this was an only ac block */
														
													numrewtri_early = jsPsych.data.get().filter({block:curblock_prac-1, phase: 'onlyac_early', task_type: 'choice_feedback_prac', choice_rewarded: 1}).count() ; 
													numrewtri_late = jsPsych.data.get().filter({block:curblock_prac-1, phase: 'onlyac_late', task_type: 'choice_feedback_prac', choice_rewarded: 1}).count() ; 
													numrewtri = numrewtri_early + numrewtri_late;/* WARNING: Here we take into account all 20 trials of onlyac block. Change if only wanting to give feedback on 2nd half of block */
														
												}
													
													
			
												return "<div class='divmiddle'>" + 
												'<p>On this block, you drew <strong>' + numrewtri + ' REWARDED CARDS</strong> </p>' +
												'<p></p>' +
												'<p>Hopefully you are now familiarized with the structure of a block. You will now be able to read again a brief reminder of the instructions, and then you will start the experiment. </p>' +
												"</div>" +
												"<div class='divbottom'>" + 
												"<p>Press the <strong>space bar</strong> to read the instruction's recap.</p>" + 
												"</div>"
											} ,
											choices: ['Space'],
											minimum_RT: minRT_500,
											conditional_function: function(){
												if (present_practice == 1){
													return true;
												} else {
													return false;
												}
											}   ,
											post_trial_gap: 0		
										} /* end of screen_rewardfeedback */
										
										
										
										/*Putting reward screen into a timeline so it can be presented if practice is presented, and otherwise skipped */
										var tl_screen_rewardfeedback_prac = {
											timeline: [screen_rewardfeedback_prac],
											conditional_function: function(){
												if ( present_practice == 1){
													return true;
												} else {
													return false;
												}
											}   
										}
										
										
										/* present screen with initial instructions of practice block */ 
										var screen_prac_instructions = {
											type: "html-keyboard-response-minimumRT",
											stimulus: function() { 
													
												return "<div class='divmiddle'>" + 
												"<p> In order for you to completely understand the experiment's procedure, let's do a practice block. </p>" +
												'<p></p>' +
												"<p> This will be an OBSERVATION + ACTION BLOCK, so you can practice both with observation and action trials. " +
												" Remember that on the first 10 trials you will observe Robbie choosing between both decks. Then, on the next 10 trials it will " +
												"be your turn to choose. The reward probability for each deck does not change between the observation and action trials. </p>" +
												"</div>" +
												"<div class='divbottom'>" + 
												"<p>Press the <strong>space bar</strong> to start with the observation trials.</p>" + 
												"</div>"
											} ,
											choices: ['Space'],
											minimum_RT: minRT_long,
											post_trial_gap: 0		
										} /* end of screen_prac_instructions */
										
										/*Putting screen with initial instructions of practice block into a timeline so it can be presented if practice is presented, and otherwise skipped */
										var tl_screen_prac_instructions = {
											timeline: [screen_prac_instructions],
											conditional_function: function(){
												if ( present_practice == 1){
													return true;
												} else {
													return false;
												}
											}   
										}
										
										
										/* present screen announcing transition from observation to action trials */ 
										var screen_prac_transition = {
											type: "html-keyboard-response-minimumRT",
											stimulus: function() { 
													
												return "<div class='divmiddle'>" + 
												"<p>Good! You've finished this block's observation trials. Now it's your turn to choose. </p>" +
												'<p></p>' +
												"</div>" +
												"<div class='divbottom'>" + 
												"<p>Press the <strong>space bar</strong> to start with the action trials.</p>" + 
												"</div>"
											} ,
											choices: ['Space'],
											minimum_RT: minRT_500,
											post_trial_gap: 0		
										} /* end of screen_prac_transition */
										
										/*Putting screen with initial instructions of practice block into a timeline so it can be presented if practice is presented, and otherwise skipped */
										var tl_screen_prac_transition = {
											timeline: [screen_prac_transition],
											conditional_function: function(){
												if ( present_practice == 1){
													return true;
												} else {
													return false;
												}
											}   
										}
										