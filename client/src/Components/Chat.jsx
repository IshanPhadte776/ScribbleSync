import React from 'react'

class Chat extends React.Component {
  componentDidMount() {
    (function(d, m){
      var kommunicateSettings = {"appId":"1b6f36f18d5fc96de51b398a91527a126","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
  }

  render() {
    return (
      <div> </div>
    )
  }
}

export default Chat
