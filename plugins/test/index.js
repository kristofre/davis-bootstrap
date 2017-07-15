//'use strict';

var https = require('https');
const request = require('request-promise');
//global.appMonTest = 'not changed';
//process.env.APPMONTEST = 'not channged';
var test = "ballsack";
/**
 * The DavisWeather class is the core of the plugin and an
 * instance of DavisWeather is what will be loaded into Davis
 */
class Test {

  /**
   * The main body of work is done in the constructor.
   */
  constructor(davis, options) {
    this.davis = davis;
    this.options = options;

    // This is where we declare our intents.
    this.intents = {
      // Our intent name
      test: {
        // A basic description of the intent
        usage: 'End the show',

        // Phrases that will trigger our intent. Note that they will not
        // need to be matched exactly in order for the intent to run.
        phrases: [
          'talk to me',
        ],

        // Lifecycle Events are friendly names for the steps that an intent
        // needs to take in order to run successfully. For instance, our intent
        // will need to gather data from the weather underground API, then will
        // need to respond to the user, so I have broken it up into those events.
        lifecycleEvents: [
          'gatherData',
          'respond',
        ],
      },
    };

    // Hooks give intents functionality.
    // They are called serially when an intent is run.
    // They are named using the 'intentName:lifecycleEvent'
    // Each hook is called with 2 arguments: the exchange object,
    // and a context object. The exchange object is the primary
    // interface between Davis, a user, and a plugin. The context
    // object holds any state carried over from previous exchanges.
    this.hooks = {
      'test:gatherData': (exchange, context) => {	      
	
	var appMon;
	      	var appmon_url = process.env.APPMON_URL;
	        
	      	var appmon_username = process.env.APPMON_USERNAME;
	      	var appmon_password = process.env.APPMON_PASSWORD;
	      
	      	var options = {
  			uri: 'https://dynatrace.demo.dynatrace.com:8021/rest/management/reports/create/Davis%20Test?type=XML&format=XML+Export',
  			headers: {'Authorization': 'Basic ' + new Buffer(appmon_username + ':' + appmon_password).toString('base64')},
  			rejectUnauthorized: false
	      	};

		function callback(error, response, body) {
 
    			appMon = body.toString();
	  		//console.log(appMon);
			process.env.APPMONTEST = appMon;
			//console.log(process.env.APPMONTEST);
			test = "penis";
		
	}

	request(options, callback);        
	
	//console.log('here it comes');      
	//console.log(process.env.APPMONTEST);
      },
      'test:respond': (exchange, context) => {

		//console.log(global.appMon);   
	      console.log(test);
	
	exchange
          			.response(test) // respond to the user
          			.smartEnd() // end the conversation if appropriate
          			.skipFollowUp();
	      
	      
	      
	      
	      
	      
        
        
      },
    };
  }
}

// export the plugin so it can be used
module.exports = Test;
