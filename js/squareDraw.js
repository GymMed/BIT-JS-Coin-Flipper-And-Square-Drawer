let squareDrawCanvasDom = document.querySelector("#square-draw-canvas");
let squareDrawBtn = document.querySelector("#square-draw-btn");
let squareBorderBtn = document.querySelector("#square-border-btn");

const starClasses = "";
squareDrawBtn.addEventListener("click", function () {
    squareDrawCanvasDom.innerHTML = getDrawnSquare();

    if (squareDrawCanvasDom.classList.contains("hidden"))
        squareDrawCanvasDom.classList.remove("hidden");
});

squareBorderBtn.addEventListener("click", function () {
    let storedText = squareDrawCanvasDom.innerHTML;

    if (storedText === "") {
        setDomTextAndShow(
            squareDrawCanvasDom,
            "You cannot draw border without square!"
        );
        return;
    }

    const brRegex = /<br>/g;
    const brOccurancesCount = (storedText.match(brRegex) || []).length;

    if (brOccurancesCount === 0) {
        setDomTextAndShow(squareDrawCanvasDom, "No row found!");
        return;
    }

    const blackRegex = /<black>(.*?)<\/black>/g;
    const blackMatches = storedText.match(blackRegex);

    let specialCharacter = "";
    let charactersUntilBr = "";
    let insertElement = "";
    let lineLength = 0;
    let uniqueLines = [];

    const textUntilBrRegex = /(.*?)(?:<br>)/gs;
    const textUntilBrMatches = Array.from(
        storedText.matchAll(textUntilBrRegex),
        (match) => match[1]
    );

    if (blackMatches === null) {
        charactersUntilBr = textUntilBrMatches[0].replace("<br>", "");
        specialCharacter = charactersUntilBr[0];
        lineLength = charactersUntilBr.length;
        insertElement = `<black>${specialCharacter}</black>`;
        uniqueLines = getUniqueElementsInArray(textUntilBrMatches);
    } else {
        let storedCharacters = textUntilBrMatches[0].replace("<br>", "");
        charactersUntilBr = blackMatches[1];
        specialCharacter = blackMatches[0];
        lineLength = storedCharacters.length / blackMatches[0].length;
        insertElement = specialCharacter;
        uniqueLines = getUniqueElementsInArray(textUntilBrMatches);
    }

    squareDrawCanvasDom.innerHTML = addBorderSquare(
        squareDrawCanvasDom,
        insertElement,
        uniqueLines,
        lineLength
    );
});

function removeBrForArray(array) {
    if (!Array.isArray(array))
        throw new Error("Passed not an array to array function!");

    let fixedArray = [];
    let arrayLength = array.length;

    for (
        let currentElement = 0;
        currentElement < arrayLength;
        currentElement++
    ) {
        fixedArray.push(array[currentElement].replace("<br>", ""));
    }

    return fixedArray;
}

function getUniqueElementsInArray(array) {
    if (!Array.isArray(array))
        throw new Error("Passed not an array to array function!");

    let arrayLength = array.length;
    let unqiueMatches = new Set();

    for (
        let currentElement = 0;
        currentElement < arrayLength;
        currentElement++
    ) {
        unqiueMatches.add(array[currentElement]);
    }

    return [...unqiueMatches];
}

function setDomTextAndShow(dom, text) {
    dom.textContent = text;

    if (dom.classList.contains("hidden")) dom.classList.remove("hidden");
}

function getDrawnSquare(symbol = "*", width = 10, height = 10) {
    let currentColumn = 0;
    let output = "";

    for (let currentRow = 0; currentRow < width; currentRow++) {
        for (currentColumn = 0; currentColumn < height; currentColumn++) {
            output += symbol;
        }
        output += "<br>";
    }

    return output;
}

//charactersLineCount is for cases where character is not actually single symbol
function addBorderSquare(
    dom,
    character = "*",
    uniqueCharactersLines,
    charactersLineCount
) {
    let changedLine = "";
    let newText = dom.innerHTML;
    let uniqueLinesCount = uniqueCharactersLines.length;

    for (let currentLine = 0; currentLine < uniqueLinesCount; currentLine++) {
        changedLine =
            character + uniqueCharactersLines[currentLine] + character;

        newText = newText.replaceAll(
            uniqueCharactersLines[currentLine],
            changedLine
        );
    }

    let fullNewLine = character;

    for (
        let currentCharacter = 0;
        currentCharacter < charactersLineCount;
        currentCharacter++
    ) {
        fullNewLine += character;
    }

    fullNewLine += character;

    let fullNewLineWithBr = fullNewLine + "<br>";
    return fullNewLineWithBr + newText + fullNewLineWithBr;
}
