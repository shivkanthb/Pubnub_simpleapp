Welcome to Devchat powered by Pubnub.

Instructions to run:

1. open terminal
2. npm install pubnub
3 node chat.js <channel_name> <username_1>

4. open another terminal
5. node chat.js <channel_name> <username_2>


Thats it. start chatting. 

Features :
Multiple chat room support. Open as many terminals as you want. The terminals with the matching channel_ids will be able to communicate (broadcast messages).

BY default the app uses the keys present in config.js.  You can override that by providing your own keys when you run the program.
Syntax: 
node chat.js <channel_name> <username> <publish_key> <subscribe_key>


Examples:

window 1:
node chat.js c1 shiv

window 2:
node chat.js c1 john

Now shiv and john will be able to communicate with each other.


I have lot of ideas to expand this into a full fledged dev chat system. 

Shivkanth B

shivkanthb@email.arizona.edu