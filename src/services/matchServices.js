let upcoming = function (matches) {
    return matches.filter(match => Date.parse(match.date) > new Date());
}

let results = function (matches) {
    let result = matches;
    result.map(match => {
        if (match.homeTeamScore > match.awayTeamScore) {
            match.result = 'Gain';
        } else if (match.homeTeamScore < match.awayTeamScore) {
            match.result = 'Défaite';
        } else {
            match.result = 'Nul';
        }
    });
    return result.filter(match => match.homeTeamScore !== null && match.awayTeamScore !== null);
}

let score = function (matches, scoreTeamOne, scoreTeamTwo) {
    return matches.filter(match => {
        if ((match.homeTeamScore === scoreTeamOne && match.awayTeamScore === scoreTeamTwo) || (match.homeTeamScore === scoreTeamTwo && match.awayTeamScore === scoreTeamOne))
            return match;
    });
}

module.exports = {
    upcoming,
    results,
    score
}