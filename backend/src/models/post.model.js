import mongoose from "mongoose";

/*
 * === Modelo de post ===
 *  Campos:
 *  - userId: ID del usuario que creó el post
 *  - content: contenido del post (mínimo 1 caracter, máximo 280)
 *  - images: URL de las imágenes del post
 *  - likes: likes del post
 *  - dislikes: dislikes del post
 *  - taggedUsers: usuarios etiquetados en el post
 *  - hashtags: hashtags usados en el post
 *  - commentsCount: cantidad de comentarios del post
 */
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del usuario es requerido"],
    },
    content: {
      type: String,
      trim: true,
      minlength: [1, "El contenido debe tener al menos 1 caracter"],
      maxlength: [280, "El contenido no puede tener más de 280 caracteres"],
    },
    images: [String],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    taggedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    hashtags: [String],
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
