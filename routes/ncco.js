var express = require('express');
var router = express.Router();

/* GET ncco objects */
router.get('/', function(req, res, next) {
    var ncco = {
      message: 'NCCO Index'
    };

    res.json(ncco);
});

router.get('/answer', function(req, res, next) {
    var actionTalk = {
        action: "talk",
        text: "You are joining a conference that was created using CUBES Voice API."
    };

    var actionConversation = {
        action: "conversation",
        name: "nexmo-conference"
    };

    var ncco = [];
    ncco.push(actionTalk);
    ncco.push(actionConversation);

    res.json(ncco);
});

router.post('/call-events', function(req, res) {
    console.log('received nexmo event: \n' + JSON.stringify(req.body, null, 4));
    res.send('OK');
});

module.exports = router;