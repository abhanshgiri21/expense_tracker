'use strict';

const Model = require('objection').Model;

class Expense extends Model {
    static get tableName() {
        return 'category';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name']
        }
    }

    static get relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'expense.category_id',
                    to: 'category.id'
                }
            }
        }
    }
}

module.exports = Expense;
