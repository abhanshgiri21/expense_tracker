let Expense = require('../models/Expense');

let RecordExpense = (req, res) => {
    let data = req.body, insertedExpense;
    data['user_id'] = req.user.id;
    insertedExpense = await Expense.query().insert(data);
    return createdResponse(res, insertedExpense);
}

let EditExpense = (req, res) => {
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

let DeleteExpense = (req, res) => {
    let expenseId = req.params.expenseId, data = req.body;

    if(!expenseId) {
        throw badRequestError('Expense Id is required')
    }
    let expense = await Expense.query().findOneById(expenseId);
    if(!expense) {
        throw NotFoundError('Expense not found!');
    }
    expense.is_deleted = true;

    let updatedExpense = await Expense.query().patchAndFetchById(expenseId, expense);
    return noContentResponse(res);
}

module.exports = {
    RecordExpense,
    EditExpense,
    DeleteExpense
}