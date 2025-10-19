import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "El contenido del mensaje es requerido"],
    trim: true,
    minlength: [1, "El contenido debe tener al menos 1 caracter"],
    maxlength: [500, "El contenido no puede tener más de 500 caracteres"],
  },
  senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El ID del remitente es requerido"],
  },
  receiverUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El ID del destinatario es requerido"],
  },
},
{
  timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
