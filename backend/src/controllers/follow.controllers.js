import User from "../models/user.model.js";

export const followUserController = async (req, res) => {
  try {
    //id del usuario principal - no es necesario validar ya que para eso esta el middleware
    const authUserId = req.user._id;

    //@username del usuario a seguir
    const { usernameToFollow, isUnfollow } = req.query;

    // si no hay un username, se debe devolver un error
    if (!usernameToFollow) {
      return res.status(400).json({
        success: false,
        message: "No se proporciono un username",
      });
    }

    // buscar el usuario a seguir
    const userToFollow = await User.findOne({ username: usernameToFollow });

    // si no se encuentra el usuario a seguir, se debe devolver un error
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // si el usuario a seguir es el mismo que el usuario autenticado, se debe devolver un error
    if (userToFollow._id.equals(authUserId)) {
      return res.status(400).json({
        success: false,
        message: "No puedes seguirte a ti mismo",
      });
    }

    if (isUnfollow === "false") {
      // si el usuario a seguir ya esta en la lista de seguidores, se debe devolver un error
      if (userToFollow.followers.includes(authUserId)) {
        return res.status(400).json({
          success: false,
          message: "Ya sigues a este usuario",
        });
      }

      // si el usuario autenticado no esta en la lista de seguidores, se debe agregar
      userToFollow.followers.push(authUserId);
      await userToFollow.save();

      // por ultimo agregamos el usuario a seguir a la lista de seguidos del autenticado
      const authUser = await User.findById(authUserId);
      authUser.following.push(userToFollow._id);
      await authUser.save();

      //devolver true
      return res.json({
        success: true,
        message: "Seguidor agregado exitosamente",
        authUserId,
        userToFollowId: userToFollow._id,
      });
    }
    //dejar de seguir
    else {
      //si el usuario NO esta en la lista en la lista de seguidores retornamos un error
      if (!userToFollow.followers.includes(authUserId)) {
        return res.status(400).json({
          success: false,
          message: "No sigues a este usuario",
        });
      }

      //si el usuario esta en la lista de seguidores, se debe eliminar
      userToFollow.followers.pull(authUserId);
      await userToFollow.save();

      //por ultimo eliminamos el usuario a seguir de la lista de seguidos del autenticado
      const authUser = await User.findById(authUserId);
      authUser.following.pull(userToFollow._id);
      await authUser.save();

      //devolver true
      return res.json({
        success: true,
        message: "Seguidor eliminado exitosamente",
        authUserId,
        userToFollowId: userToFollow._id,
      });
    }
  } catch (error) {
    //tremendo manejo de errores, futuro senior 😎
    console.error("Error al manejar follow:", error);
    return res.status(500).json({
      success: false,
      message: "Error al manejar follow",
      error: error.message,
    });
  }
};
