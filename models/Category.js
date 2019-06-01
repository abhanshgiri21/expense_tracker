'use strict';

const Model = require('objection').Model;

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
                }
            }
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
        }
    }
}

module.exports = Category;
