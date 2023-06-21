// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const prefix = "!";
venom
  .create({
    session: 'zeus' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    else if (message.body === prefix + 'sticker') {
        if (message.isMedia === true || message.isMMS === true) {
            const buffer = await client.decryptFile(message);
            // At this point you can do whatever you want with the buffer
            // Most likely you want to write it into a file
            const fileName = `some-file-name.${mime.extension(message.mimetype)}`;
            await fs.writeFile(fileName, buffer, (err) => {
              console.log(err)
            });
        }
    }
  });
}