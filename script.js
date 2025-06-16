// 📅 Show Current Date
const currentDateEl = document.getElementById('current-date');
const today = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
currentDateEl.textContent = `Today is: ${today.toLocaleDateString('en-US', options)}`;

const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const listContainer = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTransaction = {
    id: Date.now(),
    desc: descInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    date: new Date().toLocaleString()
  };

  transactions.push(newTransaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  descInput.value = '';
  amountInput.value = '';

  renderTransactions();
});

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactions() {
  listContainer.innerHTML = '';

  transactions.forEach(tx => {
    const div = document.createElement('div');
    div.className = 'transaction';
    div.innerHTML = `
      <div class="info">
        <strong>${tx.desc}</strong>
        <small>${tx.date} | ${tx.category}</small>
      </div>
      <div>
        ₹${tx.amount.toFixed(2)}
        <button class="delete-btn" onclick="deleteTransaction(${tx.id})">Delete</button>
      </div>
    `;
    listContainer.appendChild(div);
  });
}

renderTransactions();
