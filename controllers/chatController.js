const Chat = require("../models/chatModel")

const createChat = async(req, res)=>{
    const {firstId, secondId} = req.body;

    try {
        const chat = await Chat.findOne({
            member: {$all: [firstId, secondId]}
        });
        if(chat){
            return res.status(200).json(chat)
        }

        const newChat = await Chat.create({
            member: [firstId, secondId]
        })

        res.status(200).json(newChat)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Find all chat
const findAllChats = async(req, res)=>{
    const {userId} = req.params;

    try {
        const chats = await Chat.find({
            member:{$in: [userId]}
        })
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Find Single Chat
const findSingleChat = async(req, res)=>{
    const {firstId, secondId} = req.params;

    try {
        const chat = await Chat.find({
            member:{$all: [firstId, secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    createChat,
    findAllChats,
    findSingleChat
}