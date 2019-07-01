let Expense = require('../models/Expense');
let Category = require('../models/Category');

let RecordExpense = async (req, res) => {
    let data = req.body, insertedExpense;
    data['user_id'] = req.user.id;
    insertedExpense = await Expense.query().insert(data);
    return createdResponse(res, insertedExpense);
}

let EditExpense = async (req, res) => {
    let expenseId = req.params.expenseId, data = req.body;

    if(!expenseId) {
        throw badRequestError('Expense Id is required')
    }
    let expense = await Expense.query().findOneById(expenseId);
    if(!expense) {
        throw NotFoundError('Expense not found!');
    }
    expense.desc = data.desc || expense.desc;
    expense.name = data.name || expense.name;
    expense.amount = data.amount || expense.amount;
    expense.tags = data.tags || expense.tags;
    expense.category_id = data.category_id || expense.category_id;

    let updatedExpense = await Expense.query().patchAndFetchById(expenseId, expense);
    return okResponse(res, updatedExpense);
}

let DeleteExpense = async (req, res) => {
    let expenseId = req.params.expenseId;

    if(!expenseId) {
        throw badRequestError('Expense Id is required')
    }
    let expense = await Expense.query().findById(expenseId);
    if(!expense) {
        throw NotFoundError('Expense not found!');
    }
    expense.is_deleted = true;

    let updatedExpense = await Expense.query().patchAndFetchById(expenseId, expense);
    return noContentResponse(res);
}

let ListAllExpenses = async (req, res) => {
    let expenses = await Expense.query().where('is_deleted', false);

    return okResponse(res, expenses);
}

const ExpenseListWithCategories = async (req, res) => {
    let categories = await Category.query().where('level', 0).andWhere('user_id', req.user.id).eager('[children.[expense, children.[expense]]]');
    return okResponse(res, categories);
}

module.exports = {
    RecordExpense,
    EditExpense,
    DeleteExpense,
    ListAllExpenses,
    ExpenseListWithCategories
}