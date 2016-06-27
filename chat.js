//load config file
var config = require("./config.js");
var args = process.argv.slice(2);
var channel = args[0];
var username = args[1];

var p_key = args[2];
var s_key = args[3];

var publishKey = (p_key==undefined) ? config.publish_key:p_key;
var subscribeKey = (s_key==undefined) ? config.subscribe_key:s_key;


var pubnub = require("pubnub").init({
    publish_key   : publishKey,
    subscribe_key : subscribeKey
});

var sender;
var msgtype = "chat";

pubnub.here_now({
    channel : channel,
    callback : function(m){
        console.log("current number of users: ",m.occupancy+"\n");
    }
});

/* ---------------------------------------------------------------------------
Listen for Messages
--------------------------------------------------------------------------- */
pubnub.subscribe({
    channel  : channel,
    callback : function(message) {
        if(message.sender && message.sender!=sender)
        {
            var sendername = (message.uname) ? message.uname:message.sender;
            console.log("\033[0;31m"+sendername+" : \033[0m", message.message);
        }           
    }
});

/* ---------------------------------------------------------------------------
Publish Messages
--------------------------------------------------------------------------- */
var sender;
var message = { "some" : "data" };
pubnub.publish({
    channel   : channel,
    message   : message,
    callback  : function(e) { sender = e[2];},
    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
});

/* ---------------------------------------------------------------------------
Type Console Message
--------------------------------------------------------------------------- */
var stdin = process.openStdin();
stdin.on( 'data', function(chunk) {
    console.log();
    pubnub.publish({
        channel : channel,
        message : {
	    message: ''+chunk,
	    sender: sender,
        uname: username,
        type : msgtype
	}
    });
});

// on Ctrl+C 

process.on('SIGINT', function(){
    pubnub.unsubscribe({
    channel : channel,
    });
    process.stdout.write('\nEnd of Dev Chat!  \n');
    process.exit();
});