'use strict'

const pdfParser = require('pdf-parse')
const { readFile, writeFile } = require('fs/promises')
const { join } = require('path')
const { TextProcessorFacade } = require('./textProcessorFacade')

;(async () => {
    try {
        const contractPath = join(__dirname, '../docs/contrato.pdf')
        const extractedDataPath = join(__dirname, '../docs/extractedData.json')

        const dataBuffer = await readFile(contractPath)

        const rawData = await pdfParser(dataBuffer)

        const textProcessor = new TextProcessorFacade(rawData.text)

        const extractedInfo = textProcessor.getPeopleFromData()

        await writeFile(extractedDataPath, JSON.stringify(extractedInfo))
    } catch (error) {
        console.log(error)
    }
})()