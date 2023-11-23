let db = require('../loaders/mySql');
let router = require('express').Router();
let { upcoming, results, score } = require('../services/matchServices');

/**
 * Handles the GET request to the matches endpoint.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
router.get('/', async (req, res) => {
    try {
        const response = db.promise().query('SELECT * FROM matches');
        const [matches, fields] = await response;
        if (matches.length === 0) {
            res.status(404).send('No players found');
            return;
        }
        res.json(matches);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving matches from database');
    }
});

/**
 * Handles the POST request to the matches endpoint.
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
 *  "opponent": "Chelsea",
 *  "date": "2021-05-12",
 *  "homeTeamScore": 1,
 *  "awayTeamScore": 2
 *  }
 */
router.post('/', async (req, res) => {
    try {
        const response = db.promise().query(`INSERT INTO matches (opponent, date, homeTeamScore, awayTeamScore) VALUES ('${req.body.opponent}', '${req.body.date}', ${req.body.homeTeamScore}, ${req.body.awayTeamScore})`);
        const [matches, fields] = await response;
        if (matches.affectedRows === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(matches.insertId);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding matches to database');
    }
});

/**
 * Handles the PUT request to a specific match.
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
        const response = db.promise().query(`UPDATE matches SET opponent = '${req.body.opponent}', date = '${req.body.date}', homeTeamScore = ${req.body.homeTeamScore}, awayTeamScore = ${req.body.awayTeamScore} WHERE id = ${req.params.id}`);
        const [matches, fields] = await response;
        if (matches.affectedRows === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(matches);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating matches in database');
    }
});

/**
 * Handles the DELETE request to a specific match.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
router.delete('/:id', async (req, res) => {
    try {
        const response = db.promise().query(`DELETE FROM matches WHERE id = ${req.params.id}`);
        const [matches, fields] = await response;
        if (matches.affectedRows === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(matches);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting matches from database');
    }
});

/**
 * Handles the GET request to the upcoming matches.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
router.get('/upcoming', async (req, res) => {
    try {
        const response = db.promise().query(`SELECT * FROM matches`);
        const [matches, fields] = await response;
        if (matches.length === 0) {
            res.status(404).send('No upcoming matches');
            return;
        }
        const result = upcoming(matches);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving upcoming matches from database');
    }
});

/**
 * Handles the GET request to the past matches.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 */
router.get('/results', async (req, res) => {
    try {
        const response = db.promise().query(`SELECT * FROM matches WHERE date < NOW()`);
        const [matches, fields] = await response;
        if (matches.length === 0) {
            res.status(404).send('No past matches');
            return;
        }
        const result = results(matches);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving past matches from database');
    }
});

/**
 * Handles the GET request to a specific match.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 **/
router.get('/:id', async (req, res) => {
    try {
        const response = db.promise().query(`SELECT * FROM matches WHERE id = ${req.params.id}`);
        const [matches, fields] = await response;
        if (matches.length === 0) {
            res.status(404).send('Player not found');
            return;
        }
        res.json(matches);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving matches from database');
    }
});

/**
 * Returns matches that ended on the given score.
 *
 * @function
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after processing the request.
 *
 * @example
 * // Request param example
 * /score/1-2
 **/
router.get('/score/:score', async (req, res) => {
    try {
        const char1 = req.params.score[0];
        const teamOneGoals = parseInt(char1)
        const char2 = req.params.score[2];
        const teamTwoGoals = parseInt(char2)
        const response = db.promise().query(`SELECT * FROM matches`);
        const [matches, fields] = await response;
        if (matches.length === 0) {
            res.status(404).send('No matches found');
            return;
        }
        const result = score(matches, teamOneGoals, teamTwoGoals);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(400).send('Wrong format for goals please use the following format: 1-2');
    }
});

module.exports = router;