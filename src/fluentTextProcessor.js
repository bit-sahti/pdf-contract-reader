const { Person } = require('./person')
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

    divideTextInColumns() {
        const separator = ValidateRegex.execute(/,/)

        this.#content = this.#content.map(personData => personData.split(separator))

        return this
    }

    trimSpaces() {
        const emptySpaces = ValidateRegex.execute(/^[\s]+|[\s]+$|\n/g)

        this.#content = this.#content.map(personData => personData.map(item => item.replace(emptySpaces, '')))

        return this
    }

    mapPeople() {
        this.#content = this.#content.map(person => new Person(person))

        return this
    }

    build() {
        return this.#content
    }
}

module.exports = { FluentTextProcessor }