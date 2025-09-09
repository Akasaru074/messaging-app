const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const app = express();
const PORT = 3000;

require('dotenv').config();
const standardChatRoomUUID = crypto.randomUUID();

const chatRooms = new Map();
chatRooms.set(standardChatRoomUUID, {
    author: 'система',
    name: 'стандартная комната'
});

const users = [{
    username: 'admin',
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
}];

const chatRoomMessages = new Map();
chatRoomMessages.set(standardChatRoomUUID, []);

const corsOptions = {
    origin: 'https://185.58.115.54:81',
    // origin: 'http://localhost:4200',
    credentials: true
}

function authenticateToken(req, resp, next) {
    const authCookie = req.cookies['authcookie'];
    if (!authCookie) return resp.sendStatus(401);

    jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return resp.sendStatus(403);
        req.user = user;
        next();
    })

}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/chatrooms", authenticateToken, async(_, resp)=>{

    const objChatRooms = [];
    for (let uuid in Object.fromEntries(chatRooms)) objChatRooms.push({uuid: uuid, ...chatRooms.get(uuid)})

    resp.send(objChatRooms);
});

app.post("/api/chatrooms", authenticateToken, async(req, resp)=>{

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

app.get("/api/chatRooms/:chatRoomUUID", authenticateToken, async(req, resp)=>{
    const chatRoomUUID = req.params.chatRoomUUID;
    if (chatRooms.has(chatRoomUUID)) resp.send(chatRooms.get(chatRoomUUID));
    else resp.status(404).send("Room not found");
});

app.get("/api/chatRooms/:chatRoomUUID/messages", authenticateToken, async(req, resp)=>{
    const chatRoomUUID = req.params.chatRoomUUID;
    if (chatRoomMessages.has(chatRoomUUID)) resp.send(chatRoomMessages.get(chatRoomUUID));
    else resp.status(404).send("Room not found");
});

app.post("/api/chatRooms/:chatRoomUUID/messages", authenticateToken, async(req, resp)=>{

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

app.get("/auth", async(req, resp)=>{
    const authCookie = req.cookies['authcookie'];
    if (!authCookie) return resp.status(200).json({authenticated: false});
    let user = null;

    jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, u)=>{
        if (err) return resp.status(200).json({authenticated: false});
        user = u;
    });

    return resp.status(200).json({authenticated: true, username: user.username});

});

app.post("/auth/login", async(req, resp)=>{

    if (!req.body.username || !req.body.password) {
        resp.status(400).json({msg: "Bad username or password"});
        return;
    }

    const {username, password} = req.body;

    let user = null;
    users.forEach(u => {
        if (u.username === username) user = u;;
        return;
    });
    if (user == null) {
        resp.status(404).json({msg: "User not found"});
        return;
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
        resp.status(403).json({msg: 'Password incorrect'});
        return;
    }

    const token = jwt.sign({username, password}, process.env.ACCESS_TOKEN_SECRET);

    resp.cookie('authcookie', token, {maxAge:900000, httpOnly: true, secure: false});

    resp.status(200).json({authenticated: true, username: username});

});

app.listen(PORT, "127.0.0.1", ()=>{
    console.log(`Server is listening on port ${PORT}...`);
});