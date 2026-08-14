const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
renderExpense();

// Insert the user input
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

// Load the expenses list
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

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.dataset.id = element.id;

    const deteteBtn = document.createElement("button");
    deteteBtn.textContent = "Delete";
    deteteBtn.classList.add("delete-btn");
    deteteBtn.dataset.id = element.id;

    // Wrap both button
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    li.appendChild(span);
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deteteBtn);
    li.appendChild(btnGroup);
    expenseList.appendChild(li);
  });
}

// Calculate the total
function calculateTotal() {
  const totalExpense = expenses.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount;
  }, 0);
  updateTotal(totalExpense);
}

// Update the total
function updateTotal(totalExpense) {
  totalAmountDisplay.textContent = totalExpense.toFixed(2);
}

// Save to localstorage
function saveExpenseToLocal() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
calculateTotal();

// Remove & edit expense
expenseList.addEventListener("click", (e) => {
  // Delete button click
  if (e.target.classList.contains("delete-btn")) {
    // Ask user to reconfim the delete request.
    const isConfirmedDelete = confirm("Do you want to delete this expense?.");
    if (isConfirmedDelete) {
      const idDel = e.target.dataset.id;
      expenses = expenses.filter((ex) => ex.id !== Number(idDel));
      saveExpenseToLocal();
      renderExpense();
      calculateTotal();
    }
  }
  // Edit button click
  if (e.target.classList.contains("edit-btn")) {
    const isConfirmedEdit = confirm("Do you want to edit the expense");
    if (isConfirmedEdit) {
      const idEdit = e.target.dataset.id;
      const expense = expenses.find((ex) => ex.id === Number(idEdit));
      expenseNameInput.value = expense.name;
      expenseAmountInput.value = expense.amount;
    }
  }
});
