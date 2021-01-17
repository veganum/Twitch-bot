const tmi = require("tmi.js");

//Opciones de conexion
const options = {
  options: {
    //Debug para que se vea en consola
    debug: true,
  },
  connection: { recconnect: true },
  identity: {
    //credenciales
    username: "USER",
    password: "PASSWORD",
  },
  //canal de Twitch
  channels: ["veganum2"],
};

//Llamamos la clase tmi y le pasamos las opciones
const client = new tmi.client(options);
//---------------------------------------------
// conectamos  el client con twitch
client.connect();
//Frase de empiece en twitch
client.on("connected", (address, port) => {
  client.action("veganum2", `Hola Jose! Connectado a ${address}:${port}`);
});
//
//target:quien envio el mensaeje
//ctx: informacion relacionada al chat actual(contexto del chat)
//message: mensaje que a tipeado el usuario
//self: para hacer referencia al cliente
client.on("chat", (target, ctx, message, self) => {
  //Si el mensaje viene por parte del bot return
  if (self) return;

  console.log(target);
  console.log(ctx);

  const commandName = message.trim();

  if (commandName === "hola") {
    client.say(target, `Bienvenido ${ctx.username}`);
  }

  if (commandName === "!juego") {
    client.say(target, `${ctx.username} esta jugando a un juego`);
  }

  if (commandName === "!dado") {
    const num = rollDice();
    client.say(target, `El resultado es: 🎲 ${num}🎲`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
});

function rollDice() {
  const sides = 12;
  return Math.floor(Math.random() * sides) + 1;
}
