const safeRegex = require("safe-regex")

class InvalidRegexError extends Error {
    constructor(regExp) {
        super(`The Regex expression ${regExp} is unsafe.`)
        this.name = this.constructor.name
    }
}

class ValidateRegex {
    static execute(regExp) {
        const isSafe = safeRegex(regExp)

        if (!isSafe) {
            throw new InvalidRegexError(regExp)
        }

        return regExp
    }
}

module.exports = { ValidateRegex }