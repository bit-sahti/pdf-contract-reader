'use strict'

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdfParser = require('pdf-parse')

;(async () => {
    const dataBuffer = await readFile(join(__dirname, '../docs/contrato.pdf'))

    const data = await pdfParser(dataBuffer)

    console.log(data.text)
})()