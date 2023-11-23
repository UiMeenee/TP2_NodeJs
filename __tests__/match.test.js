const {upcoming, results, score} = require('../src/services/matchServices');
const matches = require('../src/models/matchesFixtures');

describe('matches', () => {
    test('upcoming', () => {
        expect(upcoming(matches)).toEqual([
            { id: 1, opponent: 'Manchester City', date: '2024-08-15', homeTeamScore: 2, awayTeamScore: 1 },
            { id: 4, opponent: 'Arsenal FC', date: '2024-09-05', homeTeamScore: 3, awayTeamScore: 1 },
        ]);
    });
    test('score', () => {
        expect(score(matches, 1, 2)).toEqual([
            { id: 1, opponent: 'Manchester City', date: '2024-08-15', homeTeamScore: 2, awayTeamScore: 1 },
        ]);
    });
    test('results', () => {
        expect(results(matches)).toEqual([
            { id: 1, opponent: 'Manchester City', date: '2024-08-15', homeTeamScore: 2, awayTeamScore: 1, result: 'Gain' },
            { id: 2, opponent: 'Liverpool FC', date: '2023-08-22', homeTeamScore: 1, awayTeamScore: 1, result: 'Nul' },
            { id: 3, opponent: 'Chelsea FC', date: '2023-08-29', homeTeamScore: 0, awayTeamScore: 2, result: 'Défaite' },
            { id: 4, opponent: 'Arsenal FC', date: '2024-09-05', homeTeamScore: 3, awayTeamScore: 1, result: 'Gain' },
            { id: 5, opponent: 'Tottenham Hotspur', date: '2023-09-12', homeTeamScore: 1, awayTeamScore: 1, result: 'Nul' },
            { id: 6, opponent: 'Leicester City', date: '2023-09-19', homeTeamScore: 2, awayTeamScore: 0, result: 'Gain' },
        ]);
    });
});