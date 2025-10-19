import Message from "../models/message.model.js";
//enviar mensaje
export const sendMessageController = async (req, res) => {
  try {
    const { content, receiverUserId } = req.body;

    if (!content || !receiverUserId) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos",
      });
    }

    if (content.length > 350) {
      return res.status(400).json({
        success: false,
        message: "El contenido no puede tener mas de 350 caracteres",
      });
    }

    const message = await Message.create({
      content,
      senderUserId: req.user._id,
      receiverUserId,
    });

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//obtener mensajes
export const getMessagesController = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        {
          senderUserId: req.user._id,
          receiverUserId: req.query.receiverUserId,
        },
        {
          senderUserId: req.query.receiverUserId,
          receiverUserId: req.user._id,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
