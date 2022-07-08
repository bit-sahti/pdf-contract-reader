const { FluentTextProcessor } = require("./fluentTextProcessor");

class TextProcessorFacade {
    constructor(content){
        this.textProcessor = new FluentTextProcessor(content)
    }

    getPeopleFromData(){
        return this.textProcessor
                    .extractPeopleData()
                    .divideTextInColumns()
                    .trimSpaces()
                    .mapPeople()
                    .build()
    }
}

module.exports = { TextProcessorFacade }