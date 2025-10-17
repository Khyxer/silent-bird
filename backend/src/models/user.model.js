import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
 * === Modelo de usuario ===
 *  Campos:
 *  - username: nombre de usuario, con el que inician sesión y buscan a otros usuarios (único, mínimo 3 caracteres, máximo 20)
 *  - displayName: nombre visual, el que se mostrara en el perfil y se podrá editar facilmente (mínimo 1 caracter, máximo 26)
 *  - password: contraseña de la cuenta (requerida)
 *  - avatarUrl: URL del avatar (opcional, por defecto: icono por defecto)
 *  - bannerUrl: URL del banner (opcional, por defecto: NULL)
 *  - banned: estado del usuario, si está baneado no podrá iniciar sesión (por defecto: false)
 *  - role: rol del usuario (por defecto: user)
 *  - followers: Seguidores del usuario
 *  - following: Usuarios a los que sigue
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es requerido"],
      unique: true,
      trim: true,
      minlength: [3, "El usuario debe tener al menos 3 caracteres"],
      maxlength: [20, "El usuario no puede tener más de 20 caracteres"],
    },
    displayName: {
      type: String,
      trim: true,
      lowercase: true,
      minlength: [1, "El nombre debe tener al menos 1 caracter"],
      maxlength: [26, "El nombre no puede tener más de 26 caracteres"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    avatarUrl: {
      type: String,
      default: "https://i.ibb.co/XksgJHVV/default.webp",
    },
    bannerUrl: {
      type: String,
      default: "NULL",
    },
    banned: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "moderador", "admin"],
      default: "user",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hashear contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// metodo para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//generar jwt
userSchema.methods.generateAuthToken = function () {
  // console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const payload = {
    userId: this._id,
    username: this.username,
    role: this.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
