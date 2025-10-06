import Post from "../models/post.model.js";
import User from "../models/user.model.js";

//crar post
export const createPostController = async (req, res) => {
  try {
    const { content, hashtags, taggedUsers, images } = req.body;
    const formData = {
      content,
      hashtags,
      taggedUsers,
      images,
    };
    const userId = req.user._id;

    //validar datos
    if (
      !content.trim() ||
      !content ||
      !userId ||
      !hashtags ||
      !taggedUsers ||
      !images
    ) {
      return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    const post = new Post({ ...formData, userId });
    const savedPost = await post.save();
    res.status(201).json({
      success: true,
      message: "Post creado exitosamente",
      post: savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el post",
      error: error.message,
    });
  }
};

//obtener posts
export const getPostsController = async (req, res) => {
  try {
    //obtener username de la query
    const { username } = req.query;

    let posts;

    if (username) {
      // si hay un username, buscar ese usario en la base de datos y obtener su ID
      const user = await User.findOne({
        username: username,
        banned: { $ne: true },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `Usuario '${username}' no encontrado o está baneado`,
          posts: [],
        });
      }

      // si el usuario existe, buscar sus posts por el ID
      posts = await Post.find({ userId: user._id })
        .populate({
          path: "userId",
          select: "-password",
        })
        .sort({ createdAt: -1 });
    } else {
      // si no hay username entonces se necesita buscar todos los posts de usuarios no baneados
      posts = await Post.find()
        .populate({
          path: "userId",
          match: { banned: { $ne: true } },
          select: "-password",
        })
        .sort({ createdAt: -1 });

      posts = posts.filter((post) => post.userId !== null);
    }

    res.status(200).json({
      success: true,
      message: "Posts obtenidos exitosamente",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los posts",
      error: error.message,
    });
  }
};

// dar like a un post
export const likePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    //validar datos
    if (!postId || !userId) {
      return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post no encontrado" });
    }

    // si el usuario ya dio like, se quita, si no, se agrega

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
      res.status(200).json({
        success: true,
        message: "Like quitado exitosamente",
        state: "removeLike",
      });
    } else {
      post.likes.push(userId);
      res.status(200).json({
        success: true,
        message: "Like agregado exitosamente",
        state: "addLike",
      });
    }

    await post.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al manejar el like del post",
      error: error.message,
    });
  }
};
