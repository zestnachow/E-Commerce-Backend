const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!categoryData) {
      res.status(404).json({ message: "Could not find a category with that id." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async(req, res) => {
  try {
    const createdCategoryData = await Category.create(req.body);
    res.status(201).json(createdCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async(req, res) => {
  try {
    const updatedCategoryData = await Category.update({
      category_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id
      },
    });
    if (!updatedCategoryData) {
      res.status(404).json({ message: "Could not find a category with that id." });
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    const deletedCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategoryData) {
      res.status(404).json({ message: "Could not find a category with that id." });
    }
    res.status(200).json(deletedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
