const passport = require('passport');

const {
    CreateUser,
    LoginUser,
    GetUserDetails,
    GetUsersList
} = require('./controllers/auth');


require('./middleware/passport')(passport);

module.exports = router => {
    router.post('/signup', CreateUser);

    router.post('/login', LoginUser);

    router.get('/me', passport.authenticate('jwt', {
        session: false
    }), GetUserDetails);

    router.get('/users', GetUsersList);
}
