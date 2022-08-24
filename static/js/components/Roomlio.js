import React from 'react';

export default class Roomlio extends React.Component {
  async componentDidMount() {
    if (!window.rmlLoaded) {
      window.rmlLoaded = true;
      window.rmlCalls = {};

      // Cannot be a ES6 arrow function.
      window.rml = function() {
        let ri = arguments[1].roomElementID;
        if (!window.rmlCalls[ri]) window.rmlCalls[ri] = [];
        window.rmlCalls[ri].push(arguments);
      };

      let s = document.createElement('script');
      s.setAttribute('async', 'async');
      s.setAttribute('src', 'https://embed.roomlio.com/embed.js');
      document.body.appendChild(s);
    }

    window.rml('config', {
      options: {
        // embedPosition: 'bottomLeft',
        embedPosition: this.props.isMobile ? 'bottomRight' : 'dockRight',
        collapsedMode: 'chip',
        collapsedModeOnlineLabel: 'Chat',
        collapsedModeOfflineLabel: 'Chat',
        greetingMessageUsername: 'Chat',
        greetingMessage: 'Welcome Degen :wave:',
        autoExpand: false,
        startHidden: false,
        chatLayout: 'sideBySide', // 'stacked' or 'sideBySide'
        showRoomMemberList: true, // defaults to true, false will hide the chip and sidebar showing users in a room
        styles: { 
          // collapsed mode styles (do not apply when embedPosition equals 'inline')
          '--rml-collapsed-background-color': '#e8b341',
          '--rml-collapsed-background-color-hover': '#e4b040',
          '--rml-collapsed-background-color-active': '#ce9a34',
          '--rml-collapsed-text-color': 'rgb(255, 255, 255)',
        },
      },
      widgetID: 'wgt_cbqkak8t91us00c3e5s0',
      pk: 'sPaLRuDCO34QcdahX1EZ0Bs1GiL3mzT2o-hcJJRuc0Gv',
      // Replace with the ID of the room-containing element.
      roomElementID: 'rml-room-1'
    });

    // Change userID, displayName, first and last to your user's ones
    // Change roomKey and roomName to your own ones
    window.rml('register', {
      options: {
        userID: `${this.props?.walletId?.slice(0,8)}`,
        displayName: this.props.nickname?.slice(0,50).replace(/[^a-zA-Z0-9 ]/g, ""),
        roomKey: 'lobby',
        roomName: 'lobby',
      },
      // Replace with the ID of the room-containing element.
      roomElementID: 'rml-room-1',
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div
        id="rml-room-1"
        data-rml-room
        data-rml-version="09.mar.2020"
      ></div>
    );
  }
}

