// ranked.js
document.addEventListener('DOMContentLoaded', () => {
    const rankedCoinList = document.getElementById('ranked-coin-list');

    // Mock data for ranked coins
    const rankedCoins = [
        { name: 'Solana Meme Coin 1', symbol: 'SMC1', rank: 1, bannerUrl: 'https://i.imgur.com/K8mMaMO.png' },
        { name: 'Solana Meme Coin 2', symbol: 'SMC2', rank: 2, bannerUrl: 'path/to/banner2.png' },
        { name: 'Solana Meme Coin 3', symbol: 'SMC3', rank: 3, bannerUrl: 'path/to/banner3.png' },
        // Add more coins as needed
    ];

    // Function to display ranked coins
    const displayRankedCoins = (coins) => {
        rankedCoinList.innerHTML = '';
        coins.forEach(coin => {
            const coinItem = document.createElement('div');
            coinItem.className = 'ranked-coin';
            coinItem.innerHTML = `
                <img src="${coin.bannerUrl}" alt="${coin.name} Banner">
                <div class="coin-text">
                    <h3>${coin.rank}. ${coin.name} (${coin.symbol})</h3>
                </div>
            `;
            rankedCoinList.appendChild(coinItem);
        });
    };

    // Display the ranked coins
    displayRankedCoins(rankedCoins);
});
