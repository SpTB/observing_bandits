// ----
// Functions for generating stimuli
// ----

/* Clone an object */
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
	
/* Sums 1 to a number */
var plusone = function (num) {
	newnum = num + 1;
	return newnum
}

var sumvecelems = function(input){
             
 if (toString.call(input) !== "[object Array]")
    return false;
      
            var total =  0;
            for(var i=0;i<input.length;i++)
              {                  
                if(isNaN(input[i])){
                continue;
                 }
                  total += Number(input[i]);
               }
             return total;
            }

/* Flips a coin, that gives 0 or 1 with equal probability */
var cointoss = function () {
toss = Math.floor(Math.random() * 2);
return toss
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
var shuffleArray = function (array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}


/* Randomize array in-place using Durstenfeld shuffle algorithm, not replacing original array (needs clone function) */
var shuffleArray_norep = function (array) {
	var newarray = clone(array);
	for (var i = newarray.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = newarray[i];
		newarray[i] = newarray[j];
		newarray[j] = temp;
	}
	return newarray;
}

/* Fill an array of desired length with same value */
var fillArray = function(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

/* Create array of desired length with shuffled 0s and 1s */
var array01s = function (length_array) {
	(arr0 = []).length = (length_array/2); arr0.fill(0); /* fill array half the final size with 0s */
	(arr1 = []).length = (length_array/2); arr1.fill(1); /* fill array half the final size with 1s */
	var locarr = arr0.concat(arr1); /* concatenate arrays */
	shuffleArray(locarr); /* shuffle arrays. Array variable will be overwritten. Previous copy can be made with .slice(0) */
	return locarr
}

/* Create array of two values and concatenate them without shuffling */
var array2vals = function (val1,val2,length_val1,length_val2) {
	(arrval1 = []).length = (length_val1); arrval1.fill(val1); /* fill array half the final size with 0s */
	(arrval2 = []).length = (length_val2); arrval2.fill(val2); /* fill array half the final size with 1s */
	var locarr = arrval1.concat(arrval2); /* concatenate arrays */	
	/* shuffleArray(locarr); */ /* activate if wanting to shuffle arrays. Array variable will be overwritten. Previous copy can be made with .slice(0) */
	return locarr
}


/* Create array of desired length of Bernoulli samples (0s or 1s) with desired probability of getting 1 */
var BernoulliArray = function (prob, length_array) {
	
	probarr = [];
	
	for (j = 0; j < length_array; j++) {	  
		cursamp = (Math.random() < prob) ? 1 : 0;   
		probarr = probarr.concat(cursamp);
	}
	return probarr
}
	  
/* Create array of desired length of Bernoulli pseudo-randomized samples (0s or 1s), where the proportion of 1s will exactly match the specified probability  */
var PseuRanBernArray = function (prob, length_array) {
	
	var prob0 = (10 - (prob * 10)) / 10; /* probability of 0, workaround to avoid floating point number issue with decimals */
	(arr0 = []).length = (length_array * prob0); arr0.fill(0);  /* fill array with as many 0s as final array should have */
	(arr1 = []).length = (length_array * prob); arr1.fill(1); /* fill array with as many 1s as final array should have */
	var psebernarr = arr0.concat(arr1); /* concatenate arrays */
	shuffleArray(psebernarr); /*  shuffle arrays. Array variable will be overwritten. Previous copy can be made with .slice(0) */
	return psebernarr
} 


/* Sample from an array with no replacement */
var sampnorepl = function (array,nsamples) {
	/* parameters are: 
	1) array to sample from
	2) number of samples needed */
	
	initarr = clone(array);
	finarr = [];
	
	for (j = 0; j < (nsamples); j++) {	
		
		randomIndex = Math.floor(Math.random()*initarr.length); /* choose index from initial array */
		finarr = finarr.concat(initarr[randomIndex]); /* add element corresponding to index to final array */
		initarr.splice(randomIndex, 1)[0]; /* remove taken element from initial array */
	}
	return finarr;
}


/* Sample integers within a range, with min and max included */
function randomInteger(min, max, nsamples) {
	
	finarr = [];
	
	for (j = 0; j < (nsamples); j++) {
  cur_ranint = Math.floor(Math.random() * (max - min + 1)) + min;
  finarr = finarr.concat(cur_ranint); /* add current random integer final array */
}
return finarr;
}

/* Given rewards for arms A and B, and location of those arms on the screen for each trial, create array indicating on each trial whether the arm on a particular side of the screen gives reward  */
var createlocarray = function (locarray,rewarrayA,rewarrayB,side) { 
	/* parameters are: 
	1) array specifying location of arm A (0 = left, 1 = right)
	2) array specifying reward of arm A (0 = no reward, 1 = reward)
	3) same as 2), but for arm B
	4) side for which array should be generated ("left" for left side, any other thing for right side) */
	
	
	locarr = [];
	
	if (side == "left") { /* array is wanted to know reward for arm occuppying left side of the screen */
		
	for (j = 0; j < locarray.length; j++) {	
		
		if(locarray[j] == 0){ /* arm A is on the left side of the screen */
			cursamp = rewarrayA[j]; /* reward is equal to reward from arm A */
		} else { /* arm B is on the left side of the screen */
			cursamp = rewarrayB[j]; } /* reward is equal to reward from arm B */
			locarr = locarr.concat(cursamp);
		}
		
		} else { /* wanted side is right */
			
			for (j = 0; j < locarray.length; j++) {	
			if(locarray[j] == 0){ /* arm A is on the left side of the screen */
				cursamp = rewarrayB[j]; /* reward is equal to reward from arm B */
			} else { /* arm B is on the left side of the screen */
				cursamp = rewarrayA[j]; } /* reward is equal to reward from arm A */
				locarr = locarr.concat(cursamp);
			}	
		}
		  
	return locarr
}  


/* Create array where every nth element is a 1, otherwise 0  */
var nth1arr = function (length_array, nth) {
	(arr = []).length = (length_array); arr.fill(1);  /* fill array with 1s */
	
	for (j = 0; j < arr.length; j++) {	
	if ( (j +1) % nth ){ /* check if there is remainder */
		arr[j] = 0; /* if there is not, number is multiple, so change 1 to 0 */
	}}	
	return arr	
}

/* Convert native jspsych html-button-response to the response in our rating scale  */
var convratresp = function (response, rattri) {
	/*var vecresps = [-100, -90, -80, -70, -60, 50, 60, 70, 80, 90, 100];*/
	if (rattri == 1){
		/*re = response;
	return vecresps[re];*/
		return response	
} else {
	return 404
}
}

/* Determine whether rating was toward half of scale occupied by arm A  */
var wasratarmA = function (response, left, mapping, rattri) {

	if (rattri == 1){

		if (mapping == 0){ /* arm A was on the left side */
			if (left == 'true'){ /* response was on left half of scale */
				var ratA = 1;
			} else { /* response was on right half of scale */
				var ratA = 0;
			}	
		} else { /* arm B was on the left side */	
			if (left == 'true'){ /* response was on left half of scale */
				var ratA = 0;
			} else { /* response was on right half of scale */
				var ratA = 1;
			}		
		}


		/*console.log(response)
		console.log(left)
		console.log(mapping)
		console.log(ratA) */


		return ratA	
		
	} else {
		return 404
	}
}

/* Assign text to the rating scale depending on which arm has each color and occupies which half of the scale  */
var assignRatingText = function (mapping, colarmA, side) {
	/* parameters are: 
	1) value specifying which side each arm occupies on scale (0 = arm A left side, arm B right side; 1 = arm B left side, arm A right side)
	2) value specifying which deck color arm A is associated to (0 = blue, 1 = pink)
	3) which side the output of the function is desired for (0 = text for left half of the screen, 1 = text for right half of the screen) */
	
	if (side == "left") { /* left half wanted */
		
		
		if (mapping == 0) { /*arm A takes left half of the scale */
			if (colarmA == 0 ) { /*arm A deck is blue */
				return 'BLUE DECK';
			} else { /*arm A deck is pink */
				return 'PINK DECK';
			}
		} else { /*arm A takes right half of the scale */
			if (colarmA == 0 ) { /*arm A deck is blue */
				return 'PINK DECK';
			} else { /*arm A deck is pink */
				return'BLUE DECK';
			}
		}	
		
	} else { /* right side wanted */
		
		if (mapping == 0) { /*arm A takes left half of the scale */
			if (colarmA == 0 ) { /*arm A deck is blue */
				return 'PINK DECK';
			} else { /*arm A deck is pink */
				return 'BLUE DECK';
			}
		} else { /*arm A takes right half of the scale */
			if (colarmA == 0 ) { /*arm A deck is blue */
				return 'BLUE DECK';
			} else { /*arm A deck is pink */
				return'PINK DECK';
			}
		}
		
	}
	
} /* end of function */




/* Get an array and calculate absolute differences between consecutive elements */
var absdifconselems = function (arr) {
	var newA = [];
	    for (var i = 1; i < arr.length; i++)  newA.push( Math.abs(arr[i] - arr[i - 1]))
	    return newA;
}