let Cenas = {
    cena1: {
        score: 0
    },
    cena2: {
        score: 0
    },
    cena3: {
        score: 0
    },
    cena4: {
        score: 0
    },
    cena5: {
        score: 0
    },
    cena6: {
        score: 0
    },
    cena7: {
        score: 0
    },
}
module.exports = {
    ...Cenas,
    somaScores() {
        let total = 0;
        for (const cena in Cenas) {
            total += Cenas[cena].score;
        }
        return total;
    }
};