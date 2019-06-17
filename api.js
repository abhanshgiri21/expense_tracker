const passport = require('passport');

const {
    CreateUser,
    LoginUser,
    GetUserDetails,
    GetUsersList
} = require('./controllers/auth');

const {
    CategoryList,
    CreateCategory,
    GetCategory,
    UpdateCategory,
    DeleteCategory,
} = require('./controllers/category');

const {
    RecordExpense,
    EditExpense,
    DeleteExpense
} = require('./controllers/expense');


require('./middleware/passport')(passport);

module.exports = router => {
    router.post('/signup', CreateUser);

    router.post('/login', LoginUser);

    router.get('/me', passport.authenticate('jwt', {
        session: false
    }), GetUserDetails);

    router.get('/users', GetUsersList);


    // Category CRUD endpoints

    router.get('/category', CategoryList);

    router.get('/category/:categoryId', GetCategory);

    router.post('/category', CreateCategory);

    router.patch('/category/:categoryId', UpdateCategory);

    router.delete('/category/:categoryId', DeleteCategory);

    // expense CRUD endpoints

    router.post('/expense', RecordExpense);

    router.patch('/expense/:expenseId', EditExpense);

    router.delete('/expense/:expenseId', DeleteExpense);
}
