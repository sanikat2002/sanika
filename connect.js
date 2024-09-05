document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('item-form');
    const itemList = document.getElementById('itemList');
    const totalValue = document.getElementById('totalValue');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        const category = document.getElementById('category').value;

        const item = {
            name: itemName,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            category: category
        };

        fetch('/api/inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        }).then(() => {
            loadItems();
        });
    });

    function loadItems() {
        fetch('/api/inventory')
            .then(response => response.json())
            .then(items => {
                itemList.innerHTML = '';
                items.forEach((item, index) => {
                    const row = `<tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.category}</td>
                        <td><button onclick="deleteItem(${index})">Delete</button></td>
                    </tr>`;
                    itemList.insertAdjacentHTML('beforeend', row);
                });
                calculateTotal();
            });
    }

    function calculateTotal() {
        fetch('/api/inventory/total')
            .then(response => response.json())
            .then(total => {
                totalValue.textContent = total.toFixed(2);
            });
    }

    loadItems();
});
