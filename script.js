
const expenseForm = document.getElementById("expense-form"); 
const expenseList = document.getElementById("expense-list"); 
const totalAmountElement = document.getElementById("total-amount"); 
 
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // Initialize expenses array from localStorage

// Function to render expenses in tabular form
function renderExpenses()
{
	expenseList.innerHTML = ""; // Clear expense list 
	let totalAmount = 0; // Initialize total amount 
	for (let i = 0; i < expenses.length; i++) // Loop through expenses array and create table rows
	{
		const expense = expenses[i]; 
		const expenseRow = document.createElement("tr"); 
		expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
	<td>₹${expense.amount}</td>
	<td class="delete-btn" data-id="₹{i}">Delete</td> 
	`; 
		expenseList.appendChild(expenseRow); 
		totalAmount += expense.amount; // Update total amount
	}  
	totalAmountElement.textContent = totalAmount.toFixed(2); // Update total amount display 
	localStorage.setItem("expenses", JSON.stringify(expenses)); // Save expenses to localStorage
}
// Function to add expense 
function addExpense(event)
{ 
	event.preventDefault();  
	const expenseNameInput = document.getElementById("expense-name"); // Get expense name and amount from form
	const expenseAmountInput = document.getElementById("expense-amount"); 
	const expenseName = expenseNameInput.value; 
	const expenseAmount = parseFloat(expenseAmountInput.value); 

	// Clear form inputs 
	expenseNameInput.value = "";
	expenseAmountInput.value = "";
	// Validate inputs 
	if (expenseName === "" || isNaN(expenseAmount))
	{ 
		alert("Please enter valid expense details."); 
		return; 
	}
	const expense = {name: expenseName, amount: expenseAmount,}; // Create new expense object
	expenses.push(expense); // Add expense to expenses array
	renderExpenses(); // Render expenses
} 

// Function to delete expense 
function deleteExpense(event)
{ 
	if (event.target.classList.contains("delete-btn"))
	{
		const expenseIndex = parseInt(event.target.getAttribute("data-id")); // Get expense index from data-id attribute

		expenses.splice(expenseIndex, 1); // Remove expense from expenses array
		
		renderExpenses(); // Render expenses
	} 
} 

// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 
 
renderExpenses(); // Render initial expenses on page load