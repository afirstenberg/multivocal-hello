# multivocal-hello
"Hello World" sample for the [Multivocal library](https://github.com/afirstenberg/multivocal)

## Overview

The code is roughly broken into three parts:

1.  Load the Multivocal library.

2.  Build our configuration.  
   
    We'll use a simple configuration object that takes the JSON for the configuration.
   
    We need to define the _Action.multivocal.welcome_ response, 
    and we'll define it for the _undefined_
    locale. This response says that for any incoming request that is for
    the Action with the name `multivocal.welcome`, format the Template with
    this text to use as our message.
    Furthermore, after we send this message, we should close the conversation.
   
    The `multivocal.welcome` Action is one that is provided by the standard
    Intents, and is called when the conversation begins.
    
    Building the configuration automatically adds it to Multivocal's
    configuration.
    
    We also have two lines commented out that read additional configuration
    from a Firebase db or a Firestore db.
    
3.  Register the function to be called when a request comes in from Dialogflow
    and have multivocal process it.
    
    In this case, we're using the Firebase webhook processor to process
    from Firebase Cloud Functions, but there are also processors for 
    Google Cloud Functions (which are slightly different), an Express
    function, or if you're using AWS Lambda.
    
## How to install

These instructions seem long, but they're pretty much the same steps
that you would do for any Actions-on-Google / Dialogflow project, no
matter if you were using Multivocal or not.

1.  Clone or otherwise download this package with a command line such as

    `git clone https://github.com/afirstenberg/multivocal-hello.git`
    
2.  Install libraries from the command line

    `cd multivocal-hello/functions; npm install`
    
3.  Create the Google Project you'll run this under. This will include
    the Firebase Project for Firebase Cloud Functions, the Actions on
    Google Project, and the Dialogflow Project. Google has directions
    for doing this, but in general the steps will be something like:
    
    1.  Go to https://console.firebase.google.com/ and create a new
        Firebase project.
       
    2.  Go to https://console.actions.google.com/ and import the
        same project you just created in the Firebase console.
        
    3.  Select a Dialogflow app to build, which will open the Dialogflow
        console for this project. Enter the basic configuration info
        for the project and create it.
        
4.  Configure your copy of this package to use your Firebase project
    with something like this on your command line
    
    `firebase use your-project-name`
    
5.  Deploy the function to Firebase

    `firebase deploy --only functions`
    
    You should see the URL for your function. Make note of this for
    later or you'll be able to find it again on the Firebase console.
    
6.  Load the Intents into Dialogflow.

    1.  In the Dialogflow console, select the gear next to the name
        of the project in the left navigation menu.
        
    2.  Select the "Export and Import" tab and then the "Import from Zip"
        button.
        
    3.  Load the `standard.zip` file from the
        `multivocal-hello/functions/node_modules/multivocal/dialogflow`
        folder. Enter "IMPORT" into the confirmation field to import the
        files.
        
    4.  There are no other configurations to load. If there were, you
        would load each using similar steps. (Other example projects
        may require additional Intents. This one just uses the standard
        Intents.)
    
    5.  Go back to the list of Intents and delete the "Default Fallback Intent"
        and "Default Welcome Intent".
        
7.  Configure Dialogflow to use your Firebase Cloud Function webhook.

    1.  Select "Fulfillment" from the left navigation.
    
    2.  Turn the switch to "Enabled" for the Webhook.
    
    3.  Enter the URL for your function that was given to you on the
        command line when you did the deploy. If it is missing, you can
        also find it in the Firebase Console by selecting the "Functions"
        left navigation.
        
8.  Deploy and test to the Assistant.

    1.  Select "Integrations" from the left navigation.
    
    2.  Select the "Google Assistant".
    
    3.  Click "Test" to open a new tab with the Actions Simulator.
    
    4.  Enter "talk to my test app" and it should work. You can see
        the invocation in the Firebase Cloud Functions log. You can
        also invoke it from your phone or smart speaker by talking
        to the Google Assistant and asking to talk to "my test app".
        
If you make changes to the phrase that the agent say, or when you add
more Intents and the phrases to handle them, you would just repeat
step 5.
