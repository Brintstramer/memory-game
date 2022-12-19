import { templateEngine } from '../lib/template-engine';
import {
    templateLevelBlock,
    templateHeader,
    templateCardsField,
    templateCards,
    templateTransparentBackground,
    templateGameFinal,
} from './templateScreens';

type SelectedCards = {
    firstCard: Element | boolean;
    secondCard: Element | boolean;
    firstCardValue: string | null;
    secondCardValue: string | null;
    openedCards: number;
};

type App = {
    level: string | null;
    timer: number;
    cards: string[];
    'generated-cards': string[];
    'selected-cards': SelectedCards;
};

export const app: App = {
    level: '',
    timer: 0,
    cards: [
        'spadesA',
        'spadesK',
        'spadesQ',
        'spadesJ',
        'spades10',
        'spades9',
        'spades8',
        'spades7',
        'spades6',
        'heartsA',
        'heartsK',
        'heartsQ',
        'heartsJ',
        'hearts10',
        'hearts9',
        'hearts8',
        'hearts7',
        'hearts6',
        'diamondsA',
        'diamondsK',
        'diamondsQ',
        'diamondsJ',
        'diamonds10',
        'diamonds9',
        'diamonds8',
        'diamonds7',
        'diamonds6',
        'clubsA',
        'clubsK',
        'clubsQ',
        'clubsJ',
        'clubs10',
        'clubs9',
        'clubs8',
        'clubs7',
        'clubs6',
    ],
    'generated-cards': [],
    'selected-cards': {
        firstCard: false,
        secondCard: false,
        firstCardValue: '',
        secondCardValue: '',
        openedCards: 0,
    },
};

const appPage = document.querySelector('.app') as Element;
let cardsField: Element;
let time: Element;
let seconds = 0,
    minutes = 0;

function renderLevelBlock() {
    if (appPage) {
        appPage.textContent = '';

        appPage.appendChild(templateEngine(templateLevelBlock()));
    }

    startGame();
}

renderLevelBlock();

function startGame() {
    const btnStart = appPage.querySelector(
        '.notification__btn-start'
    ) as Element;
    const levels = appPage.querySelectorAll('.notification__levels__level');

    levels.forEach((level) => {
        level.addEventListener('click', () => {
            app.level = level.textContent;
        });
    });

    btnStart.addEventListener('click', () => {
        switch (app.level) {
            case '1':
                renderGameScreen(3);
                break;
            case '2':
                renderGameScreen(6);
                break;
            case '3':
                renderGameScreen(9);
                break;
            default:
                break;
        }
    });
}

function renderGameScreen(cards: number) {
    appPage.textContent = '';

    appPage.appendChild(templateEngine(templateHeader()));
    appPage.appendChild(templateEngine(templateCardsField()));

    genRandomCards(cards);

    renderCardsField();

    app.timer = Number(setInterval(genTime, 1000));

    const restartGame = appPage.querySelector('.header__restart') as Element;

    restartGame.addEventListener('click', () => {
        cardsField.textContent = '';

        renderCardsField();

        seconds = 0;
        minutes = 0;

        app['selected-cards'].openedCards = 0;
        app['selected-cards'].firstCard = false;
        app['selected-cards'].secondCard = false;
    });
}
function genTime() {
    seconds += 1;

    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    const secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    const minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    time = appPage.querySelector('.header__time') as Element;
    time.textContent = `${minutesValue}.${secondsValue}`;
}

export function genRandomCards(cards: number) {
    app['generated-cards'] = [];

    for (let i = 0; i < cards; i++) {
        const randomIndex = Math.floor(Math.random() * 36);

        app['generated-cards'].push(app.cards[randomIndex]);
    }

    app['generated-cards'] = [
        ...app['generated-cards'],
        ...app['generated-cards'],
    ];

    app['generated-cards'] = app['generated-cards'].sort(
        () => Math.random() - 0.5
    );
}

function renderCardsField() {
    cardsField = appPage.querySelector('.cards') as Element;

    cardsField.appendChild(
        templateEngine(app['generated-cards'].map(templateCards))
    );

    const cards = cardsField.querySelectorAll<HTMLElement>('.cards__card');

    cards.forEach((card) => {
        card.style.pointerEvents = 'none';

        setTimeout(() => {
            card.style.backgroundImage = "url('./static/img/card-back.svg')";

            card.style.pointerEvents = '';
        }, 5000);

        card.addEventListener('click', () => {
            if (!card.classList.contains('matched')) {
                card.style.backgroundImage = `url('./static/img/${card.dataset.card}.svg')`;
                card.style.pointerEvents = 'none';

                if (!app['selected-cards'].firstCard) {
                    app['selected-cards'].firstCard = card;

                    app['selected-cards'].firstCardValue =
                        card.getAttribute('data-card');
                } else {
                    app['selected-cards'].secondCard = card;

                    app['selected-cards'].secondCardValue =
                        card.getAttribute('data-card');

                    if (
                        app['selected-cards'].firstCardValue ===
                        app['selected-cards'].secondCardValue
                    ) {
                        if (
                            typeof app['selected-cards'].firstCard === 'object'
                        ) {
                            app['selected-cards'].firstCard.classList.add(
                                'matched'
                            );
                        }

                        if (
                            typeof app['selected-cards'].secondCard === 'object'
                        ) {
                            app['selected-cards'].secondCard.classList.add(
                                'matched'
                            );
                        }

                        app['selected-cards'].firstCard = false;

                        app['selected-cards'].openedCards += 1;

                        if (
                            app['selected-cards'].openedCards ===
                            Math.floor(app['generated-cards'].length / 2)
                        ) {
                            renderGameFinal(
                                './static/img/icon-win.png',
                                'Вы выиграли!'
                            );
                        }
                    } else {
                        app['selected-cards'].firstCard = false;
                        app['selected-cards'].secondCard = false;

                        renderGameFinal(
                            './static/img/icon-lose.png',
                            'Вы проиграли!'
                        );
                    }
                }
            }
        });
    });
}

function renderGameFinal(icon: string, winLose: string) {
    appPage.appendChild(templateEngine(templateTransparentBackground()));
    appPage.appendChild(templateEngine(templateGameFinal(icon, winLose)));

    const gameTime = appPage.querySelector(
        '.notification__time__value'
    ) as Element;

    if (time) {
        gameTime.textContent = time.textContent;
    }

    clearInterval(Number(app.timer));
    seconds = 0;
    minutes = 0;

    const btnStart = appPage.querySelector(
        '.notification__btn-start'
    ) as Element;

    btnStart.addEventListener('click', () => {
        app['selected-cards'].openedCards = 0;

        renderLevelBlock();
    });
}
