const { describe, it } = require('mocha')
const { expect } = require('chai')

const { FluentTextProcessor } = require('../src/fluentTextProcessor')

const mockText = require('./mocks/valid')
const { Person } = require('../src/person')

describe('[FluentTextProcessor] test suite', () => {
    it('should return the content on build', () => {
        const fluentTextProcessor = new FluentTextProcessor(mockText)

        const result = fluentTextProcessor.build()

        expect(result).to.be.deep.equal(mockText)
    })

    it("should extract people's data", () => {
        const fluentTextProcessor = new FluentTextProcessor(mockText)
        const expected = [
            [
               'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
                'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
            ].join('\n'),
            [
                'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
                'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. '
            ].join('\n')
        ]

        const result = fluentTextProcessor.extractPeopleData().build()

        expect(result).to.be.deep.equal(expected)
    })

    it('should divide the data into columns', () => {
        const extractedText = [[
            'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
             'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
         ].join('\n')]
         
         const expected = [
             [
                 'Xuxa da Silva',
                 ' brasileira',
                 ' casada',
                 ' CPF 235.743.420-12',
                 ' residente e \ndomiciliada a Rua dos bobos',
                 ' zero',
                 ' bairro Alphaville',
                 ' São Paulo. '
                ]
            ]
            
        const fluentTextProcessor = new FluentTextProcessor(extractedText)

        const result = fluentTextProcessor.divideTextInColumns().build()

        expect(result).to.be.deep.equal(expected)
    })

    it('should trim empty spaces', () => {
        const extractedText = [
            [
                'Xuxa da Silva',
                ' brasileira',
                ' casada',
                ' CPF 235.743.420-12',
                ' residente e \ndomiciliada a Rua dos bobos',
                ' zero',
                ' bairro Alphaville',
                ' São Paulo. '
            ]
        ]
        
        const expected = [
            [
                'Xuxa da Silva',
                'brasileira',
                'casada',
                'CPF 235.743.420-12',
                'residente e domiciliada a Rua dos bobos',
                'zero',
                'bairro Alphaville',
                'São Paulo.'
            ]
        ]

        const fluentTextProcessor = new FluentTextProcessor(extractedText)

        const result = fluentTextProcessor.trimSpaces().build()

        expect(result).to.be.deep.equal(expected)
    })

    it('should build a person instance from text', () => {
        const extractedText = [
            [
                'Xuxa da Silva',
                'brasileira',
                'casada',
                'CPF 235.743.420-12',
                'residente e domiciliada a Rua dos bobos',
                'zero',
                'bairro Alphaville',
                'São Paulo.'
            ]
        ]

        const expected = [
            {
                name: 'Xuxa da Silva',
                nacionality: 'Brasileira',
                civilState: 'Casada',
                document: '23574342012',
                street: 'Rua dos Bobos',
                number: 'zero',
                district: 'Alphaville',
                city: 'São Paulo'
            }
        ]

        const fluentTextProcessor = new FluentTextProcessor(extractedText)

        const result = fluentTextProcessor.mapPeople().build()

        expect(result[0]).to.be.instanceOf(Person)
        expect(result).to.be.deep.equal(expected)
    })
})