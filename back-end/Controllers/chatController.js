const chatModel = require("../Models/chat");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      return res.status(200).json(chat); // return the chat if it already exists
    }
    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, getUserChats, findChat };
