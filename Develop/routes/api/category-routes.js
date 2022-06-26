const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allCategories = await Category.findAll({include: [{
      model: Product}],
    })
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json("An Error occured", err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
  const singleCategory= Category.findByPk(req.params.id, {
    include: [{
      model: Product
    }],
  })
  res.status(200).json(singleCategory);
} catch (err) {
  res.status(500).json("An Error occurred", err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const oneCategory = await Category.create(req.body);
    res.status(200).json(oneCategory);
  } catch(err) {
    res.status(400).json(`An Error occurred`, err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
