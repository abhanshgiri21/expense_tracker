'use strict';

const Model = require('objection').Model;
const ValidationError = require('objection').ValidationError;

class Category extends Model {
    static get tableName() {
        return 'category';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: {
                    type: 'integer'
                },
                name: {
                    type: 'string'
                },
                parentId: {
                    type: ['integer', 'null']
                },
                level: {
                    type: ['integer', 0]
                }
            }
        }
    }

    async $beforeInsert() {
        await super.$beforeInsert;

        let result = await this.constructor.query().select('id').where('name', this.name).andWhere('user_id', this.user_id).first();
        if (result) {
            throw new ValidationError({
                message: "Category with same name already exists",
                type: "ModelValidation",
                data: {
                    message: "Category with same name already exists",
                    verb: "Already exists"
                }
            });
        }

        if(this.name) {
            this.slug = slugify(this.name);
        }
        this.level = this.level || 0;
    }

    async $beforeUpdate() {
        await super.$beforeUpdate;

        let result = await this.constructor.query().select('id').where('name', this.name).first();
        if (result) {
            throw new ValidationError({
                message: "Category with same name already exists",
                type: "ModelValidation",
                data: {
                    message: "Category with same name already exists",
                    verb: "Already exists"
                }
            });
        }

        if(this.name) {
            this.slug = slugify(this.name);
        }
    }

    static get relationMappings() {
        return {
            parent: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'category.parentId',
                    to: 'category.id'
                }
            },

            children: {
                relation: Model.HasManyRelation,
                modelClass: Category,
                join: {
                    from: 'category.id',
                    to: 'category.parentId'
                }
            },

            expense: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Expense',
                join: {
                    from: 'category.id',
                    to: 'expense.category_id'
                }
            }
        }
    }
}

module.exports = Category;
