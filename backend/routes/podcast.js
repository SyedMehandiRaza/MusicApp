const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/multer");
const Category = require("../models/category.model");
const Podcast = require("../models/podcast.model");
const User = require("../models/user.model");
const router = require("express").Router();

// add podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontImage"][0].path.replace(/\\/g, "/");;
    const audioFile = req.files["audioFile"][0].path.replace(/\\/g, "/");;
    // console.log("Received files:", req.files); 
    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }
    const { user } = req;
    const cat = await Category.findOne({ categoryName: category });
    if (!cat) {
      return res.status(400).json({ error: "Category not found" });
    }
    const catid = cat._id;
    const userid = user._id;
    const newPodcast = new Podcast({
      frontImage,
      audioFile,
      title,
      description,
      user: userid,
      category: catid,
    });
    await newPodcast.save();
    await Category.findByIdAndUpdate(catid, {
      $push: { podcasts: newPodcast._id },
    });
    await User.findByIdAndUpdate(userid, {
      $push: { podcasts: newPodcast._id },
    });
    return res.status(200).json({ message: "Podcast added successfully" });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
});

// get all podcasts
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcasts = await Podcast.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: podcasts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// get user podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userid = user._id;

    // Fetch the user with populated podcasts and category
    const data = await User.findById(userid)
      .populate({ path: "podcasts", populate: { path: "category" } })
      .select("-password");

    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res.status(200).json({ data: data.podcasts });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// get podcast by id
router.get("/get-podcast/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcasts = await Podcast.findById(id).populate("category");
    return res.status(200).json({ data: podcasts });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// get podcasts by category
router.get("/get-podcasts-by-category/:category", async (req, res) => {
  try {
    const { cat } = req.params;
    const categories = await Category.findOne({
        categoryName: cat,
        }).populate({path: "podcasts", populate: { path: "category" }});
        let podcasts = [];
        categories.forEach((category) => {
            podcasts = [...podcasts, ...category.podcasts];
        });
    return res.status(200).json({ data: cat.podcasts });
    } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
    }
}
);


module.exports = router;
