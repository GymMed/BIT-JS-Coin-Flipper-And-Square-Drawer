const successClasses = "from-green-500 to-green-800";
const failiureClasses = "from-red-500 to-red-800";

function addUncontainedClasses(array, dom) {
    if (!Array.isArray(array)) {
        console.log("Passed not array to addUncontainedClasses");
        return;
    }

    let arrayLength = array.length;

    for (let currentClass = 0; currentClass < arrayLength; currentClass++) {
        if (!dom.classList.contains(array[currentClass])) {
            dom.classList.add(array[currentClass]);
        }
    }
}

function removeContainedClasses(array, dom) {
    if (!Array.isArray(array)) {
        console.log("Passed not array to removeContainedClasses");
        return;
    }

    let arrayLength = array.length;

    for (let currentClass = 0; currentClass < arrayLength; currentClass++) {
        if (dom.classList.contains(array[currentClass])) {
            dom.classList.remove(array[currentClass]);
        }
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
