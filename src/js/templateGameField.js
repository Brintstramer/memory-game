export function templateHeader() {
    return {
        tag: 'div',
        cls: 'header',
        content: [
            {
                tag: 'div',
                cls: 'header__time',
                content: '00.00',
            },
            {
                tag: 'button',
                cls: 'header__restart',
                content: 'Начать заново',
            },
        ],
    };
}

export function templateCardsField() {
    return {
        tag: 'div',
        cls: 'cards',
    };
}

export function templateCards(card) {
    return {
        tag: 'div',
        cls: 'cards__card',
        attrs: {
            style: `background-image: url(./static/img/${card}.svg)`,
            'data-card': card,
        },
    };
}
