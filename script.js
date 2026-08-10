const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = calculateTotal();
renderExpense();

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());

  if (name !== "" && !isNaN(amount) && amount > 0) {
    const newExpense = {
      id: Date.now(),
      name: name,
      amount: amount,
    };
    expenses.push(newExpense);
    saveExpenseToLocal();
    renderExpense();
    updateTotal();

    //clear input
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  }
});

function renderExpense() {}
function calculateTotal() {}
function saveExpenseToLocal() {}
function updateTotal() {}
