'use strict';

const BaseModel = require('./BaseModel');

class Token extends BaseModel {
    static get tableName() {
        return 'auth_token';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['token'],

            properties: {
                token: {
                    type: 'string'
                }
            }
        }
    }

    static get relationMappings() {
        return {
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'auth_token.userId',
                    to: 'user.id'
                }
            }
        }
    }

    $formatJson(json, opt) {
        json = super.$formatJson(json, opt);
        delete json.userId, json.id;
        return json
    }
}

module.exports = Token
