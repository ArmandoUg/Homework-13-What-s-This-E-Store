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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCategory = await Category.update(req.body, { 
      where: { id: req.params.id } 
    })
    if (!updatedCategory){
      res.status(404).json('We could not find that category')
      return;
    }
    res.status(200).json(`Successfully updated category ${req.params.id}`);
  } catch(err) {
    res.status(500).json(`An Error occurred`, err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy({ where: { id: req.params.id } 
    })
    if (!deletedCategory){
      res.status(404).json('We could not find that category')
      return;
    }
    res.status(200).json(`Successfully deleted category ${req.params.id}`);
  } catch(err) {
    res.status(500).json(`An Error occurred`, err)
  }
});

module.exports = router;
