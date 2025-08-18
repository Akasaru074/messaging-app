const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const PORT = 3000;

const standardChatRoomUUID = crypto.randomUUID();

const chatRooms = new Map();
chatRooms.set(standardChatRoomUUID, {
    author: 'система',
    name: 'стандартная комната'
});

const chatRoomMessages = new Map();
chatRoomMessages.set(standardChatRoomUUID, []);

const corsOptions = {
    origin: 'https://185.58.115.54:81'
}

app.use(cors(corsOptions));

app.use(express.json());

app.get("/api/chatrooms", async(_, resp)=>{

    const objChatRooms = [];
    for (let uuid in Object.fromEntries(chatRooms)) objChatRooms.push({uuid: uuid, ...chatRooms.get(uuid)})

    resp.send(objChatRooms);
});

app.post("/api/chatrooms", async(req, resp)=>{

    if (!req.body || !req.body.author || !req.body.name) return resp.sendStatus(400);
    const uuid = crypto.randomUUID();
    const author = req.body.author;
    const name = req.body.name;
    const chatRoom = {
        "author": author,
        "name": name
    }
    chatRooms.set(uuid, chatRoom);
    chatRoomMessages.set(uuid, []);
    resp.status(200).send({uuid: uuid, ...chatRoom});

});

app.get("/api/chatRooms/:chatRoomUUID", async(req, resp)=>{
    const chatRoomUUID = req.params.chatRoomUUID;
    if (chatRooms.has(chatRoomUUID)) resp.send(chatRooms.get(chatRoomUUID));
    else resp.status(404).send("Room not found");
});

app.get("/api/chatRooms/:chatRoomUUID/messages", async(req, resp)=>{
    const chatRoomUUID = req.params.chatRoomUUID;
    if (chatRoomMessages.has(chatRoomUUID)) resp.send(chatRoomMessages.get(chatRoomUUID));
    else resp.status(404).send("Room not found");
});

app.post("/api/chatRooms/:chatRoomUUID/messages", async(req, resp)=>{

    if (!req.body || !req.body.content || !req.body.author) return resp.sendStatus(400);
    const chatRoomUUID = req.params.chatRoomUUID;
    if (!chatRoomMessages.has(chatRoomUUID)) return resp.status(404).send("Room not found");


    const author = req.body.author;
    const content = req.body.content;
    const date = new Date(new Date().toLocaleString("russian", {timeZone: "Asia/Vladivostok"}));
    const message = {
        "author": author,
        "content": content,
        "date": `${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    }

    chatRoomMessages.get(chatRoomUUID).push(message);
    resp.status(200).send(message);

});

// app.use(express.static(__dirname + "/public/"));

// app.get('*', (_, resp) => {
//   resp.status(404).sendFile(__dirname + "/public/index.html");
// });

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}...`);
});