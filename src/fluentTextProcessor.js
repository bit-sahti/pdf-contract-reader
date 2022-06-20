const { ValidateRegex } = require('./util')

class FluentTextProcessor {
    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        const personMatcher = ValidateRegex.execute(/(?<=(ontratante|contratada):\s{1})(?!\s)(.*\n.*?)$/gmi)

        const people = this.#content.match(personMatcher)
        
        this.#content = people

        return this
    }

    build() {
        return this.#content
    }
}

module.exports = { FluentTextProcessor }