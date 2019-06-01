const BaseModel = require('./BaseModel');
const validator = require('validator');
const ValidationError = require('objection').ValidationError;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET;


class User extends BaseModel {

    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password'],

            properties: {
                username: {
                    type: 'string'
                }
            }
        }
    }

    static get relationMappings() {
        return {
            tweets: {
                relation: BaseModel.HasManyRelation,
                modelClass: __dirname + '/Tweet',
                join: {
                    from: 'user.id',
                    to: 'tweets.userId'
                }
            }
        }
    }

    async $beforeInsert() {
        await super.$beforeInsert;

        if (!this.username || this.username === '') {
            throw new ValidationError({
                message: "Username cannot be empty!",
                type: 'ModelValidation',
                data: {
                    message: 'Username cannot be empty! Username should contain atleast one character.',
                    verb: 'Invalid Username'
                }
            })
        }

        if (!this.password || this.password === '') {
            throw new ValidationError({
                message: "Password cannot be empty!",
                type: 'ModelValidation',
                data: {
                    message: 'Password cannot be empty! Password should contain atleast one character.',
                    verb: 'Invalid Password'
                }
            })
        }

        let result = await this.constructor.query().select('id').where('username', this.username).first();
        if (result) {
            throw new ValidationError({
                message: "Account with this username already esits!",
                type: "ModelValidation",
                data: {
                    message: "Account already exists with this username!",
                    verb: "Already exists"
                }
            });
        }
        this.password = await bcrypt.hash(this.password, 10);
    }

    async $beforeUpdate() {
        this.password ? this.password = await bcrypt.hash(this.password, 10) : null;
    }

    async comparePassword(password) {
        if (!password) {
            return false;
        }
        let pass = await bcrypt.compare(password, this.password);
        return pass;
    }

    async getJWT() {
        return await jwt.sign({
            userId: this.id
        }, secret_key);
    }

    $formatJson(json, opt) {
        json = super.$formatJson(json, opt);
        json.password ? delete json.password : json
        return json;
    }
}

module.exports = User;
