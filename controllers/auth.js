const User = require('./../models/User');
const Token = require('./../models/Token');

const CreateUser = async (req, res) => {
    let data = req.body;
    let created_user = await User.query().insertAndFetch(data);
    let token = await created_user.getJWT();
    let saved_token = await Token.query().insertAndFetch({
        token: token,
        userId: created_user.id
    });
    res.setHeader('Authorization', 'Bearer ' + saved_token.token);
    return createdResponse(res, created_user.toJSON(), 'Account Created');
}

const LoginUser = async (req, res) => {
    let data = req.body;
    let user = await User.query().skipUndefined().where('username', data.username).first();
    if (!user) {
        throw badRequestError('User with this username doesn\'t exist');
    }
    if (!await user.comparePassword(data.password)) {
        throw badRequestError('Password Incorrect!');
    }
    let token = await user.getJWT();
    let saved_token = await Token.query().insertAndFetch({
        token: token,
        userId: user.id
    });
    res.setHeader('Authorization', 'Bearer ' + saved_token.token);
    return okResponse(res, user.toJSON());
}

const GetUserDetails = async (req, res) => {
    let data = req.user;
    return okResponse(res, data);
}

const GetUsersList = async (req, res) => {
    let data = await User.query();
    return okResponse(res, data);
}

module.exports = {
    CreateUser,
    LoginUser,
    GetUserDetails,
    GetUsersList
}
