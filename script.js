const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");
//const emptyErrorMsg = document.getElementById("empty-error-message");
// my code
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
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
    calculateTotal();

    //clear input
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  }
});

function renderExpense() {
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    const emptyErrorMsg = document.createElement("p");
    emptyErrorMsg.textContent = "No expenses yet";
    emptyErrorMsg.classList.add("error-msg");
    expenseList.appendChild(emptyErrorMsg);
  }

  expenses.forEach((element) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${element.name} - Rs ${element.amount.toFixed(2)}`;

    const deteteBtn = document.createElement("button");
    deteteBtn.textContent = "Delete";
    deteteBtn.dataset.id = element.id;

    li.appendChild(span);
    li.appendChild(deteteBtn);
    expenseList.appendChild(li);
  });
}
function calculateTotal() {
  const totalExpense = expenses.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount;
  }, 0);
  updateTotal(totalExpense);
}

function updateTotal(totalExpense) {
  totalAmountDisplay.textContent = totalExpense.toFixed(2);
}

function saveExpenseToLocal() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
calculateTotal();

expenseList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    expenses = expenses.filter((ex) => ex.id !== Number(id));
    saveExpenseToLocal();
    renderExpense();
    calculateTotal();
  }
});
