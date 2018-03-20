const Multivocal = require('multivocal');

new Multivocal.Config.Simple({
  Local: {
    und: {
      Response: {
        "Action.multivocal.welcome": [
          {
            Template: {
              Text: "Hello world."
            },
            ShouldClose: true
          }
        ]
      }
    }
  }
});

const functions = require('firebase-functions');
exports.webhook = functions.https.onRequest( (req,res) => {
    Multivocal.process( req, res );
});
