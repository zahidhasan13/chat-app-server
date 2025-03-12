const messageModel = require('../models/messageModel')

const createMessage = async (req, res)=>{
    const {chatId, senderId, text} = req.body;

    try {
        const message = await messageModel.create({chatId, senderId, text})
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// get message
const getMessages = async(req, res)=>{
    const {chatId} = req.params;

    try {
        const messages = await messageModel.find({chatId})
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {
    createMessage,
    getMessages
}