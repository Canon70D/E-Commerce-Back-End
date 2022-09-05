const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: "products",
        },
      ],
    });
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      "tag_name": "test name",
      "productIds": [1, 2, 3]
    }
  */
  try {
    const tData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tData = await Tag.update(req.body.tag_name, {
      where: {
        id: req.params.id,
      },
    });
    if (!tData) {
      res.status(404).json({ message: "not a valid tag ID" });
      return;
    }
    res.json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tData) {
      res.status(404).json({ message: "not a valid tag ID" });
      return;
    }
    res.json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
