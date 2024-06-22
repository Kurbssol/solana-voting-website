document.addEventListener('DOMContentLoaded', () => {
    const coinList = document.getElementById('coin-list');
    const socket = io();

    socket.on('update', (coins) => {
        coinList.innerHTML = '';
        coins.forEach(coin => {
            const coinDiv = document.createElement('div');
            coinDiv.className = 'coin';

            const coinName = document.createElement('h3');
            coinName.textContent = coin.baseToken.name;

            const voteButton = document.createElement('button');
            voteButton.textContent = 'Vote';
            voteButton.addEventListener('click', () => {
                voteCoin(coin.baseToken.address);
            });

            const voteCount = document.createElement('p');
            voteCount.textContent = `Votes: ${coin.votes}`;

            coinDiv.appendChild(coinName);
            coinDiv.appendChild(voteButton);
            coinDiv.appendChild(voteCount);
            coinList.appendChild(coinDiv);
        });
    });

    function voteCoin(coinId) {
        fetch(`/api/vote/${coinId}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    alert('Vote counted');
                } else {
                    alert('Error voting for coin');
                }
            });
    }
});
