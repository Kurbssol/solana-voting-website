const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let memeCoins = [];

app.use(express.static('public'));

app.get('/api/memecoins', (req, res) => {
    res.json(memeCoins);
});

app.post('/api/vote/:id', (req, res) => {
    const coinId = req.params.id;
    const coin = memeCoins.find(c => c.baseToken.address === coinId);
    if (coin) {
        coin.votes = (coin.votes || 0) + 1;
        memeCoins.sort((a, b) => (b.votes || 0) - (a.votes || 0));
        io.emit('update', memeCoins);
        res.status(200).send('Vote counted');
    } else {
        res.status(404).send('Coin not found');
    }
});
app.post('/api/get-token-info', async (req, res) => {
    const { contractAddress } = req.body;
    try {
        const response = await axios.get(`https://api.solana.fm/v1/get_token_by_account_hash?token_hash=${contractAddress}`);
        const tokenInfo = response.data;
        res.json(tokenInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch token info' });
    }
});

const fetchMemeCoins = async () => {
    try {
        const response = await axios.get('https://api.dexscreener.com/latest/dex/search?q=SOL');
        memeCoins = response.data.pairs.map(coin => ({
            ...coin,
            votes: 0
        }));
        io.emit('update', memeCoins);
    } catch (error) {
        console.error('Error fetching meme coins:', error);
    }
};

io.on('connection', (socket) => {
    socket.emit('update', memeCoins);
});

setInterval(fetchMemeCoins, 60000); // Fetch new data every minute
fetchMemeCoins();

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
