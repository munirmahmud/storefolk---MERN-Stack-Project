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

};

exports.read = async (req, res) => {

};

exports.update = async (req, res) => {

};

exports.remove = async (req, res) => {

};