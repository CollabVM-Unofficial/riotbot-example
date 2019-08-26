const riot = require('matrix-js-sdk');
const {accesstoken,userid,prefix} = require('./config.json');

const client = riot.createClient({
  baseUrl: 'https://matrix.org',
  accessToken: accesstoken,
  userId: userid
});

client.once('sync', function(state, prevState, res) {
  if(state=='PREPARED') return console.log('I am running...');
});

client.on('Room.timeline', function(event, room, toStartOfTimeline) {
  if(event.getType()!=='m.room.message') return;
  
  const args = event.event.content.body.slice(prefix.length).split(' ');
  
  if(event.event.content.body.startsWith(prefix+'ping')) {
    client.sendEvent(room.roomId, 'm.room.message', { 'body': 'Pong!', 'msgtype': 'm.text'}, '', (err, res) => { });
  } else if(event.event.content.body.startsWith(prefix+'arguments')) {
    client.sendEvent(room.roomId, 'm.room.message', { 'body': args.split(1).join(','), 'msgtype': 'm.text'}, '', (err, res) => { });
  }
});
client.startClient();
