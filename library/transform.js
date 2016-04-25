function stringNumbersToInt(curr) {
    var newCurr = parseFloat(curr);
    if (newCurr) {
        return newCurr;
    }
    else return curr;
}

function noEmptyStrings(curr){
    if (curr) {
            return curr;
        }
}

function toNumStringArray(someString) {
    
    var arr = someString.replace(/\s/g, "").split(/([\+\-\*\/\^\(\)])/);

    arr = arr.map(stringNumbersToInt);

    arr = arr.filter(noEmptyStrings);

    var i = 1;
    while (i < arr.length) {
        if (arr[i] === "-") {
            if (typeof arr[i - 1] === "number") {
                arr[i] = "+-";
            }
        }
        if (arr[i] === "(") {
            if (typeof arr[i - 1] === "number") {
                arr[i] = "*(";
            }
        }
        if (arr[i] === ")") {
            if (typeof arr[i + 1] === "number") {
                arr[i] = ")*";
            }
        }
        i++;
    }
    arr = arr.join("");
    arr = arr.split(/([\+\*\/\^\(\)])/);

    arr = arr.filter(noEmptyStrings);
    
    return arr = arr.map(stringNumbersToInt);
    
}

module.exports = {
    toNumStringArray: toNumStringArray
}

