var debugTEXTAnalysis = true;

// Imports the Google Cloud client library
const language = require('@google-cloud/language');
//var idug = require('idug'), tlid = require('tlid');

// Instantiates a client
const gcpLanguageClient = new language.LanguageServiceClient();

const client = new language.LanguageServiceClient();


var oin = new Object();
oin.ChatLine = "@v A fantastic user interface and back-end service called struckthor.";
oin.Category = "What are the entities in here?";

var json = JSON.stringify(oin);

/** Get   of a string
 *
 * @param {*} _text
 * @param {*} _srcObject
 * @param {*} callback
 */
async function get_entities__181229(text) {

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };


    // Detects entities in the document
    const [result] = await client.analyzeEntities({ document });
    const entities = result.entities;

    entities.forEach(entity => {
        console.log(entity.name);
        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    });

    return entities;
}
var text = oin.ChatLine + " " + oin.Category;

//get_entities__181229(text);




function get__syntax(text, callback) {
    // Prepares a document, representing a text file in Cloud Storage

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects syntax in the document
    client
        .analyzeSyntax({ document: document })
        .then(results => {
            const syntax = results[0];

            console.log('Parts of speech:');
            syntax.tokens.forEach(part => {
                console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
                console.log(`Morphology:`, part.partOfSpeech);


            });
            callback(syntax);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

text = "Node.js is a fantastic framework";
console.log(text + "--------------------------");
//get__syntax(text);


function get__sentiment(text, callback) {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    // Detects the sentiment of the text
    client
        .analyzeSentiment({ document: document })
        .then(results => {
            const sentiment = results[0].documentSentiment;

            console.log(`Text: ${text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

            if (callback)
                callback(sentiment);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

get__sentiment(text);
// String.prototype.replaceAll = function (search, replacement) {
//   var target = this;
//   return target.replace(new RegExp(search, "g"), replacement);
// };

/** Get sentiment of a string
 *
 * @param {*} _text
 * @param {*} _srcObject
 * @param {*} callback
 */
function get_sentiment_1812071125(_text, _srcObject, callback) {
    var o = new Object();
    var srcObject = JSON.parse(_srcObject);

    var text = "";

    o.sourceobject = srcObject;
    if (_text == null)
        text = srcObject.ChatLine + " " + srcObject.Category;

    o.text = text;

    o.tlid = tlid.get();
    o.idug = idug.get();
    o.tlidug = o.tlid + o.idug;
    // tlidug.get();

    o.title = wipe_html_tag(srcObject.Category);

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    gcpLanguageClient
        .analyzeSentiment({ document: document })
        .then(results => {
            const sentiment = results[0].documentSentiment;

            if (debugTEXTAnalysis)
                console.log("RESULT: " + JSON.stringify(sentiment));

            //console.log(`analyzeSentiment::Text: ${text}`);
            if (debugTEXTAnalysis)
                console.log(`Sentiment score: ${sentiment.score}`);

            o.sentiment = JSON.stringify(sentiment);

            if (debugTEXTAnalysis)
                console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
            o.magnitude = sentiment.magnitude;
            o.score = sentiment.score;
            //  o.text = text;
            if (debugTEXTAnalysis)
                console.log(JSON.stringify(o));

            callback(o);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

}
