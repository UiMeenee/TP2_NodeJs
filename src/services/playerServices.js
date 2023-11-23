let topScorers = function (players) {
    return players.sort((a, b) => b.goalsScored - a.goalsScored).slice(0, 3);
}

let position = function (players, position) {
    return players.filter(player => {
        return player.position.toUpperCase() === position.toUpperCase()
    }
    );
}

let stats = function (players) {
    return players.reduce((acc, player) => {
        const playerStats = {
            name: player.name,
            stats: player.goalsScored + player.assists
        };
        acc.push(playerStats);
        return acc;
    },[]);
}

module.exports = {
    topScorers,
    position,
    stats
}