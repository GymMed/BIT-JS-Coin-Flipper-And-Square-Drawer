const COIN_POSSABILITIES_ENUM = {
    CoatOfArms: 0,
    Number: 1,
};

const STOP_FLIPPING_ENUM = {
    Never: 0,
    CoatOfArmsOnce: 1,
    CoatOfArmsThreeTimes: 2,
    CoatOfArmsThreeTimesInRown: 3,
};

const coinPossabilitiesNames = ["Coat Of Arms", "Number"];
let coinPossabilitiesCounts = [];
let coinPossabilitiesCountsInRow = [];

const coinPossabilitiesLithuanianInitiatives = ["H", "S"];

const totalCoinPossabilities = Object.keys(COIN_POSSABILITIES_ENUM).length;
let flipEverySeconds = 200;
let flipTimeout = null;
let stopChoice = STOP_FLIPPING_ENUM.Never;

const successArray = successClasses.split(" ");
const failiureArray = failiureClasses.split(" ");

const coinFlipBtn = document.querySelector("#coin-flip-btn");
const coinFlipStopBtn = document.querySelector("#coin-flip-stop-btn");
const coinFlipResults = document.querySelector("#coin-flip-results");

coinFlipStopBtn.addEventListener("click", function () {
    tryStopFlipping();
});

coinFlipBtn.addEventListener("click", function () {
    removeContainedClasses(failiureArray, coinFlipResults);
    addUncontainedClasses(successArray, coinFlipResults);

    coinPossabilitiesCounts = fillNewArray(totalCoinPossabilities);
    coinPossabilitiesCountsInRow = fillNewArray(totalCoinPossabilities);

    startFlippingCoin();
});

function startFlippingCoin() {
    tryStopFlipping();
    const randomResult = rand(0, totalCoinPossabilities - 1);
    coinPossabilitiesCounts[randomResult]++;

    const currentCoinResultInRowCount =
        coinPossabilitiesCountsInRow[randomResult] + 1;
    coinPossabilitiesCountsInRow = fillNewArray(totalCoinPossabilities);
    coinPossabilitiesCountsInRow[randomResult] = currentCoinResultInRowCount;

    printFlipResult(randomResult);

    if (shouldStop(randomResult, stopChoice)) {
        tryStopFlipping();
        removeContainedClasses(successArray, coinFlipResults);
        addUncontainedClasses(failiureArray, coinFlipResults);
        return;
    }

    flipTimeout = setTimeout(startFlippingCoin, flipEverySeconds);
}

function printFlipResult(coinEnum, withInitiatives = true) {
    coinFlipResults.innerHTML += `${coinPossabilitiesNames[coinEnum]}`;

    if (withInitiatives)
        coinFlipResults.innerHTML += ` (${coinPossabilitiesLithuanianInitiatives[coinEnum]})`;

    coinFlipResults.innerHTML += "<br>";
    coinFlipResults.scrollTop = coinFlipResults.scrollHeight;

    if (coinFlipResults.classList.contains("hidden"))
        coinFlipResults.classList.remove("hidden");
}

function tryStopFlipping() {
    if (flipTimeout !== null) {
        clearTimeout(flipTimeout);
    }
}

function shouldStop(coinEnum, stopEnum) {
    switch (stopEnum) {
        case STOP_FLIPPING_ENUM.CoatOfArmsOnce: {
            if (coinEnum === COIN_POSSABILITIES_ENUM.CoatOfArms) return true;
        }
        case STOP_FLIPPING_ENUM.CoatOfArmsThreeTimes: {
            if (
                coinPossabilitiesCounts[COIN_POSSABILITIES_ENUM.CoatOfArms] > 2
            ) {
                return true;
            }
        }
        case STOP_FLIPPING_ENUM.CoatOfArmsThreeTimesInRown: {
            if (
                coinPossabilitiesCountsInRow[
                    COIN_POSSABILITIES_ENUM.CoatOfArms
                ] > 2
            ) {
                return true;
            }
        }
        default:
            return false;
    }
}

function fillNewArray(toNumber) {
    let newCountsArray = [];

    for (let currentNumber = 0; currentNumber < toNumber; currentNumber++) {
        newCountsArray.push(0);
    }

    return newCountsArray;
}

//Radios

let firstEncounter = document.querySelector("#firstEncounter");
let thirdEncounter = document.querySelector("#thirdEncounter");
let thirdRowEncounter = document.querySelector("#thirdRowEncounter");

firstEncounter.addEventListener("click", function () {
    stopChoice = STOP_FLIPPING_ENUM.CoatOfArmsOnce;
});

thirdEncounter.addEventListener("click", function () {
    stopChoice = STOP_FLIPPING_ENUM.CoatOfArmsThreeTimes;
});

thirdRowEncounter.addEventListener("click", function () {
    stopChoice = STOP_FLIPPING_ENUM.CoatOfArmsThreeTimesInRown;
});
