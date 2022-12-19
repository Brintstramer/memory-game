export function templateLevelBlock() {
    return {
        tag: 'div',
        cls: 'notification',
        content: [
            {
                tag: 'div',
                cls: 'notification__text',
                content: [
                    {
                        content: 'Выбери',
                    },
                    {
                        tag: 'br',
                    },
                    {
                        content: 'сложность',
                    },
                ],
            },
            {
                tag: 'div',
                cls: 'notification__levels',
                content: [
                    {
                        tag: 'div',
                        cls: 'notification__levels__level',
                        content: [
                            {
                                tag: 'input',
                                attrs: {
                                    id: '1',
                                    type: 'radio',
                                    name: 'level',
                                    value: '1',
                                },
                            },
                            {
                                tag: 'label',
                                attrs: {
                                    for: '1',
                                },
                                content: '1',
                            },
                        ],
                    },
                    {
                        tag: 'div',
                        cls: 'notification__levels__level',
                        content: [
                            {
                                tag: 'input',
                                attrs: {
                                    id: '2',
                                    type: 'radio',
                                    name: 'level',
                                    value: '2',
                                },
                            },
                            {
                                tag: 'label',
                                attrs: {
                                    for: '2',
                                },
                                content: '2',
                            },
                        ],
                    },
                    {
                        tag: 'div',
                        cls: 'notification__levels__level',
                        content: [
                            {
                                tag: 'input',
                                attrs: {
                                    id: '3',
                                    type: 'radio',
                                    name: 'level',
                                    value: '3',
                                },
                            },
                            {
                                tag: 'label',
                                attrs: {
                                    for: '3',
                                },
                                content: '3',
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'button',
                cls: 'notification__btn-start',
                content: 'Старт',
            },
        ],
    };
}

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

export function templateCards(card: string) {
    return {
        tag: 'div',
        cls: 'cards__card',
        attrs: {
            style: `background-image: url(./static/img/${card}.svg)`,
            'data-card': card,
        },
    };
}

export function templateTransparentBackground() {
    return {
        tag: 'div',
        cls: 'transparent-background',
        content: [],
    };
}

export function templateGameFinal(icon: string, winLose: string) {
    return {
        tag: 'div',
        cls: 'notification',
        content: [
            {
                tag: 'img',
                cls: 'notification__icon',
                attrs: {
                    src: icon,
                },
            },
            {
                tag: 'div',
                cls: 'notification__text',
                content: winLose,
            },
            {
                tag: 'div',
                cls: 'notification__time',
                content: [
                    {
                        tag: 'p',
                        cls: 'notification__time__text',
                        content: 'Затраченное время',
                    },
                    {
                        tag: 'div',
                        cls: 'notification__time__value',
                        content: '00.00',
                    },
                ],
            },
            {
                tag: 'button',
                cls: 'notification__btn-start',
                content: 'Играть снова',
            },
        ],
    };
}
