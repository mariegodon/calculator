function powerOf(a, b){
    return Math.pow(a, b);
}

function add(a, b){
    return(a + b);
}

function mult(a, b){
    return (a*b);
}

function div(a, b){
    return (a/b);
}

function sub(a, b){
    return (a-b);
}

//take an expression without brackets, a math parameter +-/^*, and an operation add, sub etc
function singleOperation(splitExpression, charParameter, operation){
    if (splitExpression.indexOf(charParameter) !== -1){
        //locate operator
        var index = splitExpression.indexOf(charParameter);
        //change needed values to numbers
        if (typeof splitExpression[index-1] !== "number") {
            splitExpression[index-1] = parseInt(splitExpression[index-1]);
        }
        if (typeof splitExpression[index+1] !== "number") {
            splitExpression[index+1] = parseInt(splitExpression[index+1]);
        }
        //perform given operation with numbers before and after operator
        var toReplace = (operation(splitExpression[index-1], splitExpression[index+1]));
        //splice new total into original split expression
        splitExpression.splice(index-1, 3, toReplace);
    }
    return splitExpression;
}

//take a set of operations without brackets
//everytime you do an operation, restart function
function performOperation(splitExpression){
    //check first for power, highest precedence
    if (splitExpression.indexOf("^") !== -1){
        performOperation(singleOperation(splitExpression, '^', powerOf));
    }
    //next check for multiplication, and then div
    else if (splitExpression.indexOf("*") !== -1) {
        //if both mult and div, do whichever one is first
        if (splitExpression.indexOf("/") !== -1){
            if (splitExpression.indexOf("*") < splitExpression.indexOf("/")){
                performOperation(singleOperation(splitExpression, '*', mult));
            } else {
                performOperation(singleOperation(splitExpression, '/', div));
            }
        }
         performOperation(singleOperation(splitExpression, '*', mult));
    }
    else if (splitExpression.indexOf("/") !== -1){
        performOperation(singleOperation(splitExpression, '/', div));   
    }
    //after mult/div check for add/sub
    else if (splitExpression.indexOf("+") !== -1){
        //if both, do whichever is first
        if(splitExpression.indexOf("-") !== -1){
            if (splitExpression.indexOf("+") < splitExpression.indexOf("-")){
                performOperation(singleOperation(splitExpression, '+', add));
            } else {
                performOperation(singleOperation(splitExpression, '-', sub));
            }
        }
        performOperation(singleOperation(splitExpression, '+', add));
    }
    else if (splitExpression.indexOf("-") !== -1){
        performOperation(singleOperation(splitExpression, '-', sub));
    }
    //if not operations are left, return total 
    return(splitExpression);
}

module.exports = {
    performOperation: performOperation
}