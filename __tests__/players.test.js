const players = require('../src/models/playersFixtures');
const { topScorers, position, stats } = require('../src/services/playerServices');

describe('players', compareFn => {
    test('top 3 scorers', () => {
        expect(topScorers(players)).toEqual([
            { id: 4, name: 'Dani Rojas', position: 'Forward', number: 10, goalsScored: 14, assists: 6 },
            { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
            { id: 6, name: 'Colin Hughes', position: 'Midfielder', number: 8, goalsScored: 4, assists: 5 },
        ]);
    });
    test('players by position', () => {
        expect(position(players, 'Forward')).toEqual([
            { id: 4, name: 'Dani Rojas', position: 'Forward', number: 10, goalsScored: 14, assists: 6 },
            { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
        ]);
    });
    test('stats', () => {
        let result = [
            {name: 'Jamie Tartt', stats: 17},
            {name: 'Roy Kent', stats: 7},
            {name: 'Sam Obisanya', stats: 4},
            {name: 'Dani Rojas', stats: 20},
            {name: 'Isaac McAdoo', stats: 2},
            {name: 'Colin Hughes', stats: 9},
            {name: 'Richard Montlaur', stats: 6},
            {name: 'Jan Maas', stats: 4},
            {name: 'Thierry Zoreaux', stats: 0},
            {name: 'Moe Bumbercatch', stats: 3}
        ].sort((a, b) => b.stats - a.stats);
        let test = stats(players).sort((a, b) => b.stats - a.stats);
        result.forEach((player, index) => {
            expect(player).toEqual(test[index])
        });
    });
})

