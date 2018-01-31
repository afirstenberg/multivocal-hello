const functions = require('firebase-functions');

const Config = require('multivocal/lib/config-simple')({
  Local: {
    und: {
      Response: {
        Default: [
          {
            Template: "Hello World.",
            ShouldClose: true
          }
        ]
      }
    }
  }
});

const Multivocal = require('multivocal');
Multivocal.setConfig( Config );

exports.webhook = functions.https.onRequest( (req,res) => {
    Multivocal.process( req, res );
});
