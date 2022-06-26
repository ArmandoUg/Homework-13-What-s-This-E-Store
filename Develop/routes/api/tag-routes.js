const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try{
  const allTags = await Tag.findAll({
    include:[{
      model:Product}],
      })
      res.status(200).json(allTags);
    } catch (err) {
      res.status(500).json("An Error occurred", err);
    }
    });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const singleTag = Tag.findByPk(req.params.id, {
      include:[{
        model:Product}],
        })
        if(!singleTag){
        req.status(404).json('We could not find that tag')
      }
      res.status(200).json(singleTag)
  }
  catch (err) {
    res.status(500).json("An Error occurred", err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try{
    const oneTag = Tag.create(req.body);
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(400).json(`An Error occurred`, err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = Tag.update(req.body, { 
      where: { id: req.params.id } 
    })
    if (!updatedTag){
      res.status(404).json('We could not find that tag')
      return;
    }
    res.status(200).json(`Successfully updated tag ${req.params.id}`);
  } catch (err) {
    res.status(500).json(`An Error occurred`, err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = Tag.destroy({ where: { id: req.params.id } 
    })
    if (!deletedTag){
      res.status(404).json('We could not find that tag')
    }
    res.status(200).json(`Successfully deleted tag ${req.params.id}`);
  } catch (err) {
    res.status(500).json(`An Error occurred`, err);
  }
});

module.exports = router;
