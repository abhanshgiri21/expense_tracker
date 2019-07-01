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
    DeleteExpense,
    ListAllExpenses,
    ExpenseListWithCategories
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

    router.get('/category', passport.authenticate('jwt', {
        session: false
    }), CategoryList);

    router.get('/category/:categoryId', passport.authenticate('jwt', {
        session: false
    }), GetCategory);

    router.post('/category', passport.authenticate('jwt', {
        session: false
    }), CreateCategory);

    router.patch('/category/:categoryId', passport.authenticate('jwt', {
        session: false
    }), UpdateCategory);

    router.delete('/category/:categoryId', passport.authenticate('jwt', {
        session: false
    }), DeleteCategory);

    // expense CRUD endpoints

    router.post('/expense', passport.authenticate('jwt', {
        session: false
    }), RecordExpense);

    router.patch('/expense/:expenseId', passport.authenticate('jwt', {
        session: false
    }), EditExpense);

    router.delete('/expense/:expenseId', passport.authenticate('jwt', {
        session: false
    }), DeleteExpense);

    router.get('/expense', passport.authenticate('jwt', {
        session: false
    }), ListAllExpenses);

    router.get('/expense_list', passport.authenticate('jwt', {
        session: false
    }), ExpenseListWithCategories);
}
