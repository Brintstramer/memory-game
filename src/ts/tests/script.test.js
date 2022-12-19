const { it, describe, expect } = require('@jest/globals');

const fs = require('fs');
window.document.body.innerHTML = fs.readFileSync('./index.html');

const { app, genRandomCards } = require('../script');

describe('genRandomCards', () => {
    it('should check length of array with generated cards', () => {
        genRandomCards(3);

        expect(app['generated-cards']).toHaveLength(6);
    });

    it('should check length of array with generated cards', () => {
        genRandomCards(6);

        expect(app['generated-cards']).toHaveLength(12);
    });

    it('should check length of array with generated cards', () => {
        genRandomCards(9);

        expect(app['generated-cards']).toHaveLength(18);
    });
});
