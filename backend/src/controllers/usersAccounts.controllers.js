import User from "../models/user.model.js";

// cuentas sugeridas
export const getSuggestedAccountsController = async (req, res) => {
  try {
    const userId = req.query.userId;

    const filters = userId
      ? {
          followers: { $ne: userId },
          _id: { $ne: userId },
        }
      : {};

    const accounts = await User.find(filters)
      .sort({ followers: -1 })
      .limit(4)
      .select("avatarUrl displayName username verified");
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

    res.json({
      success: true,
      data: user,
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
