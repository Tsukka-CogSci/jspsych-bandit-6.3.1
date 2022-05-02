# jspsych-bandit-6.3.1

This is a jsPsych plugin for conducting experiments on multi-armed (now, only 3-armed) bandit tasks.
If you open `demo.html`, `jspsych-bandit-6.3.1.js` is loaded and the example experiment begins. It will help you understand how this plugin works.

Note that this plugin is still under construction.

## Note
- In the current version (0.7.0), only three arms can be implemented. I plan to improve this point in future updates.
- It also relys on jsPsych ver. 6.3.1 (an older version), so does not support jsPsych ver. 7.

## Parameters
- keys: the key to press when choosing each stimulus
- proc_key: the key to press when it timed out
- images: the images used as the stimuli
- rewards: the reward obtained by choosing each stimulus (pts)
- trial_duration: the duration of the stimuli being displayed (ms)
- reward_duration: the duration of the reward being displayed (ms)
- timeout_message: the message displayed when it timed out
- hidden_params: hidden parameters to be recorded for each trial

## About related works
Dr. Stojic already made a related plugin:https://github.com/hstojic/jsPsych-bandit-example

His plugin is written very generally, so it is possible to conduct a similar (maybe the same) experiment with his plugin. Yet, his work relies on a more older version of jsPsych (5.0.3) and does not works on some platform (e.g. cognition.run). Moreover, my experiment has some hidden parameters, so I needed to record these parameters.

For these reasons, I created the current plugin independently.
