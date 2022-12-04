import { templateEngine } from '../lib/template-engine';
import { templateHeader } from './templateGameField';
import { templateCardsField } from './templateGameField';
import { templateCards } from './templateGameField';

const app = {
    level: '',
    screens: {},
    timer: [],
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
    'user-cards': [],
};

const appPage = document.querySelector('.app');
const btnStart = appPage.querySelector('.difficulty-level__btn-start');
const btnsLevel = appPage.querySelectorAll('.difficulty-level__btns__btn');
// let time;
// let seconds = 0,
//   minutes = 0;
let cardsField;
let firstCard = false;
let secondCard = false;
let firstCardValue;
let openedCards = 0;

btnsLevel.forEach((btnLevel) => {
    btnLevel.addEventListener('click', () => {
        app.level = btnLevel.textContent;
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

function renderGameScreen(cards) {
    appPage.textContent = '';

    appPage.appendChild(templateEngine(templateHeader()));
    appPage.appendChild(templateEngine(templateCardsField()));

    genRandomCards(cards);

    genCardsField();

    // time = appPage.querySelector(".header__time");
    // app.timer = setInterval(genTime, 1000);
}

// const btnRestart = appPage.querySelector(".header__restart");
// btnRestart.addEventListener(
//   "click",
//   (restartGame = () => {
//     clearInterval(timer);
//   })
// );

// function genTime() {
//     seconds += 1;

//     if (seconds >= 60) {
//         minutes += 1;
//         seconds = 0;
//     }

//     let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
//     let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
//     time.innerHTML = `${minutesValue}.${secondsValue}`;
// }

function genRandomCards(cards) {
    for (let i = 0; i < cards; i++) {
        const randomIndex = Math.floor(Math.random() * 36);

        app['generated-cards'].push(app.cards[randomIndex]);
    }
}

function genCardsField() {
    cardsField = appPage.querySelector('.cards');

    cardsField.innerHTML = '';

    app['generated-cards'] = [
        ...app['generated-cards'],
        ...app['generated-cards'],
    ];

    app['generated-cards'].sort(() => Math.random() - 0.5);

    cardsField.appendChild(
        templateEngine(app['generated-cards'].map(templateCards))
    );

    const cards = cardsField.querySelectorAll('.cards__card');

    cards.forEach((card) => {
        setTimeout(() => {
            card.style.backgroundImage = "url('./static/img/card-back.svg')";
        }, 5000);

        card.addEventListener('click', () => {
            if (!card.classList.contains('matched')) {
                card.style.backgroundImage = `url('./static/img/${card.dataset.card}.svg')`;

                if (!firstCard) {
                    firstCard = card;

                    firstCardValue = card.getAttribute('data-card');
                } else {
                    secondCard = card;

                    let secondCardValue = card.getAttribute('data-card');

                    if (firstCardValue === secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');

                        firstCard = false;

                        openedCards += 1;

                        if (
                            openedCards ===
                            Math.floor(app['generated-cards'].length / 2)
                        ) {
                            alert('Вы победили!');
                        }
                    } else {
                        // let [tempFirst, tempSecond] = [firstCard, secondCard];

                        // firstCard = false;
                        // secondCard = false;

                        setTimeout(() => {
                            alert('Вы проиграли!');
                            // tempFirst.style.backgroundImage =
                            //   "url('src/static/img/card-back.svg')";
                            // tempSecond.style.backgroundImage =
                            //   "url('src/static/img/card-back.svg')";
                        }, 900);
                    }
                }
            }
        });
    });
}
