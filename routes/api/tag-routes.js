const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async(req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}],
    });
    if (!tagData) {
      res.status(404).json({ message: "Could not find a tag with that id." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async(req, res) => {
  try {
    const createdTagData = await Tag.create(req.body);
    res.status(201).json(createdTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async(req, res) => {
  try {
    const updatedTagData = await Tag.update({
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id
      },
    });
    if (!updatedTagData) {
      res.status(404).json({ message: "Could not find a tag with this id." });
      return;
    }
    res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    const deletedTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTagData) {
      res.status(404).json({ message: "Could not find a tag with that id." });
      return;
    }
    res.status(200).json(deletedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
