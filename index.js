/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/** Rachit Technology
 * This sample demonstrates a simple Tables Skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "TODO";  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Times Tables',
            HELP_MESSAGE: 'You can say give me table for number,... which table do you want me to recite for you ?',
            HELP_REPROMPT: 'What can I help you with?',
            TABLES_WELCOME: "Which table do you want me to recite for you ?",
            TABLES_REPEAT: "Say yes if you want to try another table, say No to exit or say Repeat to repeat current table again",
            STOP_MESSAGE: 'Thanks for using Times Tables, Goodbye!',
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Times Tables',
            HELP_MESSAGE: 'You can say give me table for number,... which table do you want me to recite for you ?',
            HELP_REPROMPT: 'What can I help you with?',
            TABLES_WELCOME: "Which table do you want me to recite for you ?",
            TABLES_REPEAT: "Say yes if you want to try another table, say No to exit or say Repeat to repeat current table again",
            STOP_MESSAGE: 'Thanks for using Times Tables, Goodbye!',
        },
    },
    'en-GB': {
        translation: {
            SKILL_NAME: 'Times Tables',
            HELP_MESSAGE: 'You can say give me table for number,... which table do you want me to recite for you ?',
            HELP_REPROMPT: 'What can I help you with?',
            TABLES_WELCOME: "Which table do you want me to recite for you ?",
            TABLES_REPEAT: "Say yes if you want to try another table, say No to exit or say Repeat to repeat current table again",
            STOP_MESSAGE: 'Thanks for using Times Tables, Goodbye!',
        },
    },
    'de': {
        translation: {
            SKILL_NAME: 'Times Tables',
            HELP_MESSAGE: 'You can say give me table for number,... which table do you want me to recite for you ?',
            HELP_REPROMPT: 'What can I help you with?',
            TABLES_WELCOME: "Which table do you want me to recite for you ?",
            TABLES_REPEAT: "Say yes if you want to try another table, or say Repeat to repeat current table again",
            STOP_MESSAGE: 'Thanks for using Times Tables, Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function() {
        console.log("Inside Unhandled:" + this.t('HELP_MESSAGE'));
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'));
    },
    "AMAZON.RepeatIntent": function() {
        console.log("Inside Repeat:");
         var tmp1 = this.attributes['tables'];
        if (tmp1) {
            if (tmp1 && isInt(tmp1)) {
                console.log("Table is" + tmp1);
                var finalresult = timestable(tmp1);
                this.emit(':ask', "Table of " + tmp1 + " is , <break time=\"1s\"/>" + finalresult + "<break time=\"0.5s\"/>" + this.t('TABLES_REPEAT'), this.t('TABLES_WELCOME'));
            }
            else {
                //this.response.listen("Sorry didn't find any word, Say yes if you want to try another word, say No to try other category");
                //this.emit(':responseReady');
                this.emit(':ask', this.t('TABLES_WELCOME'), this.t('TABLES_WELCOME'));
            }
        }
        else {
            //this.response.listen("Sorry didn't find any word, Say yes if you want to try another word, say No to try other category");
            //this.emit(':responseReady');
            this.emit(':ask', this.t('HELP_REPROMPT'), this.t('HELP_REPROMPT'));
        }
    },
    "AMAZON.NoIntent": function() {
        const speechOutput = this.t('STOP_MESSAGE');
        const reprompt = this.t('STOP_MESSAGE');
        this.emit(':tell', speechOutput, reprompt);
    },
    "AMAZON.YesIntent": function() {
        console.log("Inside Tables_Yes:");
        this.emit(':ask', this.t('TABLES_WELCOME'), this.t('TABLES_WELCOME'));
    },'GetTables': function(intent, session, response) {
        console.log("Inside GetTables:" + this.t('HELP_MESSAGE'));
        var tmp = this.event.request.intent.slots.TablesNumber.value;
        if (tmp && isInt(tmp)) {
            this.attributes['tables'] = tmp;
            var finalresult = timestable(tmp);
            this.emit(':ask', "Table of " + tmp + " is , <break time=\"1s\"/>" + finalresult + "<break time=\"0.5s\"/>" + this.t('TABLES_REPEAT'), this.t('TABLES_WELCOME'));
        }
        else {
            this.emit(':ask', this.t('TABLES_WELCOME'), this.t('TABLES_WELCOME'));
        }

    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function timestable(tablenumber) {
    //get number and simplly loop from 1 to 10 adding delay and 
    var number = "";
    for (var n = 1; n <= 10; n++) {
        var mult = tablenumber * n;
        var tmp = tablenumber + " multiples by " + n + " is equals to " + mult;
        number = number + tmp + "<break time=\"0.4s\"/>";
    }
    return number;

}

function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
