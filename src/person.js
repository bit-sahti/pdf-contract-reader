const { ValidateRegex } = require("./util")

class Person {
    constructor([
        name,
        nacionality,
        civilState,
        document,
        street,
        number,
        district,
        city
    ]) {
        this.name = this.#normalizeLetterCases(name) 
        this.nacionality = this.#normalizeLetterCases(nacionality) 
        this.civilState = this.#normalizeLetterCases(civilState) 
        this.document = this.#extractDocumentNumber(document) 
        this.street = this.#extractStreetName(street) 
        this.number = number 
        this.district = this.#extractDistrictName(district) 
        this.city = this.#removePonctuationCharacters(city) 
    }

    #normalizeLetterCases(name){
        const regex = ValidateRegex.execute(/(?:(?!\b[dn].s?\b))(\w)(\w{2,})/gi)

        return name.replace(regex, (_, group1, group2) => {
            return group1.toUpperCase() + group2.toLowerCase()
        })
    }

    #extractDocumentNumber(document) {
        const regex = ValidateRegex.execute(/[^\d]+/g)

        return document.replace(regex, '')
    }

    #extractStreetName(street) {
        const regex = ValidateRegex.execute(/(?:rua).+/gi)

        return this.#normalizeLetterCases(street.match(regex).join())
    }

    #extractDistrictName(district) {
        const regex = ValidateRegex.execute(/(?<=\s).+/gi)

        return district.match(regex).join()
    }

    #removePonctuationCharacters(word) {
        const regex = ValidateRegex.execute(/[\.,!\?;]/gi)

        return word.replace(regex, '')
    }
}

module.exports = { Person }