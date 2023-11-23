let express = require('express');

let app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
app.use(express.json());
app.use('/players', require('./routes/playerRoutes'));
app.use('/matches', require('./routes/matchRoutes'));
