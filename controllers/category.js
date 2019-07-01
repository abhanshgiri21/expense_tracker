'use strict';

const _ = require('lodash');
const {
    transaction
} = require('objection');
const Category = require('../models/Category');

const CategoryList = async (req, res) => {
    let categories = await Category.query().select('id', 'name').where('level', 0).andWhere('user_id', req.user.id).eager('[children.^]');
    return okResponse(res, categories);
}

const CreateCategory = async (req, res) => {
    let data = req.body;
    if (data.parentId) {
        data.parentId = Number(data.parentId);
        let category = await Category.query().findById(data.parentId);
        if (!category) {
            throw badRequestError('parentId incorrect!');
        }
        data.level = category.level + 1;
    }
    data.slug = slugify(data.name);
    data['user_id'] = req.user.id;
    let inserted_category = await Category.query().insert(data).returning('*');
    return createdResponse(res, inserted_category);
}

const UpdateCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    let data = req.body;
    if (_.isEmpty(data)) {
        throw badRequestError('Please provide data to update!')
    }
    if (data.parentId) {
        let category = await Category.query().findById(data.parentId);
        if (!category) {
            throw badRequestError('parentId incorrect!');
        }
        data.level = category.level + 1;
    }
    if (data.name) {
        data.slug = slugify(data.name);
    }
    let updated_category = await Category.query().patchAndFetchById(categoryId, data);
    return okResponse(res, updated_category);
}

const DeleteCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    await Category.query().deleteById(categoryId);
    return noContentResponse(res);
}

const GetCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    let category = await Category.query().findById(categoryId).where('user_id', req.user.id).eager('[children.^]')
    if (!category) {
        throw notFoundError('Category not found!');
    }
    return okResponse(res, category);
}

module.exports = {
    CategoryList,
    CreateCategory,
    GetCategory,
    UpdateCategory,
    DeleteCategory,
}
