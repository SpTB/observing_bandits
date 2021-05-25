/* CALCULATE REWARD */

/* present screen announcing transition from observation to action trials */ 
var calc_reward = {
	type: "html-keyboard-response",
	stimulus: function() {
		
		vecphasetoreward = array01s(numblocks_aimed); /* for each block, phase to select trial for reward. 0 = early (mixed observation / first trials of only action), 1 = late (mixed action / last trials of only action) */
		
		vectrialspayoff_early = randomInteger(1,numtrials_obs,numblocks_aimed); /* for the early phase of each block (mixed observation / first trials of only action), random trial that will be used for payoff */
		vectrialspayoff_late = randomInteger(1,numtrials_ac,numblocks_aimed); /* for the late phase of each block (mixed action / last trials of only action), random trial that will be used for payoff */
		
		
		/* vectrialspayoff = randomInteger(1,numtrials_obs + numtrials_ac,numblocks_aimed); /* /* random trial that will be used for payoff, over total trials in that block */
		
		var vecrewards_perblock_summed_mixed_observation = [];
		var vecrewards_perblock_summed_mixed_action = [];
		var vecrewards_perblock_summed_onlyac_early = [];
		var vecrewards_perblock_summed_onlyac_late = [];
		var vecrewards_perblock = [];
		
		hiho = jsPsych.data.get().filter({phase: 'mixed_action', task_type: 'choice_feedback', choice_rewarded: 1}).count() ;
	
	for(var i=0; i<numblocks_real; i++) { /* looping through existing blocks */
		
		current_condtype = condtype_arr[i]; /* current condition type: 0 = observation + action; 1 = action only */
		

		if (vecphasetoreward[i] == 0) { /* trial to sample for reward is from first 10 trials */
			
			current_trialforpayoff = vectrialspayoff_early[i]; /* on current block, trial number that will be sampled for payoff */
			
			if (current_condtype == 0) { /* current block was observation + action */
				cur_vecrewards_perblock_summed_mixed_observation = jsPsych.data.get().filter({block: i+1, phase: 'mixed_observation', task_type: 'observee_feedback', choice_rewarded: 1}).count() ;	
				vecrewards_perblock_summed_mixed_observation = vecrewards_perblock_summed_mixed_observation.concat(cur_vecrewards_perblock_summed_mixed_observation);
				
				cur_reward_trial = jsPsych.data.get().filter({block: i+1, phase: 'mixed_observation', trial: current_trialforpayoff, task_type: 'observee_feedback'}).select('choice_rewarded').values; /* see if sampled trial was rewarded (1) or not (0) */
							
			} else { /* current block was action only */	
				cur_vecrewards_perblock_summed_onlyac_early = jsPsych.data.get().filter({block: i+1, phase: 'onlyac_early', task_type: 'choice_feedback', choice_rewarded: 1}).count() ;
				vecrewards_perblock_summed_onlyac_early = vecrewards_perblock_summed_onlyac_early.concat(cur_vecrewards_perblock_summed_onlyac_early);
				
				cur_reward_trial = jsPsych.data.get().filter({block: i+1, phase: 'onlyac_early', trial: current_trialforpayoff, task_type: 'choice_feedback'}).select('choice_rewarded').values; /* see if sampled trial was rewarded (1) or not (0) */		
			}
			
		} else { /* trial to sample for reward is from last 10 trials */
			
			current_trialforpayoff = vectrialspayoff_late[i]; /* on current block, trial number that will be sampled for payoff */
			
			if (current_condtype == 0) { /* current block was observation + action */
				cur_vecrewards_perblock_summed_mixed_action = jsPsych.data.get().filter({block: i+1, phase: 'mixed_action', task_type: 'choice_feedback', choice_rewarded: 1}).count() ;
				vecrewards_perblock_summed_mixed_action = vecrewards_perblock_summed_mixed_action.concat(cur_vecrewards_perblock_summed_mixed_action);
				
				cur_reward_trial = jsPsych.data.get().filter({block: i+1, phase: 'mixed_action', trial: current_trialforpayoff, task_type: 'choice_feedback'}).select('choice_rewarded').values; /* see if sampled trial was rewarded (1) or not (0) */		
				
			} else { /* current block was action only */
				cur_vecrewards_perblock_summed_onlyac_late = jsPsych.data.get().filter({block: i+1, phase: 'onlyac_late', task_type: 'choice_feedback', choice_rewarded: 1}).count() ;
				vecrewards_perblock_summed_onlyac_late = vecrewards_perblock_summed_onlyac_late.concat(cur_vecrewards_perblock_summed_onlyac_late);
				
				cur_reward_trial = jsPsych.data.get().filter({block: i+1, phase: 'onlyac_late', trial: current_trialforpayoff, task_type: 'choice_feedback'}).select('choice_rewarded').values; /* see if sampled trial was rewarded (1) or not (0) */	
			
			}
			
		}
		
		vecrewards_perblock = vecrewards_perblock.concat(cur_reward_trial);
		
		
		} /* end block loop */	
		 
		  var vecrewards_perblock_summed = sumvecelems(vecrewards_perblock); /* sum vector of sampled rewards */
		  
		  var payoff_final = payoff_base + (vecrewards_perblock_summed * moneyperhit); /* payoff is base + choice-based reward */
		  
		  if (payoff_final < payoff_floor) { /* make that participants cannot win less than floor payoff */
			  payoff_final = payoff_floor;
		  }
		 
		 var prova_thisblocksrewards_mixed_observation = jsPsych.data.get().filter({block: 1, phase: 'mixed_observation', task_type: 'observee_feedback'}).select('choice_rewarded').values;
		 var prova_thisblocksrewards_onlyac_early = jsPsych.data.get().filter({block: 1, phase: 'onlyac_early', task_type: 'choice_feedback'}).select('choice_rewarded').values;
		 var prova_thisblocksrewards_mixed_action = jsPsych.data.get().filter({block: 1, phase: 'mixed_action', task_type: 'choice_feedback'}).select('choice_rewarded').values;
		 var prova_thisblocksrewards_onlyac_late = jsPsych.data.get().filter({block: 1, phase: 'onlyac_late', task_type: 'choice_feedback'}).select('choice_rewarded').values;
			
		return "<div class='divmiddle'>" + 
		"<p>The experiment is over! </p>" +
		'<p></p>' +
		/* "<p>Vector summed mixed observation " + vecrewards_perblock_summed_mixed_observation + "</p>" +
		"<p>Vector summed mixed action " + vecrewards_perblock_summed_mixed_action + "</p>" +
		"<p>Vector summed onlyac early " + vecrewards_perblock_summed_onlyac_early + "</p>" +
		"<p>Vector summed onlyac late " + vecrewards_perblock_summed_onlyac_late + "</p>" + */
		/*"<p>phase to reward is " + vecphasetoreward + "</p>" +
		"<p>conditions for each block " + condtype_arr + "</p>" +
		"<p>vector rewards block 1, mixed observation " + prova_thisblocksrewards_mixed_observation + "</p>" +
		 "<p>vector rewards block 1, onlyac early " + prova_thisblocksrewards_onlyac_early + "</p>" +
		 "<p>vector rewards block 1, mixed action " + prova_thisblocksrewards_mixed_action + "</p>" +
		  "<p>vector rewards block 1, onlyac late " + prova_thisblocksrewards_onlyac_late + "</p>" +
		"<p>vector rewards per sampled trials " + vecrewards_perblock + " and summed " + vecrewards_perblock_summed + "</p>" +
		"<p>vec payoff trials early " + vectrialspayoff_early + " and late " + vectrialspayoff_late + "</p>" +
		'<p></p>' +*/
		 "<p>Your final payoff is $" + payoff_final + "</p>" +
		"</div>" +
		"<div class='divbottom'>" + 
		"<p>Thank you very much for participating!</p>" + 
		"</div>"
	} ,
	choices: ['Space'],
	post_trial_gap: 0		
} /* end of screen_prac_transition */