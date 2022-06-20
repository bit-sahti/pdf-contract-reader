const { describe, it } = require('mocha')
const { expect } = require('chai')

const { ValidateRegex } = require('../src/util')

describe('[Validate Regex] test suite', () => {
    it('should throw an error if the regex is unsafe', () => {
        const unsafeRegex = /(x+x+)+y/gmi

        expect(() => ValidateRegex.execute(unsafeRegex)).to.throw(`The Regex expression ${unsafeRegex} is unsafe`)
    })

    it('should return the expression if it is safe', () => {
        const safeRegex = /(xx)+y/gmi

        expect(() => ValidateRegex.execute(safeRegex)).not.to.throw()
    })
})