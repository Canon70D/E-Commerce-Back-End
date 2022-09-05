const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const cateData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }

  // Category.findAll({
  //   include: {
  //     model: Product,
  //   },
  // })
  //   .then((cateData) => res.json(cateData))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cateData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }

  // Category.findOne({
  //   where: {
  //     id: req.params.id,
  //   },
  //   include: {
  //     model: Product,
  //   },
  // })
  //   .then((cateData) => {
  //     if (!cateData) {
  //       res
  //         .status(404)
  //         .json({ message: "Not a valid category ID" });
  //       return;
  //     }
  //     res.json(cateData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const cateData = await Category.create(req.body);
    res.status(200).json(cateData);
  } catch (err) {
    res.status(400).json(err);

    // Category.create({
    //   category_name: req.body.category_name
    // })
    //   .then(cateData => res.json(cateData))
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    //   });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const cateData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(cateData);
    if (!cateData) {
      res.status(404).json({ message: "Not a valid category ID" });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }

  // Category.update(
  //   {
  //     category_name: req.body.category_name,
  //   },
  //   {
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // )
  //   .then((cateData) => {
  //     if (!cateData) {
  //       res.status(404).json({ message: "Not a valid category ID" });
  //       return;
  //     }
  //     res.json(cateData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const cateData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!cateData) {
      res.status(404).json({ message: "Not a valid category ID" });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }

  // Category.destroy({
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((dbPostData) => {
  //     if (!dbPostData) {
  //       res.status(404).json({ message: "Not a valid category ID" });
  //       return;
  //     }
  //     res.json(dbPostData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

module.exports = router;
