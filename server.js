import express from 'express'
import gTTS from 'gtts'

var app = express()

var PORT = 3000

app.use('/file/tts/', express.static('output/tts/'))

app.get('/', function(req, res) {
    res.status(200).send('Hello World!');
})

app.get('/tts/:text/:lang', async function(req, res) {
    try{
        var name = randomName(10) + '.mp3'
        var gtts = new gTTS(req.params.text, req.params.lang)
        gtts.save('./output/tts/' + name, function (err, result) {
            if(err) { throw new Error(err) }
            console.log('Text to speech conversion is successful');
            res.status(200).redirect('http://localhost:' + PORT + '/file/tts/' + name)
        });
    }
    catch(err){
        console.log(err)
        res.status(500).send({error: 'Failed to convert the text to speech'})
    }
})

app.listen(PORT, function(){
    console.log('Server is running on port: ' + PORT)
})

export function randomName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}