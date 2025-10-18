import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// cuentas sugeridas
export const getSuggestedAccountsController = async (req, res) => {
  try {
    const userId = req.query.userId;

    const { limitUsers } = req.query;

    const filters = userId
      ? {
          // followers: { $ne: userId }, // excluye la cuenta si el usuario la sigue
          _id: { $ne: userId },
        }
      : {};

    const accounts = await User.find(filters)
      .sort({ followers: -1 })
      .limit(limitUsers)
      .select(
        "avatarUrl bannerUrl displayName username verified followers following"
      );
    res.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener sugerencias de cuentas",
      error: error.message,
    });
  }
};

// obtener datos de un usuario en especifico para ver su perfil
export const getUserProfileController = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.userName }).select(
      "-password"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    // Convertir a objeto plano
    const userObj = user.toObject();

    // likes totales
    const totalLikesAggregation = await Post.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: { $size: "$likes" } },
        },
      },
    ]);

    const totalLikes = totalLikesAggregation[0]?.totalLikes || 0;

    //posts
    const totalPosts = await Post.countDocuments({ userId: user._id });

    // Agregar likes al objeto plano
    userObj.likes = totalLikes;
    userObj.posts = totalPosts;

    res.json({
      success: true,
      data: userObj,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener perfil de usuario",
      error: error.message,
    });
  }
};

// buscar usuarios
export const searchUserController = async (req, res) => {
  try {
    // obtener el nombre de usuario a buscar
    const { partUserName } = req.query;

    const accounts = await User.find({
      username: { $regex: partUserName, $options: "i" }, //buscar los que coincidan e ignore mayusculas y minusculas
    })
      .sort({ followers: -1 })
      .select(
        "avatarUrl bannerUrl displayName username verified followers following"
      );
    res.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al buscar usuarios",
      error: error.message,
    });
  }
};
