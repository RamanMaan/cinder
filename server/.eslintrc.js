module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "max-len": [1, 120, 2, {
            ignoreComments: true
        }],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": [
            "warn",
            "smart"
        ],
        "no-trailing-spaces": [
            "warn"
        ],
        "eol-last": [
            "error", "always"
        ]
    }
};