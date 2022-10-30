const app = {
    level: '',
    screens: {},
    timers: [],
    cards: [],
    'user-cards': [],
}

const appPage = document.querySelector('.app');
const btnStart = appPage.querySelector('.difficulty-level__btn-start');
const btnsLevel = appPage.querySelectorAll('.difficulty-level__btns__btn');

btnsLevel.forEach(btnLevel => {
    btnLevel.addEventListener('click', () => {
        app.level = btnLevel.textContent;
        console.log(app.level);
    });
});

btnStart.addEventListener('click', () => {
    switch (app.level) {
        case '1':
            appPage.textContent = 'Уровень 1';
            break;
        case '2':
            appPage.textContent = 'Уровень 2';
            break;
        case '3':
            appPage.textContent = 'Уровень 3';
            break;
        default:
            break;
    }
});

