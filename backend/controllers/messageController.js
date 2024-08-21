const Conversation = require("../models/conversationModel");
const Msg = require("../models/msgModel");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Msg.create({
      senderId,
      recieverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await gotConversation.save();
    return res.status(201).json({
      // message:"message send succesfully",
      newMessage,
    });
  } catch (err) {
    console.log(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const recieverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");
    console.log(conversation);
    return res.status(201).json(conversation?.messages);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendMessage, getMessage };
