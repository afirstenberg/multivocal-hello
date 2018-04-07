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

//new Multivocal.Config.Firebase();
//new Multivocal.Config.Firestore();

exports.webhook = Multivocal.processFirebaseWebhook;
