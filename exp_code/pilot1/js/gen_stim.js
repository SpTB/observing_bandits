// ----
// Define parameters and generate stimuli
// ----
	
/* DEFINE PARAMETERS THAT CAN BE CHANGE */
var exp_type = "random_robot"; /* Type of experiment. "random_robot" has only one observee, characterized as a robot, making random choices */
var debug_mode = 0; /* if 1, before each trial a screen will appear with that trial's and block's parameter values, so they can be checked */
var present_instructions = 1; /* if 1, present instructions; otherwise skip them */
var present_practice = 0; /* if 1, present practice block; otherwise skip them */
var present_rating_observee = 0; /* presenting ratings where participant has to give confidence about observee's belief? 1 = yes, 0 = no */
var present_rating_observer = 1; /* presenting ratings where participant has to give confidence about their own belief? 1 = yes, 0 = no */
var present_questionnaire = 1; /* presenting questionnaire at the end of experiment? 1 = yes, 0 = no */

var minRT_long = 3000; /* minimum RT for key press allowed in elements like instructions and presentation of long text */
var minRT_500 = 500; /* minimum RT for key press allowed when presenting announcement screens and short text */
var minRT_200 = 200; /* minimum RT for key press allowed when presenting choice and feedback screens */

var numconds = 2; /* number of conditions */
var numobservees = 1; /* number of different observees */
var numtimewindows = 1; /* number of time windows. Default is 2, early and late */
var numrepspercomb = 2; /* number of repetitions per combination of factors crossing */
var numblocks_aimed = numconds * numobservees * numtimewindows * numrepspercomb; /* aimed number of blocks, taking into account all parameter values that would define perfectly balanced factorial design */
var numblocks_real = 1; /*real number of blocks that experiment will have. However stimuli are generated with numblocks_aimed, so if numblocks_real < numblocks_aimed, not all combinations will be presented same number of times */
var numtrials_obs = 10; /*number of trials for each block of observation phase */
var numtrials_ac = 10; /*number of trials for each block of action phase */
var prob_armA = 0.65; /* probability of reward of arm A */
var prob_armB_pool = [0.45, 0.25]; /* possible probabilities of reward of arm B */ 
/*var prob_armB = 0.4;*/ /* probability of reward of arm B */
var interleave_onlyacblocks = 1; /* if 1, 50% of blocks will be only action */
var rewards_pseudorandom = 0; /* if 1, rewards for each block's phase are pseudorandomized so, lets say, for an arm with reward prob of 0.6, in 10 trials 6 will be rewarded */
/* WARNING: if wanting to pseudorandomize reward, number trials on each phase should be multiples of prob_armB and prob_armB_pool */
var deckside_counttrials = 0; /* if 1, counterbalance deck side from trial to trial; if 0, counterbalance across blocks but make them stable within them */


var timewin_early_start_trial = 6; /* in early time window, trial along observee's choice sequence at which observer starts observing */
var timewin_early_end_trial = 15; /* in early time window, trial along observee's choice sequence at which observer finishes observing */
var timewin_late_start_trial = 16; /* in late time window, trial along observee's choice sequence at which observer starts observing */
var timewin_late_end_trial = 25; /* in late time window, trial along observee's choice sequence at which observer finishes observing */	

var rating_freq = 0; /* if 1, rating will appear every freqrating trials (defined below). if 0, it will be according to more complex scheme */	
var freqrating = 3; /* value specifying every how many trials there will be a rating */
var ratfreq_mods = [0,1,1,2]; /*modalities determining which is index of first trial within a block that will be rated */
var ratfreq_pool = [3,4]; /* pool from which we will later sample number of trials of spacing whithin rated trials */


var namepool_female = ['MARY','VIOLET']; /* female name pool to sample from */
var namepool_male = ['HENRY','JAMES']; /* male name pool to sample from */

var behaviorpool = ['random','thompson','egreedy']; /* array with observee choice behaviors */

var payoff_base = 10; /* amount to pay participants just for participating */
var moneyperhit = 0.5; /* money paid for each rewarded trial (chosen through sampling), to be multiplied by the number of rewarded samples */
var payoff_floor = 15; /* independently of performance, floor payment for the experiment. Final payoff will be this value if it should be inferior. */

/* define graphical parameters */

/*defining scale colors if going with non-gradient scales with black in the middle */
var buttcl_regular = '<button class="confrat-btn">%choice%</button>'; /* text for regular button class */
var buttcl_blue = '<button class="confrat-btn-blue">%choice%</button>'; /* text for blue button class */
var buttcl_pink = '<button class="confrat-btn-pink">%choice%</button>'; /* text for pink button class */
/*var buttarr_pinkleft = [buttcl_pink,buttcl_pink,buttcl_pink,buttcl_pink,buttcl_pink,buttcl_regular,buttcl_blue,buttcl_blue,buttcl_blue,buttcl_blue,buttcl_blue];*/ /* pink left, black in middle, no gradient */
/*var buttarr_blueleft = [buttcl_blue,buttcl_blue,buttcl_blue,buttcl_blue,buttcl_blue,buttcl_regular,buttcl_pink,buttcl_pink,buttcl_pink,buttcl_pink,buttcl_pink];*/ /* pink left, black in middle, no gradient */

/*defining scale colors if going gradient scales with white in the middle */
var buttcl_grad_blue100 = '<button class="confrat-btn-blue-100">%choice%</button>';
var buttcl_grad_blue90 = '<button class="confrat-btn-blue-90">%choice%</button>';
var buttcl_grad_blue80 = '<button class="confrat-btn-blue-80">%choice%</button>';
var buttcl_grad_blue70 = '<button class="confrat-btn-blue-70">%choice%</button>';
var buttcl_grad_blue60 = '<button class="confrat-btn-blue-60">%choice%</button>';
var buttcl_grad_50 = '<button class="confrat-btn-grad-50">%choice%</button>';
var buttcl_grad_pink100 = '<button class="confrat-btn-pink-100">%choice%</button>';
var buttcl_grad_pink90 = '<button class="confrat-btn-pink-90">%choice%</button>';
var buttcl_grad_pink80 = '<button class="confrat-btn-pink-80">%choice%</button>';
var buttcl_grad_pink70 = '<button class="confrat-btn-pink-70">%choice%</button>';
var buttcl_grad_pink60 = '<button class="confrat-btn-pink-60">%choice%</button>';
var buttarr_pinkleft = [buttcl_grad_pink100,buttcl_grad_pink90,buttcl_grad_pink80,buttcl_grad_pink70,buttcl_grad_pink60,buttcl_grad_50,buttcl_grad_blue60,buttcl_grad_blue70,buttcl_grad_blue80,buttcl_grad_blue90,buttcl_grad_blue100];
var buttarr_blueleft = [buttcl_grad_blue100,buttcl_grad_blue90,buttcl_grad_blue80,buttcl_grad_blue70,buttcl_grad_blue60,buttcl_grad_50,buttcl_grad_pink60,buttcl_grad_pink70,buttcl_grad_pink80,buttcl_grad_pink90,buttcl_grad_pink100];

var observeepicspool_female = ['head_female1','head_female2'];
var observeepicspool_male = ['head_male1','head_male2'];

/* determine which blocks are going to be observation + action, and which are going to be action only */
if (interleave_onlyacblocks ==1){ /* interleave observation + action with only action blocks */
	var condtype_arr =  array01s(numblocks_aimed); /* 0 = observation + action; 1 = action only */
} else { /* only observation + action blocks */
	var condtype_arr =  fillArray(0,numblocks_aimed); /* 0 = observation + action */
}

phasepool_early = ['mixed_observation','onlyac_early'];
phasepool_late = ['mixed_action','onlyac_late'];

/* create arrays of rewards and locations for each arm*/
var rewarr_obs_armA = [];
var rewarr_obs_armB = [];
var rewarr_ac_armA = [];
var rewarr_ac_armB = [];
var locarmAarr_obs = [];
var locarmAarr_ac = [];
var rewarr_obs_armleft = [];
var rewarr_obs_armright = [];
var rewarr_ac_armleft = [];
var rewarr_ac_armright = [];
var rattri_obs = [];
var rattri_ac = [];
var leftdeck_prompt = [];
var rightdeck_prompt = [];
var scalecols = [];


/* ASSIGN REWARDS FOR EACH ARM AND TRIAL */
var prob_armB_pool_ext = new Array(numblocks_aimed/prob_armB_pool.length).fill(prob_armB_pool).flat(); /* extend prob B pool so we have as many elements as aimed blocks */
shuffleArray(prob_armB_pool_ext); /* shuffle (and replace) previous array */

var armMapping =  array01s(numblocks_aimed);/* for each block, mapping arms to sides of screen. Also used for rating scales. 0 = arm A left side, arm B right side, 1 = arm B left side, arm A right side. WARNING: number of blocks should be pair */

for(var i=0; i<numblocks_aimed; i++) {
		
	if(rewards_pseudorandom==1){ /* rewards are pseudorandomized */	
		rewarr_obs_armA[i] = PseuRanBernArray(prob_armA, numtrials_obs); /* create array of rewards for arm A in observation phase. This is pseudorandomized. */
		rewarr_obs_armB[i] = PseuRanBernArray(prob_armB_pool_ext[i], numtrials_obs); /* create array of rewards for arm B in observation phase. This is pseudorandomized. */	
		rewarr_ac_armA[i] = PseuRanBernArray(prob_armA, numtrials_ac); /* create array of rewards for arm A in action phase. This is pseudorandomized. */
		rewarr_ac_armB[i] = PseuRanBernArray(prob_armB_pool_ext[i], numtrials_ac); /* create array of rewards for arm B in action phase. This is pseudorandomized. */	
	} else { /* rewards are truly randomized */
		rewarr_obs_armA[i] = BernoulliArray(prob_armA, numtrials_obs); /* create array of rewards for arm A in observation phase. This is truly randomized. */
		rewarr_obs_armB[i] = BernoulliArray(prob_armB_pool_ext[i], numtrials_obs); /* create array of rewards for arm B in observation phase. This is truly randomized. */
		rewarr_ac_armA[i] = BernoulliArray(prob_armA, numtrials_ac); /* create array of rewards for arm A in action phase. This is truly randomized. */
		rewarr_ac_armB[i] = BernoulliArray(prob_armB_pool_ext[i], numtrials_ac); /* create array of rewards for arm B in action phase. This is truly randomized. */	
	}


	if(deckside_counttrials == 1 ){ /* counterbalance side taken by each deck on each trial */
		locarmAarr_obs[i] = array01s(numtrials_obs); /*for observation phase, create array of shuffled 0s and 1s that will determine location of arm A on the choice screen. 0 = left, 1 = right */
		locarmAarr_ac[i] = array01s(numtrials_ac); /*for action phase, create array of shuffled 0s and 1s that will determine location of arm A on the choice screen. 0 = left, 1 = right */
	} else { /* counterbalance side taken by each deck across blocks, but stable within a block */
		locarmAarr_obs[i] = fillArray(armMapping[i],numtrials_obs); /* for observation phase, fill array (n = num trials) with mapping of each arm on screen. 0 = arm A left side, 1 = arm A right side */
		locarmAarr_ac[i] = fillArray(armMapping[i],numtrials_ac); /* idem, for action phase */
	} 
	
	rewarr_obs_armleft[i] =  createlocarray(locarmAarr_obs[i], rewarr_obs_armA[i], rewarr_obs_armB[i], "left") ;/* for observation trials, array telling us whether left arm will hold reward on each trial */
	rewarr_obs_armright[i] =  createlocarray(locarmAarr_obs[i], rewarr_obs_armA[i], rewarr_obs_armB[i], "right") ;/* for observation trials, array telling us whether left arm will hold reward on each trial */

	rewarr_ac_armleft[i] =  createlocarray(locarmAarr_ac[i], rewarr_ac_armA[i], rewarr_ac_armB[i], "left") ;/* for action trials, array telling us whether left arm will hold reward on each trial */
	rewarr_ac_armright[i] =  createlocarray(locarmAarr_ac[i], rewarr_ac_armA[i], rewarr_ac_armB[i], "right") ;/* for action trials, array telling us whether left arm will hold reward on each trial */


}




/*ASSIGN TRIALS AFTER WHICH A RATING WILL APPEAR, alternative way */
var heyhey_obs = [];
var heyhey_ac = [];

for (k = 0; k < numblocks_aimed/4; k++) {
	
/* var curshuf = sampnorepl(ratordtoshuff,ratordtoshuff.length); /* shuffle ratordtoshuff to know  */ 

	/*var goodtogo = 0;
	
	while (goodtogo < 4){*/

var ratspacvec1to4_shuf = shuffleArray_norep([1,2,3,4],4);
var ratspacvec5to8_shuf = shuffleArray_norep([5,6,7,8],4);
var ratspacvec9to12_shuf = shuffleArray_norep([9,10,11,12],4);
var ratspacvec13to16_shuf = shuffleArray_norep([13,14,15,16],4);
var ratspacvec17to20_shuf = shuffleArray_norep([17,18,19,20],4);

var currattriblock1 = [ratspacvec1to4_shuf[0],ratspacvec5to8_shuf[0],ratspacvec9to12_shuf[0],ratspacvec13to16_shuf[0],ratspacvec17to20_shuf[0]];
var currattriblock2 = [ratspacvec1to4_shuf[1],ratspacvec5to8_shuf[1],ratspacvec9to12_shuf[1],ratspacvec13to16_shuf[1],ratspacvec17to20_shuf[1]];
var currattriblock3 = [ratspacvec1to4_shuf[2],ratspacvec5to8_shuf[2],ratspacvec9to12_shuf[2],ratspacvec13to16_shuf[2],ratspacvec17to20_shuf[2]];
var currattriblock4 = [ratspacvec1to4_shuf[3],ratspacvec5to8_shuf[3],ratspacvec9to12_shuf[3],ratspacvec13to16_shuf[3],ratspacvec17to20_shuf[3]];

/*
var currattriblock1_difs = absdifconselems(currattriblock1);
var currattriblock2_difs = absdifconselems(currattriblock2);
var currattriblock3_difs = absdifconselems(currattriblock3);
var currattriblock4_difs = absdifconselems(currattriblock4);


if (Math.min(currattriblock1_difs) > 1 ){
	goodtogo ++
}

if (Math.min(currattriblock2_difs) > 1 ){
	goodtogo ++
}

if (Math.min(currattriblock3_difs) > 1 ){
	goodtogo ++
}

if (Math.min(currattriblock4_difs) > 1 ){
	goodtogo ++
}
}*/


var currattriblock1_obs = [];
var currattriblock1_ac = [];
var currattriblock2_obs = [];
var currattriblock2_ac = [];
var currattriblock3_obs = [];
var currattriblock3_ac = [];
var currattriblock4_obs = [];
var currattriblock4_ac = [];

for (l = 0; l < 5; l++) { /* loop taking trials coded in sequences of 20 (10 obs + 10 action trials) and sort them into independent obs and action arrays, recoding action trials */
	
	if(currattriblock1[l]<11) { /* first 10 trials, so it belongs to observation array */
		currattriblock1_obs = currattriblock1_obs.concat(currattriblock1[l]);
	} else { /* last 10 trials, so it belongs to action array */
		currattriblock1_ac = currattriblock1_ac.concat(currattriblock1[l]-10); /* we subtract 10 because now we count within action phase */
	}
	
	if(currattriblock2[l]<11) { /* first 10 trials, so it belongs to observation array */
		currattriblock2_obs = currattriblock2_obs.concat(currattriblock2[l]);
	} else { /* last 10 trials, so it belongs to action array */
		currattriblock2_ac = currattriblock2_ac.concat(currattriblock2[l]-10);
	}
	
	if(currattriblock3[l]<11) { /* first 10 trials, so it belongs to observation array */
		currattriblock3_obs = currattriblock3_obs.concat(currattriblock3[l]);
	} else { /* last 10 trials, so it belongs to action array */
		currattriblock3_ac = currattriblock3_ac.concat(currattriblock3[l]-10);
	}
	
	if(currattriblock4[l]<11) { /* first 10 trials, so it belongs to observation array */
		currattriblock4_obs = currattriblock4_obs.concat(currattriblock4[l]);
	} else { /* last 10 trials, so it belongs to action array */
		currattriblock4_ac = currattriblock4_ac.concat(currattriblock4[l]-10);
	}
	
}

var curchunkrattri_obs = [currattriblock1_obs,currattriblock2_obs,currattriblock3_obs,currattriblock4_obs]; /* for four blocks of this part of the loop, rating trials of observation phase*/
var curchunkrattri_ac = [currattriblock1_ac,currattriblock2_ac,currattriblock3_ac,currattriblock4_ac]; /* same for action phase */


heyhey_obs = heyhey_obs.concat(curchunkrattri_obs); /* each index of this array gives us mini array with numbers (not indices, so starting at 1) of observation phase rating trials of the block corresponding to index */
heyhey_ac = heyhey_ac.concat(curchunkrattri_ac); /* same for action phase */
}


for(var i=0; i<numblocks_aimed; i++) {
	
	var currattri_obs = [];
	var currattri_ac = [];
	
for (l = 0; l < numtrials_obs; l++) {
		
	if(heyhey_obs[i].includes(l+1) == true ){ /* this trial index corresponds to rated trial*/
		currattri_obs[l] = 1;
	} else { /* not rated trial */
		currattri_obs[l] = 0;
	}
	
	if(heyhey_ac[i].includes(l+1) == true ){ /* this trial index corresponds to rated trial*/
		currattri_ac[l] = 1;
	} else { /* not rated trial */
		currattri_ac[l] = 0;
	}		
}

rattri_obs[i] = currattri_obs;
rattri_ac[i] = currattri_ac;
}


/* ASSIGNING COLORS AND SIDES OF THE RATING SCALE FOR EACH DECK AND BLOCK */
var colarmAarr =  array01s(numblocks_aimed);/* for each block, which color deck arm A will be associated to. 0 = blue, 1 = pink. WARNING: number of blocks should be pair */

for(var i=0; i<numblocks_aimed; i++) { 
	leftdeck_prompt[i] = assignRatingText(armMapping[i], colarmAarr[i], "left"); /* text appearing under left half of scale */
	rightdeck_prompt[i] = assignRatingText(armMapping[i], colarmAarr[i], "right"); /* text appearing under right half of scale */
	
	if (leftdeck_prompt[i] == 'BLUE DECK'){ /* appearance of rating scale depending on the color of the deck taking each half of the scale*/
		scalecols[i] = 0; /*buttarr_blueleft; */ /*commented value refers to value if using discrete scales with button plugin */
	} else {
		scalecols[i] = 1; /*buttarr_pinkleft; */ /*commented value refers to value if using discrete scales with button plugin */
	}
}

/* GIVING EACH OBSERVEE A NAME, PICTURE AND CHOICE BEHAVIOR */

if(exp_type == "random_robot"){
	
	(namobservees_arr = []).length = (numblocks_aimed); namobservees_arr.fill("Robbie");
	(picobservees_arr = []).length = (numblocks_aimed); picobservees_arr.fill("head_robbie_back");
	(behobservees_arr = []).length = (numblocks_aimed); behobservees_arr.fill("random");
	(timewinobservees_arr = []).length = (numblocks_aimed); timewinobservees_arr.fill("single");
	
} else {  /*different observees, each with a choice personality */
	
	predominant_gender = (Math.floor(Math.random() * 2) == 0); /* when number of observees is odd, decide whether there will be more female (0) or male (1) observees */
	
	if(predominant_gender == 0){ /* if numobservees is odd, there will be one more female than male observee; if it is even, same */	
		numobservees_female = Math.ceil(numobservees / 2);
		numobservees_male = Math.floor(numobservees / 2);
	} else { /* if numobservees is odd, there will be one more male than female observee; if it is even, same */
		numobservees_female = Math.floor(numobservees / 2);
		numobservees_male = Math.ceil(numobservees / 2);
	}	
	
	var namobservees_female = sampnorepl(namepool_female,numobservees_female); /* female names that will be used */
	var namobservees_male = sampnorepl(namepool_male,numobservees_male); /* male names that will be used */

	var namobservees = namobservees_female.concat(namobservees_male); /*concatenating female and male names */
	shuffleArray(namobservees); /* shuffling concatenated array */

	var picobservees = [];
	var initpicsarr_female = clone(observeepicspool_female);
	var initpicsarr_male = clone(observeepicspool_male);

	for (j = 0; j < namobservees.length; j++) {	
	
		if( namepool_female.includes(namobservees[j]) == true ){ /* name is female */
			randomIndex = Math.floor(Math.random()*initpicsarr_female.length); /* choose index from initial female pool */
			picobservees = picobservees.concat(initpicsarr_female[randomIndex]); /* add element corresponding to index to final array */
			initpicsarr_female.splice(randomIndex, 1)[0]; /* remove taken element from initial female pool */
		} else { /* name is male */	
			randomIndex = Math.floor(Math.random()*initpicsarr_male.length); /* choose index from initial male pool */
			picobservees = picobservees.concat(initpicsarr_male[randomIndex]); /* add element corresponding to index to final array */
			initpicsarr_male.splice(randomIndex, 1)[0]; /* remove taken element from initial male pool */
		}
	}


	var behobservees = shuffleArray_norep(behaviorpool); /* shuffle choice behavior array */

/* namobservees, picobservees and behobservees give us names, pictures and choice behavior of each observee, with a given index for each object corresponding to the same observee */
	var namobservees_ext = new Array(numblocks_aimed/namobservees.length).fill(namobservees).flat(); /* extend namobservees */
	var picobservees_ext = new Array(numblocks_aimed/picobservees.length).fill(picobservees).flat(); /* extend picobservees */
	var behobservees_ext = new Array(numblocks_aimed/behobservees.length).fill(behobservees).flat(); /* extend behobservees */
	var timewinobservees_ext = array2vals('early','late',(namobservees_ext.length/2),(namobservees_ext.length/2)); /* time window array where first half will be early time window and second will be late time window WARNING: change this method is experiment has more than 2 time windows */



		var namobservees_arr = clone(namobservees_ext);
		var picobservees_arr = clone(picobservees_ext);
		var behobservees_arr = clone(behobservees_ext);
		var timewinobservees_arr = clone(timewinobservees_ext);
		
		for (var i = namobservees_arr.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			
			var namobservees_temp = namobservees_arr[i];
			namobservees_arr[i] = namobservees_arr[j];
			namobservees_arr[j] = namobservees_temp;
			
			var picobservees_temp = picobservees_arr[i];
			picobservees_arr[i] = picobservees_arr[j];
			picobservees_arr[j] = picobservees_temp;
			
			var behobservees_temp = behobservees_arr[i];
			behobservees_arr[i] = behobservees_arr[j];
			behobservees_arr[j] = behobservees_temp;
			
			var timewinobservees_temp = timewinobservees_arr[i];
			timewinobservees_arr[i] = timewinobservees_arr[j];
			timewinobservees_arr[j] = timewinobservees_temp;
		}


	}





/* GENERATE OBSERVEE BEHAVIOR */

/* ONCE BEHAVIOR IS CHOSEN PHASE SHOULD BE TAKEN INTO ACCOUNT, SELECT PORTION OF TRIALS FROM THAT BEHAVIOR SEQUENCE XXX*/
	/* XXX WARNING: THIS IS GENERATED EVEN FOR ONLYAC BLOCKS, WHERE NO OBSERVEE BEHAVIOR IS PRESENTED. OK WHEN ONLY ONE TYPE OF BEHAVIOR (RANDOM) EXISTS, BUT CHANGE WHEN DIFFERENT OBSERVEES ARE PRESENTED AND WANTING A CLEAN FACTORIAL DESIGN*/

		var choobservees_arr = [];

		for(var i=0; i<behobservees_arr.length; i++) {	

			if (behobservees_arr[i] == 'random'){
		
				choobservees_arr[i] = array01s(numtrials_obs); /*create array of shuffled 0s and 1s for simulated observee to choose randomly. 0 = arm A, 1 = arm B */
		
			} else if (behobservees_arr[i] == 'thompson'){
		
				choobservees_arr[i] = array01s(numtrials_obs); /*create array of shuffled 0s and 1s for simulated observee to choose randomly. 0 = arm A, 1 = arm B */
		
			}	else if (behobservees_arr[i] == 'egreedy'){
			
				choobservees_arr[i] = array01s(numtrials_obs); /*create array of shuffled 0s and 1s for simulated observee to choose randomly. 0 = arm A, 1 = arm B */

			}
		}


/* CROSS OBSERVEE CHOICE ARRAY AND REWARD ARRAY TO DETERMINE WHETHER OBSERVEE'S CHOICE IS REWARDED ON EACH TRIAL */
		
		var rewchoobs_arr = [];
				
		for(var i=0; i<numblocks_aimed; i++) { 
			
				var currewchoobs = [];
			
			for(var j=0; j<numtrials_obs; j++) {
				if(choobservees_arr[i][j]==0){ /* choice is arm A */		
					if(rewarr_obs_armA[i][j] == 1){ /* arm A is rewarded */
						currewchoobs[j] = 1;
					} else { /* arm A is not rewarded */
						currewchoobs[j] = 0;
					}						
				} else { /* choice is arm B */
					if(rewarr_obs_armB[i][j] == 1){ /* arm A is rewarded */
						currewchoobs[j] = 1;
					} else { /* arm A is not rewarded */
						currewchoobs[j] = 0;
					}		
				}		 
			}
			
			rewchoobs_arr[i] =	currewchoobs;		
		}
		
		
/* GENERATE STIMULI FOR INSTRUCTIONS */
		
		var instr_deckpos = cointoss(); /* if 0, in the instructions left deck is blue and right deck is pink; if 1, left is pink and right is blue */
		var instr_ordhitmiss = cointoss(); /* if 0, in the instructions rewarded card will be presented before non-rewarded; if 1, non-rewarded before rewarded */
		var instr_robbiecho1 = cointoss(); /* if 0, in the instructions Robbie will choose left in the first example; if 1, he will choose right */
		var instr_robbiecho2 = cointoss(); /* if 0, in the instructions Robbie will choose left in the second example; if 1, he will choose right */
		var instr_robbieordhitmiss = cointoss(); /* if 0, in the instructions Robbie will first draw rewarded card, then non-rewarded; if 1, non-rewarded then rewarded */
		

/* GENERATE STIMULI FOR PRACTICE BLOCK */
		prob_armA_prac = 0.65;
		prob_armB_prac = 0.25; /* choosing lowest prob so it is easier for this first block to tell which arm is better */
		namobservee_prac = "Robbie";
		picobservee_prac = "head_robbie_back";
		locarmAarr_prac = cointoss(); /* if 0, in the practice block arm A is on the left; if 1, on the right */
		colarmAarr_prac = cointoss(); /* if 0, in the practice block arm A is blue; if 1, pink */ 		
		condtype_arr_prac = 0;
		choobservees_arr_prac = array01s(numtrials_obs);
		
		if (locarmAarr_prac == 0){ /* arm A on left */	
			if (colarmAarr_prac == 0){ /* arm A is blue */
				scalecols_prac = 0; /* left part of scale is blue, right is pink */
			} else { /* arm A is pink */
				scalecols_prac = 1; /* left part of scale is pink, right is blue */
			}	
		} else { /* arm A on right */	
			if (colarmAarr_prac == 0){ /* arm A is blue */
				scalecols_prac = 1; /* left part of scale is pink, right is blue */
			} else { /* arm A is pink */
				scalecols_prac = 0; /* left part of scale is blue, right is pink */
			}		
		}
		
		
		rewarr_obs_armA_prac = BernoulliArray(prob_armA_prac, numtrials_obs);
		rewarr_obs_armB_prac = BernoulliArray(prob_armB_prac, numtrials_obs);
		rewarr_ac_armA_prac = BernoulliArray(prob_armA_prac, numtrials_ac);
		rewarr_ac_armB_prac = BernoulliArray(prob_armB_prac, numtrials_ac);
		
		
		rewchoobs_arr_prac = [];
		
		for(var j=0; j<numtrials_obs; j++) {
		if(choobservees_arr_prac[j]==0){ /* choice is arm A */		
			if(rewarr_obs_armA_prac[j] == 1){ /* arm A is rewarded */
				rewchoobs_arr_prac[j] = 1;
			} else { /* arm A is not rewarded */
				rewchoobs_arr_prac[j] = 0;
			}						
		} else { /* choice is arm B */
			if(rewarr_obs_armB_prac[j] == 1){ /* arm A is rewarded */
				rewchoobs_arr_prac[j] = 1;
			} else { /* arm A is not rewarded */
				rewchoobs_arr_prac[j] = 0;
			}		
		}
	}
	
	rewarr_obs_armleft_prac =  createlocarray(fillArray(locarmAarr_prac,numtrials_obs), rewarr_obs_armA_prac, rewarr_obs_armB_prac, "left") ;/* for observation trials, array telling us whether left arm will hold reward on each trial */
	rewarr_obs_armright_prac =  createlocarray(fillArray(locarmAarr_prac,numtrials_obs), rewarr_obs_armA_prac, rewarr_obs_armB_prac, "right") ;/* for observation trials, array telling us whether left arm will hold reward on each trial */
	rewarr_ac_armleft_prac =  createlocarray(fillArray(locarmAarr_prac,numtrials_ac), rewarr_ac_armA_prac, rewarr_ac_armB_prac, "left") ;/* for observation trials, array telling us whether left arm will hold reward on each trial */
	rewarr_ac_armright_prac =  createlocarray(fillArray(locarmAarr_prac,numtrials_ac), rewarr_ac_armA_prac, rewarr_ac_armB_prac, "right") ;/* for observation trials, array telling us whether left arm will hold reward on each trial */
	

		
	rattri_obs_prac = [0,0,0,1,0,0,0,1,0,0]; /* in this practice block, we will simply present rating after each 4 trials */
	rattri_ac_prac = [0,1,0,0,0,1,0,0,0,1];	
			
/* PRELOAD CHUNKS OF TEXT THAT ARE USED REPEATEDLY */
		
		text_instr_presstocontinue = "<p>Press the <strong>space bar</strong> to carry on with the instructions.</p>";		