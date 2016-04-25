var calculate = require("./library/calculate")

//take an array, get rid of empty strings
function getRidOfWhiteSpace(arrayWithoutSpaces, currentValue) {
    {
        if (currentValue) {
            arrayWithoutSpaces.push(currentValue);
        }
        return arrayWithoutSpaces;
    }
}

function calculator(someString) {
    
    //take a string, replaces spaces with empty string, split into array of numbers and characters
    var stringArrWithSpaces = (someString.replace(/\s/g, "").split(/([\+\-\*\/\^\(\)])/));
    //remove empty strings ie spaces
    var stringArr = stringArrWithSpaces.reduce(getRidOfWhiteSpace, []);
    //locate first open bracket in array
    var openBracket = stringArr.indexOf('(');
    while (openBracket < stringArr.length) {
        //if there is no open bracket ie only one mathematical expression
        if (openBracket === -1) {
            //do the math
            calculate.performOperation(stringArr);
            return (stringArr);
        }
        else {
            //locate the next opening and closing brackets
            var nextOpen = stringArr.indexOf('(', openBracket + 1);
            var nextClose = stringArr.indexOf(')', openBracket + 1);
            //check to see if current opening parentheses belongs to an inner bracket
            if (nextClose < nextOpen || nextOpen === -1) {
                //if yes, copy this bracket and do the math
                var insideParentheses = stringArr.slice(openBracket + 1, nextClose);
                var convertedBracket = (calculate.performOperation(insideParentheses));
                //replace this bracket in the array with the total
                stringArr.splice(openBracket, (nextClose - openBracket + 1), convertedBracket[0]);
                //restart searching from the first opening bracket
                openBracket = stringArr.indexOf('(')
            }
            else {
                //if not an inner bracket, go to next open parenthesis and restart 
                openBracket = nextOpen;
            }
        }
    }
    return stringArr[0];
}

//console.log(calculator("2*( 5* (10/3  * (2*33+7*9)+7*9) /  4 + (5+6))")); //1254.5
//console.log(2 * (5 * (10 / 3 * (2 * 33 + 7 * 9) + 7 * 9) / 4 + (5 + 6))); //1254.5

//console.log(calculator("5+((4*9)*6*3+5-182)+389")); //865
//console.log(5 + ((4 * 9) * 6 * 3 + 5 - 182) + 389); //865

//console.log(calculator("3^6*(9*6+5/(9+2987)+87*(932))")); //59149603.2166...
//console.log(Math.pow(3,6)*(9*6+5/(9+2987)+87*(932))); //59149603.2166...

console.log(calculator("420+(28*(3472/4*(7+4))-720-4-20*43/(7*29+3))+207"));
console.log(420+(28*(3472/4*(7+4))-720-4-20*43/(7*29+3))+207);

jdflsaj;sadhfasldhfa;
