let Budget = document.querySelector(".budgetAmount");
let expense = document.querySelector(".expenseAmount");
let categories = document.querySelector("#category");

let totalBudget = 0;
let expenses = []; // store all expenses

function updateUI() {
    let totExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    let leftTotAmount = totalBudget - totExpense;

    document.querySelector(".totalBudgetAmount").innerHTML = `$${totalBudget.toFixed(2)}`;
    document.querySelector(".totalExpenseAmount").innerHTML = `$${totExpense.toFixed(2)}`;
    document.querySelector(".leftBudgetAmount").innerHTML = `$${leftTotAmount.toFixed(2)}`;

    // Render history
    let html = expenses.map((exp, index) => `
        <div class="contents">
            <p class="historyPera">-$${exp.amount.toFixed(2)}</p>
            <p>${exp.category}</p>
            <button class="delButton" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join("");

    document.querySelector(".histContent").innerHTML = html;

    // Add delete handler
    document.querySelectorAll(".delButton").forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idx = e.currentTarget.getAttribute("data-index");
            expenses.splice(idx, 1);
            updateUI(); // refresh
        });
    });
}

function initBudgetWebApp() {
    document.querySelector(".AddBudget").addEventListener('click', () => {
        totalBudget = parseFloat(Budget.value) || 0;
        expenses = []; // reset
        updateUI();
        Budget.value = "";
    });

    document.querySelector(".Budgetclear").addEventListener('click', () => {
        Budget.value = "";
    });

    document.querySelector(".Expenseclear").addEventListener('click', () => {
        expense.value = "";
    });

    document.querySelector(".addExpense").addEventListener('click', () => {
        let ExpenseAmount = parseFloat(expense.value) || 0;
        if (ExpenseAmount <= 0) return;

        expenses.push({
            amount: ExpenseAmount,
            category: categories.value
        });

        updateUI();
        expense.value = "";
        categories.value = "";
    });
}

initBudgetWebApp();
