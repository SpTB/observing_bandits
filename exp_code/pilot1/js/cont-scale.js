/**
 * jspsych-html-cont-scale
 * a jspsych plugin for free response survey questions
 */


jsPsych.plugins['cont-scale'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'cont-scale',
    description: '',
    parameters: {
  	scale0_div_id: {
  		type: jsPsych.plugins.parameterType.STRING,
  		pretty_name: 'Scale HTML',
  		default: "scale0_div",
  		array: false,
  		description: 'Name of div CSS style for first mapping of the scale. Can create own style. The name should be between DOUBLE INVERTED COMMAS.'
  	},
  	scale1_div_id: {
  		type: jsPsych.plugins.parameterType.STRING,
  		pretty_name: 'Scale HTML',
  		default: "scale1_div",
  		array: false,
  		description: 'Name of div CSS style for second mapping of the scale. Can create own style. The name should be between DOUBLE INVERTED COMMAS.'
  	},
  	mapping: {
  		type: jsPsych.plugins.parameterType.INT,
  		pretty_name: 'Scale mapping',
  		default: 0,
  		array: false,
  		description: 'Mapping for scale (0 or 1) to decide if gradient goes from first to second color or from second to first'
  	},
  	integer_div_id: {
  		type: jsPsych.plugins.parameterType.STRING,
  		pretty_name: 'Integer HTML',
  		default: "integer_div",
  		array: false,
  		description: 'Name of div CSS style for the message telling participants the integer corresponding to their mouse position. Can create own style. The name should be between DOUBLE INVERTED COMMAS.'
  	},
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

	  if (trial.mapping == 0) { // first mapping
	  	scale_div = trial.scale0_div_id;
	  } else { // second mapping
	  	scale_div = trial.scale1_div_id;
	  }
	  
	  integer_div = trial.integer_div_id;

    //var html = '<div id="scalewrapper" style="margin: 100px 0px;">';
    var html = '<div class =' + scale_div + ' id="scalewrapper" style="margin: 100px 0px;">';
	html += '<div class =' + integer_div + ' id="integwrapper" style="margin: 100px 0px;">';
    //'onmousemove="showCoords(event)"'+
    
  //  html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + '</div>';
   // html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
    if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    }
    //html += '">';

    //input (scale)
    //html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-html-slider-response-response"></input>';
    
	//html += '<div>'
    //html += '</div>';
    html += '</div>';
    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }


    display_element.innerHTML = html;

    //select scale element
    var scale = display_element.querySelector('.' + scale_div);
  //  console.log(scale)


    scale.addEventListener('mousemove', function(event){ // mouse on scale
      var divbounds = event.target.getBoundingClientRect(); /* div bounds */
    //  console.log(divbounds)
      var x = event.clientX - divbounds.left;
      var y =  event.clientY - divbounds.top;
      var elem = event.currentTarget;
	  
	  
	  var midscale = (divbounds.left - divbounds.right) / 2;
	  
	  if (event.clientX < midscale){
	  	var x_transf = Math.floor((x) / 5)
	  } else {
		  var x_transf = Math.ceil((x) / 5)
	  }
	  

      //var x_transf = Math.floor((x) / 5);

      if (x_transf < 50) {
        var x_transf2 = Math.abs(x_transf - 50) + 50 ;
      } else {
        var x_transf2 = x_transf;
      }
	  
	  if (event.clientX < divbounds.left || event.clientX > divbounds.right) {
		  x_transf2 = 100
	  }
	  
      scale.left = x_transf < 50;
      scale.value = x_transf2;
    //  console.log(scale.value)
      var coor = '<div class=' + integer_div + ' style="color:#000000">' + x_transf2 + " % CONFIDENT </div>";
      document.getElementById("integwrapper").innerHTML = coor;

});


scale.addEventListener('mouseout', function(event){ // mouse out of scale
	document.getElementById("integwrapper").innerHTML = "";
});

    var response = {
      rt: null,
      response: null,
      left: null
    };

//
    // if(trial.require_movement){
    //   display_element.querySelector('.scale_div').addEventListener('change', function(){
    //     display_element.querySelector('#jspsych-html-slider-response-next').disabled = false;
    //   })
    // }

    //previously button resp -> now scale click
    display_element.querySelector('.' + scale_div).addEventListener('click', function() {
      // measure response time
      var endTime = performance.now();
      response.rating_rt = endTime - startTime;
      //#jspsych-html-slider-response-response
      response.rating_response = scale.value; //display_element.querySelector('.scale_div')
      response.rating_left = scale.left;
      console.log(response.rating_response);
      console.log(response.rating_left);
      console.log(response.rating_rt)

      if(trial.response_ends_trial){
        end_trial();
      } else {
        //display_element.querySelector('#jspsych-html-slider-response-next').disabled = true;
      }

    });

    //helper funcs
    // function showCoords(event) {
    //
    //   var divbounds = event.target.getBoundingClientRect(); /* div bounds */
    //
    //   var x = event.clientX - divbounds.left; /* x position relative to div left bound */
    //   var y = event.clientY - divbounds.top; /* y position relative to div top bound */
    //
    //   var x_transf = Math.floor((x) / 5);
    //
    //   if (x_transf < 50) {
    // 	  var x_transf2 = Math.abs(x_transf - 50) + 50;
    //   } else {
    //   	var x_transf2 = x_transf;
    //   }
    //   var coor = "<div class='integer_div'>" + x_transf2 + " % CONFIDENT </div>";
    //   document.getElementById("scale_element").innerHTML = coor;
    //
    // }

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rating_rt": response.rating_rt,
        "rating_response": response.rating_response,
        "rating_left": response.rating_left
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = performance.now();
  };

  return plugin;
})();
