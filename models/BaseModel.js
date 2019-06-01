const Model = require('objection').Model;


class BaseModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }
}

module.exports = BaseModel;
