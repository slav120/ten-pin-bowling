import * as express from 'express';

import { randomNumber } from '../helpers/randomNumber';

export const register = (app: express.Application, pool: any) => {
    let newGame: any = null;
    let frameCount: any = null;
    let totalScore = 0;

    app.get(`/v1/newgame`, async (req: any, res) => {
        if (!newGame) {
            newGame = [];
            frameCount = 0;
            res.json({ Message: 'Starting new game ! ' }).status(200);
        } else if (frameCount === 11) {
            newGame = [];
            frameCount = 0;
            res.json({ Message: 'Starting new game ! ' }).status(200);
        } else {
            res.json({ Message: "Oups ! Looks like the last game hasn't finished yet " }).status(400);
        }
    });

    app.get(`/v1/newframe`, async (req: any, res) => {
        frameCount += 1;
        const newroll: any = { frame: frameCount, firstRoll: null, secondRoll: null, score: null, spare: 0, strike: 0 };

        if (frameCount > 10 || !newGame) {
            const errorMessage = !newGame
                ? "You haven't started a new game !"
                : 'Looks like your game has already finished ! Restart a new Game !';
            res.json(errorMessage).status(400);
        } else {
            newroll.firstRoll = randomNumber(10);
            newroll.strike = newroll.firstRoll === 10 ? 1 : 0;
            newroll.secondRoll = newroll.strike ? null : randomNumber(10 - newroll.firstRoll);
            newroll.spare = newroll?.firstRoll + newroll?.secondRoll === 10 && newroll.strike !== 1 ? (newroll.spare = 1) : 0;
            newroll.score = newroll.strike || newroll.spare ? null : newroll.firstRoll + newroll.secondRoll + totalScore;
            totalScore += newroll.strike || newroll.spare ? 0 : newroll.firstRoll + newroll.secondRoll;
            newGame.push(newroll);

            newGame.forEach(function (keys: any, index: any) {
                if (!keys.score) {
                    if (keys.spare && newGame[index + 1]) {
                        keys.score = newGame[index - 1]?.score + 10 + newGame[index + 1]?.firstRoll;
                        newroll.score += keys?.score - newGame[index - 1]?.score;
                        totalScore = newroll?.score;
                    }
                    if (keys.strike && newGame[index + 1]) {
                        keys.score =
                            newGame[index - 1]?.score + 10 + newGame[index + 1]?.firstRoll + newGame[index + 1]?.secondRoll;
                        newroll.score += keys?.score - newGame[index - 1]?.score;
                        totalScore = newroll?.score;
                    }
                }
            });
        }
        return res.json({ newGame, totalScore });
    });
};
