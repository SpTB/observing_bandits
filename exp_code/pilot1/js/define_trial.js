/* DEFINE POSSIBLE SCREENS OF A TRIAL */ 

/* prepare variables for observation trial and show them on screen so we know what is going on */ 
var inittext_obstrial = {
	type: "html-keyboard-response",
	stimulus: function() { 
					
		return "<div class='divmiddle'>" + 
		"<p>OBSERVATION PHASE</p>" + 
		/*"<p>" + 'original arrays are, for names '+ namobservees_ext + '     for pics ' + picobservees_ext + '    for beh ' + behobservees_ext + '     for time window ' + timewinobservees_ext + "</p>" +
		"<p>" + 'shuf arrays are, for names '+ namobservees_arr + '     for pics ' + picobservees_arr + '    for beh ' + behobservees_arr + '     for time window ' + timewinobservees_arr + "</p>" +
		"<p>" + 'behavior pool '+ behaviorpool + '     shuffled beh pool ' + behobservees + "</p>" + */
		"<p>" + 'participant id '+ subj_id + "</p>" +
		"<p>" + 'current block '+ curblock + '       current index '+ curind_block + "</p>" +
		"<p>" + 'array conds ' + condtype_arr + 'current condition '+ condtype_arr[curind_block] + ' current phase '+ curphase + "</p>" +
		"<p>" + 'current trial '+ curtri + '       current index '+ curind_trial + "</p>" +
		"<p>" + 'probs arm B across blocks '+ prob_armB_pool_ext + 'shuf arrays are, for names '+ behobservees_arr.length + "</p>" +
		"<p>" + 'Obs trials after which rating will appear in all exp '+ heyhey_obs + ' , in this block '+ heyhey_obs[curind_block]  + "</p>" +
		"<p>" + 'Indices of rated trials in this block are '+ rattri_obs[curind_block] + "</p>" +
		"<p>" + 'location arm A '+ locarmAarr_obs[curind_block] + "</p>" +
		"<p>" + 'color arm A array is '+ colarmAarr + ' scale mapping is '+ armMapping + "</p>" +
		"<p>" + 'rewards arm A '+ rewarr_obs_armA[curind_block] + "</p>" +
		"<p>" + 'rewards arm B '+ rewarr_obs_armB[curind_block] + "</p>" +
		"<p>" + 'rewards arm left '+ rewarr_obs_armleft[curind_block] + "</p>" +	
		"<p>" + 'rewards arm right '+ rewarr_obs_armright[curind_block] + "</p>" +	
		"<p>" + 'All observee choices '+ choobservees_arr[curind_block] + "</p>" +
		"<p>" + 'Observee chooses arm '+ choobservees_arr[curind_block][curind_trial] + ' , and arm A is on '+ locarmAarr_obs[curind_block][curind_trial] + 
		' and is color '+ colarmAarr[curind_block] + 'and reward is '+ rewchoobs_arr[curind_block][curind_trial] + "</p>" +
		"<p>" + 'Trials rated '+ rattri_obs[curind_block] + "</p>" +
		"</div>" +
		"<div class='divbottom'>" + 
		"<p>Press the <strong>space bar</strong> to start the block.</p>" + 
		"</div>"
	} ,
	choices: ['Space'],
	post_trial_gap: 0		
} /* end of inittext_obstrial */
		
		
/*Putting parameter info screen into a timeline (so we can switch it on/off via parameter debug_mode) */
var tl_inittext_obstrial = {
	timeline: [inittext_obstrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
	conditional_function: function(){
		if (debug_mode == 1){
			return true;
		} else {
			return false;
		}
	}   
}
		
			
			
/* present initial screen so participant is aware of block and phase */ 
var initscreen_obsphase = {
	type: "html-keyboard-response-minimumRT",
	stimulus: function() {
				
		if (curphase=="mixed_observation"){
			text_condname = ' an <strong>OBSERVATION + ACTION BLOCK</strong>, so you will observe for 10 trials and then choose for 10 trials';
			text_phaseinfo = 'First you will start with the <strong>OBSERVATION PHASE</strong>';
		} else {
			text_condname = ' an <strong>ONLY ACTION BLOCK</strong>, so you will choose for 20 trials';
			text_phaseinfo = '';
		}
			
		return "<div class='divmiddle'>" + 
		'<p><strong>BLOCK ' + curblock + '</strong> </p>' +
		"<p></p>" +
		'<p>This is' + text_condname +'</p>' +
		"<p></p>" +
		'<p>' + text_phaseinfo + '</p>' +
		"</div>" +
		"<div class='divbottom'>" + 
		"<p>Press the <strong>space bar</strong> to start.</p>" + 
		"</div>"
	} ,
	choices: ['Space'],
	minimum_RT: minRT_500,
	post_trial_gap: 0		
} /* end of initscreen_obsphase */
			
/*Putting initial screen into a timeline (so we can present it only on first trial of phase) */
var tl_initscreen_obsphase = {
	timeline: [initscreen_obsphase], /* in this timeline we should add any other rating we need, should we need two XXX*/
	conditional_function: function(){
		if (curtri == 1){
			return true;
		} else {
			return false;
		}
	}   
}
			
			
/* defining observation trial */
var obstrial = { 
		
	timeline: [
			
		/* Waiting until observee's choice is displayed */ 
		{type: "html-keyboard-response-minimumRT",
		stimulus: function() {
				
			var curobsname = namobservees_arr[curind_block];
			var curobspic = picobservees_arr[curind_block];				
			var curlocA = locarmAarr_obs[curind_block][curind_trial]; /* current location of arm A, 0 = left, 1 = right */
				
			if (colarmAarr[curind_block] == 0){	/* color for arm A deck is blue */
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
			'<p>BLOCK ' + curblock + ' , OBSERVATION TRIAL ' + curtri + '</p>' +
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
				block: function () { return curblock },
				condition: function () { return condtype_arr[curind_block]},
				phase: function () { return curphase },
				trial: function () { return curtri },
				task_type: "observee_covered"}
			},
			

			/* Displaying observee's choice */ 
			{type: "html-keyboard-response-minimumRT",
			stimulus: function() { 
				var curobsname = namobservees_arr[curind_block];
				var curobspic = picobservees_arr[curind_block];	
				var obschoice = choobservees_arr[curind_block][curind_trial]; /*jsPsych.data.get().last(2).values()[0].obscho; /* choobservees_arr[curind_trial]; */ 
				var rewchoice = rewchoobs_arr[curind_block][curind_trial];
				var curlocA = locarmAarr_obs[curind_block][curind_trial]; /* current location of arm A, 0 = left, 1 = right */
					
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
					
				if (colarmAarr[curind_block] == 0){	/* color for arm A deck is blue */
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
				block: function () { return curblock },
				condition: function () { return condtype_arr[curind_block]},
				phase: function () { return curphase },
				trial: function () { return curtri },
				task_type: "observee_feedback",
						
						
						
				choice_arm: function () { /* if condition is only action, save observer's chosen arm, either A (0) or B (0) */
 
					if ( condtype_arr[curind_block] == 1 ) { /* condition is only action */

						var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
						var curlocA = locarmAarr_obs[curind_block][curind_trial]; /* using locarmAarr_obs because we use location of first half of block*/
		
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
						
						
				choice_location: function () { /* save observee's / observer's location of chosen arm, either left (0) or right (1) */

					if (choobservees_arr[curind_block][curind_trial] == 0){ /* observee chose arm A */
								
						if (locarmAarr_obs[curind_block][curind_trial] == 0){ /* arm A is on left side */
							return 0 /* choice is left */
						} else { /* arm A is on right side */
							return 1} /* choice is right */
								
						} else { /* observee chose arm B */
								
							if (locarmAarr_obs[curind_block][curind_trial] == 0){ /* arm A is on left side */
								return 1 /* choice is right */
							} else { /* arm A is on right side */
								return 0} /* choice is left */							
							}		
						} , /* end of function choice_location */

						choice_rewarded: function () { /* save whether observee's choice was rewarded (1) or not (0) */
			
							if (choobservees_arr[curind_block][curind_trial] == 0){ /* observee chose arm A */
									
								if ( rewarr_obs_armA[curind_block][curind_trial] == 1){ /* arm A was rewarded */
									return 1
								} else { /* arm A was not rewarded */
									return 0
								}
										
							} else { /* observee chose arm B */
									
								if ( rewarr_obs_armB[curind_block][curind_trial] == 1){ /* arm B was rewarded */
									return 1
								} else { /* arm B was not rewarded */
									return 0
								}
							}
						} /* end of function choice_rewarded */			
						
					} /* end of adding data */
			
				} /* end of displaying observee's choice */
			
			] /* end of timeline */		
		} /* end of obstrial */
		
			
		/*Putting obstrial into a timeline (so we can present it only when condition is obs + ac, and skip it when it is onlyac) */
		var tl_obstrial = {
			timeline: [obstrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
			conditional_function: function(){
				if (curphase == "mixed_observation"){
					return true;
				} else {
					return false;
				}
			}   
		}
			
			
		/* Rating observee's confidence */
		var rating_observee = {
			type: 'cont-scale',
			mapping: function(){ return scalecols[curind_block]}, /* if 0, left half of scale is blue; if 1, left half is pink */
			prompt: function(){ 
				var curobsname = namobservees_arr[curind_block];
					
				return "<div class='divtop'>" +
				'<p>How confident do you think ' + curobsname + ' is that, on the current block, one deck is more likely to give a rewarded card than the other?</p>' +
				"</div>" },
				response_ends_trial: true,
				post_trial_gap: 100, /* adding 100 ms to mimmick time if no rating is given XXX */			
				data: {
					block: function () { return curblock },
					condition: function () { return condtype_arr[curind_block]},
					phase: function () { return curphase },
					trial: function () { return curtri },
					task_type: "rating_observee"}
				}

				/*Putting rating defined before into a timeline (necesssary to be able to skip rating sometimes) */
				var tl_rating_observee = {
					timeline: [rating_observee], /* in this timeline we should add any other rating we need, should we need two XXX*/
					conditional_function: function(){
						if (present_rating_observee == 1 && rattri_obs[curind_block][curind_trial] == 1){
							return true;
						} else {
							return false;
						}
					}   
				}
				
				
				
				/* Rating observer's confidence */
				var rating_observer = {
					type: 'cont-scale',
					mapping: function(){ return scalecols[curind_block]}, /* if 0, left half of scale is blue; if 1, left half is pink */
					prompt: function(){ 
						return "<div class='divtop'>" +
						'<p>How confident are YOU that, on the current block, one deck is more likely to give a rewarded card than the other?</p>' +
						"</div>" },
						response_ends_trial: true,
						post_trial_gap: 100, /* adding 100 ms to mimmick time if no rating is given XXX */			
						data: {
							block: function () { return curblock },
							condition: function () { return condtype_arr[curind_block]},
							phase: function () { return curphase },
							trial: function () { return curtri },
							task_type: "rating_observer"}
						}


						/*For observation phase, putting rating defined before into a timeline (necesssary to be able to skip rating sometimes) */
						var tl_rating_observer_obs = {
							timeline: [rating_observer], /* in this timeline we should add any other rating we need, should we need two XXX*/
							conditional_function: function(){
								if (present_rating_observer == 1 && rattri_obs[curind_block][curind_trial] == 1){
									return true;
								} else {
									return false;
								}
							}   
						}
					
						/*For action phase, putting rating defined before into a timeline (necesssary to be able to skip rating sometimes) */
						var tl_rating_observer_ac = {
							timeline: [rating_observer], /* in this timeline we should add any other rating we need, should we need two XXX*/
							conditional_function: function(){
								if (present_rating_observer == 1 && rattri_ac[curind_block][curind_trial] == 1){
									return true;
								} else {
									return false;
								}
							}   
						}


						/* Updating relevant variables */ 
						var update_obstrial = {
							type: "html-keyboard-response",
							stimulus:"<p> </p>" ,
							response_ends_trial: false,
							trial_duration: 250,
							post_trial_gap: 0,
							on_finish: function(data){
									
									
								if (curphase == "mixed_observation"){
									choarm = choobservees_arr[curind_block][curind_trial];
									choloc = jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "observee_feedback"}).select('choice_location').values;
									chorew = jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "observee_feedback"}).select('choice_rewarded').values;	
								} else {
									choarm = jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "choice_feedback"}).select('choice_arm').values /* chosen arm, 0 = arm A, 1 = arm B */
									choloc = jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "choice_feedback"}).select('choice_location').values;
									chorew = jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "choice_feedback"}).select('choice_rewarded').values;	
								}
			
								/* adding info to all parts of this trial */
								jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri }).addToAll({
									observee_name: namobservees_arr[curind_block], /* observee's name */
									observee_pic: picobservees_arr[curind_block], /* observee's picture */
									observee_behav: behobservees_arr[curind_block], /* observee's choice behavior */
									observee_timewin: timewinobservees_arr[curind_block], /* observee's time window */
									prob_armA: prob_armA, /* reward probability of arm A */ /*XXX change when having different probabilities */
									prob_armB: prob_armB_pool_ext[curind_block], /* reward probability of arm B */ /*XXX change when having different probabilities */
									rew_armA: rewarr_obs_armA[curind_block][curind_trial], /* reward given by arm A? , 0 = no, 1 = yes */
									rew_armB: rewarr_obs_armB[curind_block][curind_trial], /* reward given by arm B? , 0 = no, 1 = yes */
									loc_armA: locarmAarr_obs[curind_block][curind_trial], /* current location of arm A, 0 = left, 1 = right */						
									colarmA: colarmAarr[curind_block], /* which color deck arm A is be associated to. 0 = blue, 1 = pink. */
									ratscalemapping: armMapping[curind_block], /* mapping for rating scales. 0 = arm A left side, arm B right side, 1 = arm B left side, arm A right side. */
									rew_armleft: rewarr_obs_armleft[curind_block][curind_trial], /* reward given by left arm? , 0 = no, 1 = yes */
									rew_armright: rewarr_obs_armright[curind_block][curind_trial], /* reward given by right arm? , 0 = no, 1 = yes */
									rattri: rattri_obs[curind_block][curind_trial], /* is this a trial with rating? , 0 = no, 1 = yes*/
									choice_arm: choarm, /* observee's choice. 0 = arm A, 1 = arm B */ /* XXX WARNING: saved even in onlyac blocks. So we generate behavior for those too, even if not used. Ok as long as only random observee exists, change for other experiments*/
									choice_location: choloc, /* observee's chosen location, 0 = left, 1 = right */
									choice_rewarded: chorew, /* was observee's choice rewarded?, 0 = no, 1 = yes */
									resp_ratobservee: convratresp(
										jsPsych.data.get().last(3).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observee"}).select('rating_response').values
										, rattri_obs[curind_block][curind_trial]),
										resp_ratobserver: convratresp(
											jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observer"}).select('rating_response').values, rattri_obs[curind_block][curind_trial]),
											/* jjsPsych.data.getLastTimelineData().filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observee"}).select('button_pressed').values, */
											armA_ratobservee: wasratarmA(
													jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observee"}).select('rating_response').values,
												    jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observee"}).select('rating_left').values,
													locarmAarr_obs[curind_block][curind_trial],  
													rattri_obs[curind_block][curind_trial]),
											armA_ratobserver: wasratarmA(
													jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observer"}).select('rating_response').values,
												    jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observer"}).select('rating_left').values,
													locarmAarr_obs[curind_block][curind_trial],  
													rattri_obs[curind_block][curind_trial])	
										});
			
										/* update trial number and index */
										curtri = curtri + 1;
										curind_trial = curind_trial + 1;
		
										if(curtri > numtrials_obs){
											curtri = 1;
											curind_trial = 0;
												
											curphase = phasepool_late[condtype_arr[curind_block]];/* change phase to late phase of this block's condition*/
										}
									}
								} /* end update_obstrial */
		
		
		
		
								/* present initial screen so participant is aware of block and phase */ 
								var initscreen_acphase = {
									type: "html-keyboard-response-minimumRT",
									stimulus: function() { 
			
										return "<div class='divmiddle'>" + 
										'<p><strong>BLOCK ' + curblock + ' , ACTION PHASE</strong> </p>' +
										'<p></p>' +
										'<p>You will now have to choose for 10 trials</p>' +
										"</div>" +
										"<div class='divbottom'>" + 
										"<p>Press the <strong>space bar</strong> to start.</p>" + 
										"</div>"
									} ,
									choices: ['Space'],
									minimum_RT: minRT_500,
									post_trial_gap: 0		
								} /* end of initscreen_acphase */
			
								/*Putting initial screen into a timeline (so we can present it only on first trial of phase) */
								var tl_initscreen_acphase = {
									timeline: [initscreen_acphase], /* in this timeline we should add any other rating we need, should we need two XXX*/
									conditional_function: function(){
										if (curphase == "mixed_action" && curtri == 1){
											return true;
										} else {
											return false;
										}
									}   
								}
										
										
								/* prepare variables for action trial and show them on screen so we know what is going on */ 
								var inittext_actrial = {
									type: "html-keyboard-response",
									stimulus: function() { 
			
										var curlocA = locarmAarr_ac[curind_block][curind_trial];
			
										return "<div class='divmiddle'>" + 
										"<p>ACTION PHASE</p>" + 
										"<p>" + 'participant id '+ subj_id + "</p>" +
										"<p>" + 'current block '+ curblock + '       current index '+ curind_block + "</p>" +
										"<p>" + 'array conds ' + condtype_arr + 'current condition '+ condtype_arr[curind_block] + ' current phase '+ curphase + "</p>" +
										"<p>" + 'current trial '+ curtri + '       current index '+ curind_trial + "</p>" +
										"<p>" + 'location arm A '+ locarmAarr_ac[curind_block] + "</p>" +
										"<p>" + 'arm A is located on '+ curlocA + ' and is color ' + colarmAarr[curind_block] + "</p>" +
										"<p>" + 'rewards arm A '+ rewarr_ac_armA[curind_block] + "</p>" +
										"<p>" + 'rewards arm B '+ rewarr_ac_armB[curind_block] + "</p>" +
										"<p>" + 'rewards arm left '+ rewarr_ac_armleft[curind_block] + "</p>" +	
										"<p>" + 'rewards arm right '+ rewarr_ac_armright[curind_block] + "</p>" +	
										"</div>" +
										"<div class='divbottom'>" + 
										"<p>Press the <strong>space bar</strong> to start the block.</p>" + 
										"</div>"
									} ,
									choices: ['Space'],
									post_trial_gap: 0,
									data: { /*save key variables in data so they are stored and can be retrieved later for conditional statements */
										rew_armA: function () { /* save whether arm A will give reward if chosen */
											ci = curind_trial;
											return rewarr_ac_armA[curind_block][curind_trial] /*ci */
										},  /* end of rew_armA function */ 
				
										rew_armB: function () { /* save whether arm A will give reward if chosen */
											ci = curind_trial;
											return rewarr_ac_armB[curind_block][curind_trial] /* ci */
										},  /* end of rew_armB function */ 
										loc_armA: function () { /* save location of arm A */
											ci = curind_trial;
											return locarmAarr_ac[curind_block][curind_trial] /* ci */
										}  /* end of loc_armA function */ 
									} /* end of data adding */ 		
								} /* end of inittext_actrial */
		
		
								/*Putting parameter info screen into a timeline (so we can switch it on/off via parameter debug_mode) */
								var tl_inittext_actrial = {
									timeline: [inittext_actrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
									conditional_function: function(){
										if (debug_mode == 1){
											return true;
										} else {
											return false;
										}
									}   
								}
		
								/* defining action trial */
								var actrial = { 
		
									timeline: [
			
										/* Making choice */ 
										{type: "html-keyboard-response-minimumRT",
										stimulus: function() { 
			
											if (curphase == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
												var curlocA = locarmAarr_obs[curind_block][curind_trial];	
											} else { /* otherwise using values from ac array */
												var curlocA = locarmAarr_ac[curind_block][curind_trial];		
											}
												
								
											if (colarmAarr[curind_block] == 0){	/* color for arm A deck is blue */
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
												
											if (curphase == "onlyac_late"){ /* late phase of only action block, so trial number continues from earlier phase on this block, so 11 to 20 */  
												var texttritoshow = numtrials_obs + curtri;
											} else { /* trial counter appearing with respect to that phase, so 1 to 10 */
												var texttritoshow = curtri;
											}	
				
											return "<div class='divtop'>" +
											'<p>BLOCK ' + curblock + ' , ACTION TRIAL ' + texttritoshow + '</p>' +
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
												block: function () { return curblock },
												condition: function () { return condtype_arr[curind_block]},
												phase: function () { return curphase },
												trial: function () { return curtri },
												task_type: "choice"}
											} /* end of making choice */
	
											,
			
											/* Giving feedback */ 
											{type: "html-keyboard-response-minimumRT",
											stimulus: function() { 
				
												var ci = curind_trial;			
												var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
													
												
												if (curphase == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
													var cur_rewleft = rewarr_obs_armleft[curind_block][curind_trial]; /* current reward for left cardd */
													var cur_rewright = rewarr_obs_armright[curind_block][curind_trial]; /*current reward for right card */
													var curlocA = locarmAarr_obs[curind_block][curind_trial]; /* current location of arm A */	
												} else { /* otherwise using values from ac array */
													var cur_rewleft = rewarr_ac_armleft[curind_block][curind_trial]; 
													var cur_rewright = rewarr_ac_armright[curind_block][curind_trial];
													var curlocA = locarmAarr_ac[curind_block][curind_trial];	
												}
												

									
												if (colarmAarr[curind_block] == 0){	/* color for arm A deck is blue */
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
												block: function () { return curblock },
												condition: function () { return condtype_arr[curind_block]},
												phase: function () { return curphase },
												trial: function () { return curtri },
												task_type: "choice_feedback",
				
												choice_location: function () { /* save observer's location of chosen arm, either left (0) or right (1) */
					
													var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
										
													if(key_pressed == 83){ /* response is left */
														return 0
													} else { /* response is right */
														return 1}
													} , /* end of function choice_location */
					
					
													choice_arm: function () { /* save observer's chosen arm, either A (0) or B (0) */
					
														var key_pressed = jsPsych.data.get().last(1).values()[0].key_press;
															
														if (curphase == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
															var curlocA = locarmAarr_obs[curind_block][curind_trial];	
														} else { /* otherwise using values from ac array */
															var curlocA = locarmAarr_ac[curind_block][curind_trial];		
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
																			
														if (curphase == 'onlyac_early') { /* if this is early phase for onlyac block, using values from obs array, as it is first half of block */
															var currewarmleft = rewarr_obs_armleft[curind_block][curind_trial];
															var currewarmright = rewarr_obs_armright[curind_block][curind_trial];
														} else { /* otherwise using values from ac array */
															var currewarmleft = rewarr_ac_armleft[curind_block][curind_trial];
															var currewarmright = rewarr_ac_armright[curind_block][curind_trial];		
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
		
										] /* end of timeline */
									} /* end of actrial */
			
			
									/*Putting actrial into a timeline (so we can present it also as early phase when cond is onlyac, and skip it when it is obs + ac) */
									var tl_onlyactrial_early = {
										timeline: [actrial], /* in this timeline we should add any other rating we need, should we need two XXX*/
										conditional_function: function(){
											if (curphase == "onlyac_early"){
												return true;
											} else {
												return false;
											}
										}   
									}
			
									/* Updating relevant variables */ 
									var update_actrial = {
										type: "html-keyboard-response",
										stimulus: "<p> </p>",
										response_ends_trial: false,
										trial_duration: 250,
										post_trial_gap: 0,
										on_finish: function(data){
											/* adding info to all parts of this trial */
											jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri }).addToAll({
												prob_armA: prob_armA , /* reward probability of arm A */ /*XXX change when having different probabilities */
												prob_armB:  prob_armB_pool_ext[curind_block] , /* reward probability of arm B */ /*XXX change when having different probabilities */
												rew_armA:  rewarr_ac_armA[curind_block][curind_trial], /* reward given by arm A? , 0 = no, 1 = yes */
												rew_armB: rewarr_ac_armB[curind_block][curind_trial], /* reward given by arm B? , 0 = no, 1 = yes */
												loc_armA: locarmAarr_ac[curind_block][curind_trial], /* current location of arm A, 0 = left, 1 = right */
												colarmA: colarmAarr[curind_block], /* which color deck arm A is be associated to. 0 = blue, 1 = pink. */
												ratscalemapping: armMapping[curind_block], /* mapping for rating scales. 0 = arm A left side, arm B right side, 1 = arm B left side, arm A right side. */
												col_armA: colarmAarr[curind_block], /* current color of arm A, 0 = blue, 1 = pink */
												rew_armleft: rewarr_ac_armleft[curind_block][curind_trial], /* reward given by left arm? , 0 = no, 1 = yes */
												rew_armright: rewarr_ac_armright[curind_block][curind_trial], /* reward given by right arm? , 0 = no, 1 = yes */
												rattri: rattri_ac[curind_block][curind_trial], /* is this a trial with rating? , 0 = no, 1 = yes*/
												choice_arm: jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "choice_feedback"}).select('choice_arm').values, /* chosen arm, 0 = arm A, 1 = arm B */
												choice_location: jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "choice_feedback"}).select('choice_location').values, /* chosen location, 0 = left, 1 = right */
												choice_rewarded: jsPsych.data.get().filter({block:curblock, phase: curphase, trial: curtri, task_type: "choice_feedback"}).select('choice_rewarded').values, /* was observer's choice rewarded?, 0 = no, 1 = yes */
												resp_ratobserver: convratresp(
													jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observer"}).select('rating_response').values, rattri_ac[curind_block][curind_trial]),
												armA_ratobserver: wasratarmA(
														jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observer"}).select('rating_response').values,
													    jsPsych.data.get().last(2).filter({block:curblock, phase: curphase, trial: curtri, task_type: "rating_observer"}).select('rating_left').values,
														locarmAarr_ac[curind_block][curind_trial],  
														rattri_ac[curind_block][curind_trial])
												});
						
												/* update trial number and index, and block if necessary */
												curtri = curtri + 1;
												curind_trial = curind_trial + 1;
				
												if(curtri > numtrials_ac){
													curblock = curblock + 1;
													curind_block = curind_block + 1;
													curtri = 1;
													curind_trial = 0;
														
													curphase = phasepool_early[condtype_arr[curind_block]];/* change phase to early phase of next block's condition. Block index has been updated so we can use this index for next block */
												}
											} /* end on_finish function */
										}/* end update_actrial */
						
			
			
										/* present screen with feedback on reward for the block that just finished */ 
										var screen_rewardfeedback = {
											type: "html-keyboard-response-minimumRT",
											stimulus: function() { 
													
												if (condtype_arr[curind_block-1] == 0) { /* this was an obs + ac block. Using curindblock - 1 because block index has already been updated for next block */
													numrewtri = jsPsych.data.get().filter({block:curblock-1, phase: 'mixed_action', task_type: 'choice_feedback', choice_rewarded: 1}).count() ;
														
												} else { /* this was an only ac block */
														
													numrewtri_early = jsPsych.data.get().filter({block:curblock-1, phase: 'onlyac_early', task_type: 'choice_feedback', choice_rewarded: 1}).count() ; 
													numrewtri_late = jsPsych.data.get().filter({block:curblock-1, phase: 'onlyac_late', task_type: 'choice_feedback', choice_rewarded: 1}).count() ; 
													numrewtri = numrewtri_early + numrewtri_late;/* WARNING: Here we take into account all 20 trials of onlyac block. Change if only wanting to give feedback on 2nd half of block */
														
												}
													
													
			
												return "<div class='divmiddle'>" + 
												'<p>On this block, you drew <strong>' + numrewtri + ' REWARDED CARDS</strong> </p>' +
												'<p></p>' +
												"</div>" +
												"<div class='divbottom'>" + 
												"<p>Press the <strong>space bar</strong> to advance to the next block.</p>" + 
												"</div>"
											} ,
											choices: ['Space'],
											minimum_RT: minRT_500,
											post_trial_gap: 0		
										} /* end of screen_rewardfeedback */