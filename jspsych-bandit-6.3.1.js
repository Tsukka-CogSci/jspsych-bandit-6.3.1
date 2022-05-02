/**
 * jspsych-bandit-6.3.1
 * Yuki Tsukamura
 *
 * plugin for displaying a stimulus and getting a keyboard response
 * for ver 6.3.1
 *
 **/

jsPsych.plugins["bandit"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "bandit",
    parameters: {
      key1: {
        type: jsPsych.plugins.parameterType.KEY, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 'z'
      },
      key2: {
        type: jsPsych.plugins.parameterType.KEY, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 'x'
      },
      key3: {
        type: jsPsych.plugins.parameterType.KEY, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 'c'
      },
      proc_key: {
        type: jsPsych.plugins.parameterType.KEY, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: ' '
      },
      image1: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      image2: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      image3: {
        type: jsPsych.plugins.parameterType.IMAGE,
        default: undefined
      },
      reward1: {
        type: jsPsych.plugins.parameterType.INT,
        default: 0
      },
      reward2: {
        type: jsPsych.plugins.parameterType.INT,
        default: 0
      },
      reward3: {
        type: jsPsych.plugins.parameterType.INT,
        default: 0
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        default: 1500
      },
      reward_duration: {
        type: jsPsych.plugins.parameterType.INT,
        default: 500
      },
      timeout_message: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "The response timed out. Pless the space key to continue."
      },
      hidden_param1: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      hidden_param2: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var html_str = "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 42%; left: 0; right: 0'><img src='"+trial.image1+"' id='jspsych-bandit-stim'></img><img src='"+trial.image2+"' id='jspsych-bandit-stim'></img><img src='"+trial.image3+"' id='jspsych-bandit-stim'></img></div>";

    display_element.innerHTML = html_str;

    // store response
    var response = {
      rt: null,
      key: null,
      correct: false
    };

    // end trial
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      if (typeof keyboardListener2 !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener2);
      }

      // gather the data to store for the trial
      var trial_data = {
        rt: response.rt,
        image1: trial.image1,
        image2: trial.image2,
        image3: trial.image3,
        reward1: trial.reward1,
        reward2: trial.reward2,
        reward3: trial.reward3,
        response: response.key,
        correct: response.correct,
        hidden_param1: trial.hidden_param1,
	      hidden_param2: trial.hidden_param2
      };

      // clears the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    var KeyCode1 = trial.key1;
    var KeyCode2 = trial.key2;
    var KeyCode3 = trial.key3;

    function after_response(info){
      jsPsych.pluginAPI.clearAllTimeouts();
      if (response.key == null ) {
        response = info;
      }
      if(response.key == KeyCode1){
        html_str = "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 42%; left: 0; right: 0'><img src='"+trial.image1+"' id='jspsych-bandit-stim'></img><img src='"+trial.image2+"' id='jspsych-bandit-stim' style='visibility:hidden'></img><img src='"+trial.image3+"' id='jspsych-bandit-stim' style='visibility:hidden'></img></div>";
        html_str += "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 30%; left: 0; right: 0'>you win <font size='30'>"+trial.reward1+"</font> pt</div>";
        display_element.innerHTML = html_str;
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.reward_duration);
      } else if(response.key == KeyCode2){
        html_str = "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 42%; left: 0; right: 0'><img src='"+trial.image1+"' id='jspsych-bandit-stim' style='visibility:hidden'></img><img src='"+trial.image2+"' id='jspsych-bandit-stim'></img><img src='"+trial.image3+"' id='jspsych-bandit-stim' style='visibility:hidden'></img></div>";
        html_str += "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 30%; left: 0; right: 0'>you win <font size='30'>"+trial.reward2+"</font> pt</div>";
        display_element.innerHTML = html_str;
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.reward_duration);
      } else if(response.key == KeyCode3){
        html_str = "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 42%; left: 0; right: 0'><img src='"+trial.image1+"' id='jspsych-bandit-stim' style='visibility:hidden'></img><img src='"+trial.image2+"' id='jspsych-bandit-stim' style='visibility:hidden'></img><img src='"+trial.image3+"' id='jspsych-bandit-stim'></img></div>";
        html_str += "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 30%; left: 0; right: 0'>you win <font size='30'>"+trial.reward3+"</font> pt</div>";
        display_element.innerHTML = html_str;
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.reward_duration);
      }
    }

    function no_response(){
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      html_str = "<div style='position: absolute; height: 20%; width: 100%; margin-left: auto; margin-right: auto; top: 30%; left: 0; right: 0'>"+trial.timeout_message+"</div>";
      display_element.innerHTML = html_str;
      var keyboardListener2 = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: end_trial,
        valid_responses: [' '],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }
  
    // start the response listener
    if (trial.key1 != jsPsych.NO_KEYS && trial.key2 != jsPsych.NO_KEYS && trial.key3 != jsPsych.NO_KEYS) {
      jsPsych.pluginAPI.setTimeout(function() {
        no_response();
      }, trial.trial_duration);
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key1, trial.key2, trial.key3],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

  };

  return plugin;
})();
