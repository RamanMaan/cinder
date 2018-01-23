module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "max-len": [1, 120, 2, {ignoreComments: true}],
        "quote-props": [1, "consistent-as-needed"],
        "no-cond-assign": [2, "except-parens"],
        "no-param-reassign": 0,
        "eol-last": ["error", "always"]
    }
};