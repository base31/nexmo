var express = require('express');
var router = express.Router();

/* GET ncco objects */
router.get('/', function(req, res, next) {
    var KLMIndex = {
        message: 'KLM Index'
    };

    res.json(KLMIndex);
});

router.get('/externalScript', function(request, response, next) {
    console.log("request.method    :", JSON.stringify(request.method))
    console.log("request.query : ", JSON.stringify(request.query))
    console.log("request.body : ", JSON.stringify(request.body))
    response.set("content-type", "text/xml");
    if (request.query.exiting !== "true" && request.query.sip_from_uri) {
        /**
         * Handle calls from SIP here.
         *
         * Just pass the call to the PSTN
         */

        var from_number = request.query.destination_number.split('_')[0];
        var destination_number = request.query.destination_number.split('_')[1];

        let xml =
            "<document>\n" +
            " <work>\n" +
            "   <dial caller-id-number='" + from_number + "'>\n" +
            "     <number>" + destination_number + "</number>\n" +
            "   </dial>\n" +
            "   <hangup/>\n" +
            " </work>\n" +
            "</document>\n";

        response.send(xml);
        return;
    }

    if (request.query.exiting !== "true" && !request.query.sip_from_uri) {
        /**
         * Handle calls from the PSTN here..
         *
         * Say hello then hangup
         */
        let xml =
            "<document>\n" +
            " <work>\n" +
            "   <answer />\n" +
            "   <wait>2</wait>\n" +
            "   <speak>Hello there, we are trying to connect you</speak>\n" +
            "   <dial>\n" +
            "     <sipaccount>KLM-demo1</sipaccount>\n" +
            "   </dial>\n" +
            "   <hangup/>\n" +
            " </work>\n" +
            "</document>\n";

        response.send(xml);
        return;
    }

    response.status(200);
    response.send("");
});


module.exports = router;