
'use strict';
var videoPlayer = window.videoPlayer || {};
(function (o) {
  var types = { mp4: 'video/mp4', webm: 'video/webm', m3u: 'application/x-mpegURL' };
  var vPlaylist = [
  // {sources: [{src: baseUrl+'1.mp4', type: types.mp4}]},
  // {sources: [{src: baseUrl+'2.mp4', type: types.mp4}]},
  // {sources: [{src: baseUrl+'3.mp4', type: types.mp4}]},
  // {sources: [{src: baseUrl+'4.mp4', type: types.mp4}]}
  // ,   
  { sources: [{
      src: 'https://raw.githubusercontent.com/ipstreet312/freeiptv/master/ressources/tvipt/sh/tvi.m3u8',
      type: 'application/x-mpegURL' }],

    textTracks: [{

      label: 'tvi' }],
poster: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Log%C3%B3tipo_TVI.png' 
  },{
sources: [{
      src: 'https://video-auth5.iol.pt/live_tvi_reality/live_tvi_reality/edge_servers/tvireality-720_passthrough/chunks.m3u8?sessionid=95472755',
      type: 'application/x-mpegURL' }],

    textTracks: [{
      label: 'tvi reality' }],
poster: 'https://www.atelevisao.com/wp-content/uploads/2016/02/TVI_reality2.jpg' 
  },{
sources: [{
      src: 'https://video-auth2.iol.pt/live_tvi_ficcao/live_tvi_ficcao/edge_servers/tvificcao-720p/chunks.m3u8?sessionid=739049012',
      type: 'application/x-mpegURL' }],

    textTracks: [{
      label: 'tvi ficcao' }],
poster: 'https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/616562540cf279ce41ddfe4f/' 
  },{
    
sources: [{
      src: 'https://d1zx6l1dn8vaj5.cloudfront.net/out/v1/b89cc37caa6d418eb423cf092a2ef970/index.m3u8',
      type: 'application/x-mpegURL' }],

    textTracks: [{
      label: 'sic' }],
 poster: 'https://www.atelevisao.com/wp-content/uploads/2024/01/sic-logotipo-1.jpg' 
  },{
sources: [{
src: 'https://raw.githubusercontent.com/ipstreet312/freeiptv/master/ressources/tvipt/sh/cnnpt.m3u8',
type: 'application/x-mpegURL'
}],
textTracks: [{
label: 'cnn'
}],
poster: 'https://www.iol.pt/multimedia/oratvi/multimedia/imagem/id/655f44cbd34e65afa2f7e249/1024'
},{
sources: [{
      src: 'https://d277k9d1h9dro4.cloudfront.net/out/v1/293e7c3464824cbd8818ab8e49dc5fe9/index_4.m3u8',
      type: 'application/x-mpegURL' }],
textTracks: [{
label: 'sic noticias' }],
poster: 'https://cdn.bndlyr.com/nb1nraet4m/_assets/sic-internacional-noticias.jpg' }];

  // [{ ... }, ... ]
  var rate = 1; // playback rate
  var options = {
    autoplay: false,
    controls: true,
    muted: false,
    fluid: true,
    playbackRates: [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5],
    inactivityTimeout: 0 // 0 indicates that the user will never be considered inactive.
  };
  var player = videojs('playerOne', options);
  player.ready(function () {
    // videojs.log('Ready Player One');
    this.playlist(vPlaylist);
    this.playlist.autoadvance(0);
    this.playlist.repeat(true); // Allow skipping back to first video in playlist.
  });
  // player.on(['duringplaylistchange','playlistchange','beforeplaylistitem', 'playlistitem','playlistsorted'], function(e) { videojs.log(e.type); });
  player.on('beforeplaylistitem', function () {rate = this.playbackRate();});
  player.on('playlistitem', function () {this.playbackRate(rate);});
  // var buttonComponent = videojs.getComponent('Button');
  // var buttons = ['vprevious','vnext'];
  // var buttonObj; 
  // for (var i=0; i < buttons.length; i++) {
  // var button = buttons[i];
  // buttonObj = videojs.extend(buttonComponent, {   
  // constructor: function() {
  // buttonComponent.apply(this, arguments);
  // this.addClass('icon-' +button);
  // this.controlText(button);
  // },
  // handleClick: function(e) {
  // switch(button) {
  // case 'vprevious': player.playlist.previous(); console.log(button); break;
  // case 'vnext': player.playlist.next(); console.log(button);  break;
  // }
  // }
  // });
  // videojs.registerComponent(button,buttonObj);
  // }
  // player.getChild('controlBar').addChild('vprevious', {},0);
  // player.getChild('controlBar').addChild('vnext',{},2);
  var buttonComponent = videojs.getComponent('Button');
  var prevButton = videojs.extend(buttonComponent, {
    constructor: function () {
      buttonComponent.apply(this, arguments);
      this.addClass('vjs-icon-previous-item');
      this.controlText('Previous');
    },
    handleClick: function (e) {
      player.playlist.previous();
    } });

  var nextButton = videojs.extend(buttonComponent, {
    constructor: function () {
      buttonComponent.apply(this, arguments);
      this.addClass('vjs-icon-next-item');
      this.controlText('Next');
    },
    handleClick: function (e) {
      player.playlist.next();
      // this.controlText('Next (part 3)');
    } });

  videojs.registerComponent('prevButton', prevButton);
  videojs.registerComponent('nextButton', nextButton);
  player.getChild('controlBar').addChild('prevButton', {}, 0);
  player.getChild('controlBar').addChild('nextButton', {}, 2);
})(videoPlayer);
