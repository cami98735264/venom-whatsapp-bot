import { create, Whatsapp } from 'venom-bot';
import fs from 'fs';
const instance = await create({
    session: 'zeus-bot' //name of session
  }).catch((erro) => {
    return console.log(erro);
  });
const client = instance;
start(client);

// Shortcut functions
const checkOwner = (message) => {
  const database = JSON.parse(fs.readFileSync("./allowed.json"));
  if(message.sender.id === database[0].owner) return true;
  else {
    client.reply(message.from, "⚠ - No estás autorizado para utilizar este comando", message.id);
    return false;
  }
}

async function start(client) {
  await client.onMessage(async (message) => {
    const bodyContent = message.caption || message.body;
    console.log(message);
    if(bodyContent.toLowerCase().startsWith("!sticker")) {
      await client.reply(message.from, "⚠ - Este comando está en mantenimiento", message.id);
    }
    else if(bodyContent.toLowerCase().startsWith("!eval") && checkOwner(message)) {
      const args = bodyContent.split(" ").slice(1);
      if(args.length < 1) return client.reply(message.from, "⚠ - Debes ingresar un código para evaluar", message.id);
      try {
        const evaled = await eval(args.join(" "));
        await client.reply(message.from, `📥 - Código evaluado:\n\`\`\`\n${args.join(" ")}\n\`\`\`\n\n📤 - Resultado:\n\`\`\`\n${evaled}\n\`\`\``, message.id)
      } catch (err) {
        await client.reply(message.from, "⚠ - Ocurrió un error al evaluar el código: \n\`\`\`" + err + "\n\`\`\`", message.id);
      }
    }
})
}