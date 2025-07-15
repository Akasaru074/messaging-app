const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

const standardChatRoomUUID = crypto.randomUUID();

const chatRooms = [{
    "uuid": standardChatRoomUUID,
    "author": "система",
    "name": "стандартная комната"
}];
const chatRoomMessages = [{
    "chatRoomUUID": standardChatRoomUUID,
    "messages": []
}];

app.use(express.json());

app.get("/api/chatrooms", async(_, resp)=>{
    resp.send(chatRooms);
});

app.post("/api/chatrooms", async(req, resp)=>{

    if (!req.body || !req.body.author || !req.body.name) return resp.sendStatus(400);
    const uuid = crypto.randomUUID();
    const author = req.body.author;
    const name = req.body.name;
    const chatRoom = {
        "uuid": uuid,
        "author": author,
        "name": name
    }
    chatRooms.push(chatRoom);
    chatRoomMessages.push({"chatRoomUUID": uuid, "messages": []});
    resp.status(200).send(chatRoom);

});

app.get("/api/chatRooms/:chatRoomUUID", async(req, resp)=>{
    const chatRoomUUID = req.params.chatRoomUUID;
    const chatRoomIndex = chatRoomMessages.findIndex(v => v.chatRoomUUID == chatRoomUUID);
    if (chatRoomIndex == -1) return resp.sendStatus(404);
    resp.send(chatRoomMessages[chatRoomIndex].messages);
});

app.post("/api/chatRooms/:chatRoomUUID", async(req, resp)=>{

    if (!req.body || !req.body.content || !req.body.author) return resp.sendStatus(400);
    const chatRoomUUID = req.params.chatRoomUUID;
    const chatRoomIndex = chatRoomMessages.findIndex(v => v.chatRoomUUID == chatRoomUUID);
    if (chatRoomIndex == -1) return resp.sendStatus(404);


    const uuid = crypto.randomUUID();
    const author = req.body.author;
    const content = req.body.content;
    const date = new Date(new Date().toLocaleString("russian", {timeZone: "Asia/Vladivostok"}));
    const message = {
        "uuid": uuid,
        "author": author,
        "content": content,
        "date": `${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    }

    chatRoomMessages[chatRoomIndex].messages.push(message); 
    resp.status(200).send(message);

});

app.use(express.static(__dirname + "/public/"));

app.get('*', (_, resp) => {
  resp.status(404).sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}...`);
});