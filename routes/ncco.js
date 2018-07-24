var express = require('express');
var router = express.Router();

/* GET ncco objects */
router.get('/', function(req, res, next) {
    var ncco = {
      message: 'Nexmo NCCO Index'
    };

    res.json(ncco);
});

router.get('/answer', function(req, res, next) {
    var actionTalk = {
        action: "talk",
        text: "You are joining a conference that was created using CUBE's Voice API."
    };

    var actionStream ={
        action: "stream",
        streamUrl: [
            "https://nexmo-community.github.io/ncco-examples/assets/voice_api_audio_streaming.mp3"
        ]
    }

    var actionConversation = {
        action: "conversation",
        name: "conversation-"+req.query.conference_id,
        startOnEnter: "false",
        musicOnHoldUrl: ["https://nexmo-community.github.io/ncco-examples/assets/phone-ringing.mp3"]
    };

    var ncco = [];
    ncco.push(actionTalk);
    //ncco.push(actionStream);

    res.json(ncco);
});

router.post('/call-events', function(req, res) {
    console.log('received nexmo event: \n' + JSON.stringify(req.body, null, 4));
    res.send('OK');
});

module.exports = router;