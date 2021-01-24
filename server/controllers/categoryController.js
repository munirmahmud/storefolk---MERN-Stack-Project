const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name).toLowerCase() }).save();

        res.json(category)
    } catch (error) {
        res.status(400).send('Creating category failed');
    }
};

exports.list = async (req, res) => {
    
    const category = await Category.find({}).sort({createdAt: -1}).exec();
    res.json(category);
};

exports.read = async (req, res) => {
    const category = await Category.findOne({slug: req.params.slug}).exec();
    res.json(category);
};

exports.update = async (req, res) => {
    const { name } = req.body;

    try {
        const updated = await Category.findOneAndUpdate(
            {slug: req.params.slug}, 
            {name, slug: slugify(name)},
            {new: true}
        );

        res.json(updated);
    } catch (error) {
        res.status(400).send('Updating the category failed.');
    }
};

exports.remove = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deletedCategory);
    } catch (error) {
        res.json(400).send('Deleting category failed.');
    }
};