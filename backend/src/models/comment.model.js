const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "El ID del post es requerido"],
      index: true, // Índice para queries rápidas
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del usuario es requerido"],
    },
    content: {
      type: String,
      required: [true, "El contenido del comentario es requerido"],
      trim: true,
      minlength: [1, "El contenido debe tener al menos 1 caracter"],
      maxlength: [500, "El contenido no puede tener más de 500 caracteres"],
    },
    // Para comentarios anidados (respuestas)
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Para soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Índices compuestos para mejor rendimiento
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ userId: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);
