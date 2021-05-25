/**
* jspsych-confscale-continuous
* David Aguilar-Lleyda
*
* plugin for displaying a continuous confidence scale and getting a click response
*
* documentation: docs.jspsych.org
*
**/

jsPsych.plugins["confscale-continuous"] = (function() {

	var plugin = {};

	plugin.info = {
		name: 'confscale-continuous',
		description: '',
		parameters: {
			stimulus: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: 'Stimulus',
				default: undefined,
				description: 'The HTML string to be displayed'
			},
			scale_html: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Scale HTML',
				default: "scale_div"
				array: true,
				description: 'Name of div CSS style for the scale. Can create own style.'
			},
			integer_html: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Integer HTML',
				default: "integer_div'"
				array: true,
				description: 'Name of div CSS style for the message telling participants the integer corresponding to their mouse position. Can create own style.'
			},
			prompt: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Prompt',
				default: null,
				description: 'Any content here will be displayed under the button.'
			},
			scale_mapping: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Scale mapping',
				default: null,
				description: 'Integer specifying mapping of scale, if colors have to be reversed depending on block or trial.'
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
			margin_vertical: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Margin vertical',
				default: '0px',
				description: 'The vertical margin of the button.'
			},
			margin_horizontal: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Margin horizontal',
				default: '8px',
				description: 'The horizontal margin of the button.'
			},
			response_ends_trial: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: 'Response ends trial',
				default: true,
				description: 'If true, then trial will end when user responds.'
			},
		}
	}

	plugin.trial = function(display_element, trial) {

		// stimulus (div) IDs
		var scale_div = '<div class='+ trial.scale_html +'></div>'; // assign scale_html to scale_div variable
		var integer_div = '<div class='+ trial.integer_html +'></div>'; // assign integer_html to integer_div variable
	  
		// inner functions 
		function showCoords(event) {
	
			var divbounds = event.target.getBoundingClientRect(); /* div bounds */
	
			var x = event.clientX - divbounds.left; /* x position relative to div left bound */
			var y = event.clientY - divbounds.top; /* y position relative to div top bound */
  
			var x_transf = Math.floor((x) / 5);
  
			if (x_transf < 50) { 
				var x_transf2 = Math.abs(x_transf - 50) + 50;	
			} else {
				var x_transf2 = x_transf;
			}
  
  
			var coor = integer_div + x_transf2 + ' % CONFIDENT </div>';
			document.getElementById("scale_element").innerHTML = coor;
   
		}

		function clearCoor() {
			document.getElementById("scale_element").innerHTML = "";
		}
		
		
		
		
		function setMousePosition(event) {
			var x = event.clientX;
			var y = event.clientY;
			var coor = integer_div + x + ' % CONFIDENT </div>';
			document.getElementById('scale_element').innerHTML = coor;
		}
		
		// show stimulus	
		var html_content = scale_div;
		html_content += integer_div;
		html_content += '<p id="scale_element"></p>';
		
		//var html_content = ;'document.getElementById("scale_div").addEventListener("mousemove", function(event) {showCoords(event)})';
		//var html_content = '<div class="scale_div" onmousemove="showCoords(event)" onmouseout="clearCoor()"></div>';
		//html_content += '<p id="scale_element"></p>';
		
		display_element.innerHTML = html_content;	  
	  

		display_element.querySelector('.scale_div').addEventListener("mousemove", setMousePosition(event)); /* once this works with setMousePosition, try with showCoords */






		// function to end trial when it is time
		function end_trial() {
	
			// kill any remaining setTimeout handlers
			jsPsych.pluginAPI.clearAllTimeouts();
	
			// gather the data to store for the trial
			var trial_data = {
				"rt": 100,
				"button_pressed": 1
			};

			// clear the display
			display_element.innerHTML = '';

			// move on to the next trial
			jsPsych.finishTrial(trial_data);
		};

		// hide image if timing is set
		// if (trial.stimulus_duration !== null) {
			// 	jsPsych.pluginAPI.setTimeout(function() {
				// 		display_element.querySelector('#jspsych-confscale-continuous-stimulus').style.visibility = 'hidden';
				// 	}, trial.stimulus_duration);
				// }

				// end trial if time limit is set
				// if (trial.trial_duration !== null) {
					// 	jsPsych.pluginAPI.setTimeout(function() {
						// 		end_trial();
						// 	}, trial.trial_duration);
						// }

					};

					return plugin;
				})();
