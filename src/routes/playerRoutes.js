let db = require('../loaders/mySql');
let router = require('express').Router();
let { stats, position, topScorers } = require('../services/playerServices');

/**
 * Handles the GET request to the players endpoint.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 */
router.get('/', async (req, res) => {
    try {
        const response = db.promise().query('SELECT * FROM players');
        const [players, fields] = await response;
        if (players.length === 0) {
            res.status(404).send('No players found');
            return;
        }
        res.json(players);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving players from database');
    }
});

/**
 * Handles the POST request to the players endpoint.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 * @example
 * // Request body example
 * {
 * "name": "John Doe",
 * "position": "Goalkeeper",
 * "number": 1
 * }
 */
router.post('/', async (req, res) => {
    try {
        const response = db.promise().query(`INSERT INTO players (name, position, number) VALUES ('${req.body.name}', '${req.body.position}', ${req.body.number})`);
        const [players, fields] = await response;
        if (players.affectedRows === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(players.insertId);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding player to database');
    }
});

/**
 * Handles the PUT request to a specific player.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 */
router.put('/:id', async (req, res) => {
    try {
        const response = db.promise().query(`UPDATE players SET name = '${req.body.name}', position = '${req.body.position}', number = ${req.body.number} WHERE id = ${req.params.id}`);
        const [players, fields] = await response;
        if (players.affectedRows === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(players);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating player in database');
    }
});

/**
 * Handles the DELETE request to a specific player.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 */
router.delete('/:id', async (req, res) => {
    try {
        const response = db.promise().query(`DELETE FROM players WHERE id = ${req.params.id}`);
        const [players, fields] = await response;
        if (players.affectedRows === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(players);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting player from database');
    }
});

/**
 * Handles the GET request for 3 best scorers.
 *
 * @function
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 */
router.get('/topScorers', async (req, res) => {
    try {
        const response = db.promise().query('SELECT * FROM players');
        const [players, fields] = await response;
        if (players.length === 0) {
            res.status(404).send('No players found');
            return;
        }
        const result = topScorers(players);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving players from database');
    }
});

/**
 * Handles the GET request to a specific position.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 * @example
 * // Request param example
 * /position/Goalkeeper
 */
router.get('/position/:position/', async (req, res) => {
    try {
        const response = db.promise().query(`SELECT * FROM players`);
        const [players, fields] = await response;
        if (players.length === 0) {
            res.status(404).send('No players found');
            return;
        }
        const result = position(players, req.params.position);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving players from database');
    }
});

/**
 * Handles the GET for stats.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 */
router.get('/stats', async (req, res) => {
    try {
        const response = db.promise().query('SELECT * FROM players');
        const [players, fields] = await response;
        if (players.length === 0) {
            res.status(404).send('No players found');
            return;
        }
        const individualStats = stats(players);
        res.json(individualStats);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving players from database');
    }
});

/**
 * Handles the GET request to a specific player.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 */
router.get('/:id', async (req, res) => {
    try {
        const response = db.promise().query(`SELECT * FROM players WHERE id = ${req.params.id}`);
        const [players, fields] = await response;
        if (players.length === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(players);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving player from database');
    }
});

module.exports = router;