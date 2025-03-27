const messageModel = require("../Models/message");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  // Validate that all required fields are provided
  if (!chatId || !senderId || !text) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();
    res.status(201).json(response); // Successfully created message
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving message." });
  }
};


const getMessages = async (req, res) => {
    const {chatId} = req.params;

    try{
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createMessage, getMessages };
