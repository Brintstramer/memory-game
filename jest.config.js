module.exports = {
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    transform: {
        'src/.+\\.(j|t)sx?$': 'ts-jest',
    },
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // transformIgnorePatterns: ['src/lib/.*'],
};
