const { describe, it } = require('mocha')
const { expect } = require('chai')

const { Person } = require('../src/person')

describe('[Person] test suite', () => {
    it('should return a person instance', () => {
        const data = [
            'xUxa da siLva',
            'brasileira',
            'casada',
            'CPF 235.743.420-12',
            'residente e domiciliada a Rua dos bobos',
            'zero',
            'bairro Alphaville',
            'São Paulo.'
        ]

        const expected = {
            name: 'Xuxa da Silva',
            nacionality: 'Brasileira',
            civilState: 'Casada',
            document: '23574342012',
            street: 'Rua dos Bobos',
            number: 'zero',
            district: 'Alphaville',
            city: 'São Paulo'
        }

        const person = new Person(data)

        expect(person).to.be.deep.equal(expected)
    })
}) 