const riot = require('matrix-js-sdk');
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
  
  const args = event.event.content.body.slice('^'.length).split(' ');
  
  if(event.event.content.body.startsWith('^ping')) {
    client.sendEvent(room.roomId, 'm.room.message', { 'body': 'Pong!', 'msgtype': 'm.text'}, '', (err, res) => { });
  } else if(event.event.content.body.startsWith('^arguments')) {
    client.sendEvent(room.roomId, 'm.room.message', { 'body': args.split(1).join(','), 'msgtype': 'm.text'}, '', (err, res) => { });
  }
});
client.startClient();
