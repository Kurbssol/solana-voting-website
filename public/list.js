// list.js
document.addEventListener('DOMContentLoaded', () => {
    const tokenForm = document.getElementById('token-form');
    const coinList = document.getElementById('coin-list');

    tokenForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const contractAddress = document.getElementById('contract-address').value;

        try {
            const response = await fetch('/api/get-token-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contractAddress }),
            });

            const tokenInfo = await response.json();

            if (tokenInfo.error) {
                alert('Failed to fetch token info');
                return;
            }

            const coinItem = document.createElement('div');
            coinItem.className = 'coin';
            coinItem.innerHTML = `
                <h3>${tokenInfo.name} (${tokenInfo.symbol})</h3>
                <p>Contract Address: ${contractAddress}</p>
            `;
            coinList.appendChild(coinItem);
        } catch (error) {
            alert('Failed to fetch token info');
        }
    });
});
