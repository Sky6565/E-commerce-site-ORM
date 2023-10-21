const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const CategoryStuff = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!CategoryStuff) {
      return res
        .status(404)
        .json({ message: "No Category found with that ID" });
    }
    res.status(200).json(CategoryStuff);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const CategoryStuff = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!CategoryStuff) {
      res.status(404).json({ message: "No Category found with that ID" });
      return;
    }
    res.status(200).json(CategoryStuff);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const NewCategoryStuff = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json({
      NewCategoryStuff,
      message: "Good job! A new Category has been created!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    // update a category by its `id` value
    const CategoryStuff = await Category.findByPk(req.params.id);

    if (!CategoryStuff) {
      res.status(404).json({ message: "No Category found with this ID" });
    }
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.json({ message: "Good job! The category has been updated!" });
  } catch (err) {
    res.status(400).json({ err: "Can not update category" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value

  try {
    const CategoryStuff = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (CategoryStuff) {
      res
        .status(200)
        .json({ message: "Good job! This category has been deleted!" });
      return;
    }
    if (!CategoryStuff) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }

    res.status(200).json(CategoryStuff);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
