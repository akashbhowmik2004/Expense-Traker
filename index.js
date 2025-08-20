let totalBudget = 0;
let totalExpenses = 0;
let expenses = [];

// DOM elements
const totalBudgetAmount = document.querySelector('.totalBudgetAmount');
const totalExpenseAmount = document.querySelector('.totalExpenseAmount');
const leftBudgetAmount = document.querySelector('.leftBudgetAmount');
const histContent = document.querySelector('.histContent');

const expenseAmountInput = document.querySelector('.expenseAmount');
const expenseCategoryInput = document.querySelector('.expenseCategory');
const budgetAmountInput = document.querySelector('.budgetAmount');

const addExpenseBtn = document.querySelector('.addExpense');
const expenseClearBtn = document.querySelector('.Expenseclear');
const addBudgetBtn = document.querySelector('.AddBudget');
const budgetClearBtn = document.querySelector('.Budgetclear');

// Update display
function updateDisplay() {
    const budgetLeft = totalBudget - totalExpenses;

    totalBudgetAmount.textContent = `$${totalBudget.toFixed(2)}`;
    totalExpenseAmount.textContent = `$${totalExpenses.toFixed(2)}`;
    leftBudgetAmount.textContent = `$${budgetLeft.toFixed(2)}`;

    // Update color based on budget status
    if (budgetLeft < 0) {
        leftBudgetAmount.style.color = '#dc3545';
    } else if (budgetLeft < totalBudget * 0.2) {
        leftBudgetAmount.style.color = '#ffc107';
    } else {
        leftBudgetAmount.style.color = '#28a745';
    }
}

// Render expense history
function renderExpenses() {
    if (expenses.length === 0) {
        histContent.innerHTML = '<div class="empty-state">No expenses recorded yet. Add your first expense below!</div>';
        return;
    }

    histContent.innerHTML = expenses.map((expense, index) => `
                <div class="expense-item">
                    <div class="expense-info">
                        <div class="expense-category">${expense.category}</div>
                        <div class="expense-amount">-${expense.amount.toFixed(2)}</div>
                    </div>
                    <button class="delete-btn" onclick="deleteExpense(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
}

// Add expense
function addExpense() {
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value.trim();

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (!category) {
        alert('Please enter a category');
        return;
    }

    expenses.push({ amount, category });
    totalExpenses += amount;

    updateDisplay();
    renderExpenses();
    clearExpenseForm();

    // Show warning if over budget
    if (totalExpenses > totalBudget && totalBudget > 0) {
        alert('⚠️ Warning: You have exceeded your budget!');
    }
}

// Delete expense
function deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        totalExpenses -= expenses[index].amount;
        expenses.splice(index, 1);
        updateDisplay();
        renderExpenses();
    }
}

// Set budget
function setBudget() {
    const amount = parseFloat(budgetAmountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid budget amount');
        return;
    }

    totalBudget = amount;
    updateDisplay();
    clearBudgetForm();
}

// Clear forms
function clearExpenseForm() {
    expenseAmountInput.value = '';
    expenseCategoryInput.value = '';
}

function clearBudgetForm() {
    budgetAmountInput.value = '';
}

// Event listeners
addExpenseBtn.addEventListener('click', addExpense);
expenseClearBtn.addEventListener('click', clearExpenseForm);
addBudgetBtn.addEventListener('click', setBudget);
budgetClearBtn.addEventListener('click', clearBudgetForm);

expenseAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});
expenseCategoryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addExpense();
});
budgetAmountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') setBudget();
});

updateDisplay();
renderExpenses();