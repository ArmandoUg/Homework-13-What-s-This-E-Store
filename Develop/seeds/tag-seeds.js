const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Rock music',
  },
  {
    tag_name: 'Pop music',
  },
  {
    tag_name: 'Blue',
  },
  {
    tag_name: 'Red',
  },
  {
    tag_name: 'Green',
  },
  {
    tag_name: 'White',
  },
  {
    tag_name: 'Gold',
  },
  {
    tag_name: 'Pop culture',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
