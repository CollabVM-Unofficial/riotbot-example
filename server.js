const riot = require('matrix-js-sdk');
const webhook = require('webhook-discord'); //
const hook = new webhook.Webhook('')
const userid = '@nameofbot:matrix.org';
const accesstoken = '';
const client = riot.createClient({
  baseUrl: 'https://matrix.org',
  accessToken: accesstoken,
  userId: userid
});

client.once('sync', function(state, prevState, res) {
  if(state=='PREPARED') return console.log("I am up!");
});

client.on('Room.timeline', function(event, room, toStartOfTimeline) {
  if(event.getType()!=='m.room.message') return;
  hook.info('riot',`(${room.name}) | ${event.getSender()}: ${event.getContent().body}`)
  const args = event.event.content.body.slice('^'.length).split(' ');
  if(event.event.content.body.includes('^sendmessage')) {
    client.sendEvent(room.roomId, 'm.room.message', { 'body': 'ok sure', 'msgtype': 'm.text'}, '', (err, res) => {hook.info('riot demands', args.slice(1).join(' ')) });
  }
  switch(event.event.content.body) {
    case "bot help":
      client.sendEvent(room.roomId, 'm.room.message', { 'body': 'bot version, bot help', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      break;
    case "bot version":
      client.sendEvent(room.roomId, 'm.room.message', { 'body': '0.1 beta', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      break;
      
  }
});
client.startClient();
console.log("Bot is starting...")
//get the token by doing localStorage.getItem("mx_access_token") in the console.
