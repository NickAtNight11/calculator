import React, { useState, useEffect } from 'react'
import './Calculator.css'

function Calculator() {
    const [operand_one, setOperandOne] = useState("");
    const [operator, setOperator] = useState("");
    const [operand_two, setOperandTwo] = useState("");
    const [result, setResult] = useState(0);
    const [display, setDisplay] = useState("0");
    const [fulldisplay, setFullDisplay] = useState("");

    useEffect(() => {
        window.addEventListener("keydown", keyPressed);
        return () => {
            window.removeEventListener("keydown", keyPressed);
        };
    });
    
    let keyPressed = ((e) => {
        let k = e.key;
        console.log(k);
        if(k.toUpperCase() === "C") {
            clearDisplay();
        }
        else if(k === "=" || k === "Enter") {
            calculateResult();
        }
        else if(k === "Backspace") {
            changeOperand("DEL");
        }
        else if(k === "." || (k.charCodeAt(0) >= 48 && k.charCodeAt(0) <= 57)){
            changeOperand(k);
        }
        else if(k === "+" || k === "-" || k === "*" || k === "/") {
            changeOperator(k);
        }
    });

    let changeOperand = ((o) => {
        let op = "";
        let changeable = true;
        if(result !== 0 && operand_one !== "" && operator === "" && o !== "DEL") {
            clearDisplay();
            setOperandOne(o);
            setDisplay(o);
        }
        else {
            if(operator === "") {
                if((operand_one.includes(".") && o === ".") || (operand_one.charAt(0) === "0" && o === "0")) {
                    changeable = false;
                }
                if(changeable) {
                    op = (o === "DEL") ? operand_one.slice(0, operand_one.length-1) : operand_one.concat(o);
                    setOperandOne(op);
                    setDisplay(op);
                }
            }
            else {
                if((operand_two.includes(".") && o === ".") || (operand_one.charAt(0) === "0" && o === "0")) {
                    changeable = false;
                }
                if(changeable) {
                    op = (o === "DEL") ? operand_two.slice(0, operand_two.length-1) : operand_two.concat(o);
                    if(operand_two === "") {
                        setFullDisplay(operand_one + " " + operator + " " + operand_two);
                    }
                    setOperandTwo(op);
                    setDisplay(op);
                }
            }
        }
    });
      
    let changeOperator = ((o) => {
        if(operand_two !== "") {
            if(operand_two === "-") {
                setOperandTwo("");
            }
            else {
                calculateResult();
            }
            setOperator(o);
        }
        else if(operator !== "" && o === "-") {
            changeOperand("-")
        }
        else {
            setOperator(o);
        }
        setFullDisplay(operand_one + " " + operator + " " + operand_two);
        setDisplay(o);
    });
    
    let clearDisplay = (() => {
        setOperandOne("");
        setOperator("");
        setOperandTwo("");
        setResult(0);
        setFullDisplay("");
        setDisplay("0");
    });
      
    let calculateResult = (() => {
        let op1 = parseFloat(operand_one);
        let op2 = parseFloat(operand_two);
        let answer = 0;
        switch(operator) {
            case "+": 
            answer = op1 + op2;
            break;
            case "-": answer = op1 - op2;
            break;
            case "*": answer = op1 * op2;
            break;
            case "/": answer = op1 / op2;
            break;
            default: answer = (isNaN(op1)) ? result : op1;
        }
        setOperandOne(answer.toString());
        setOperator("");
        setOperandTwo("");
        setResult(answer);
        setFullDisplay(operand_one + " " + operator + " " + operand_two);
        setDisplay(+parseFloat(answer).toFixed(5));
    });
      
     
    return (
        <div id="calculator">
            <div id="display">{display}</div>
            <div id="full-display">{fulldisplay}</div>
            <div id="button-grid">
                <div id="clear" className="calc-button large-button white-button" onClick={clearDisplay}>C</div>
                <div className="calc-button small-button white-button" onClick={() => changeOperand("DEL")}>{'\u2190'}</div>
                <div id="divide" className="calc-button small-button white-button" onClick={() => changeOperator("/")}>{'\u00F7'}</div>
                <div id="one" className="calc-button small-button red-button" onClick={() => changeOperand("1")}>1</div>
                <div id="two" className="calc-button small-button red-button" onClick={() => changeOperand("2")}>2</div>
                <div id="three" className="calc-button small-button red-button" onClick={() => changeOperand("3")}>3</div>
                <div id="multiply" className="calc-button small-button white-button" onClick={() => changeOperator("*")}>*</div>
                <div id="four" className="calc-button small-button red-button" onClick={() => changeOperand("4")}>4</div>
                <div id="five" className="calc-button small-button red-button" onClick={() => changeOperand("5")}>5</div>
                <div id="six" className="calc-button small-button red-button" onClick={() => changeOperand("6")}>6</div>
                <div id="subtract" className="calc-button small-button white-button" onClick={() => changeOperator("-")}>-</div>
                <div id="seven" className="calc-button small-button red-button" onClick={() => changeOperand("7")}>7</div>
                <div id="eight" className="calc-button small-button red-button" onClick={() => changeOperand("8")}>8</div>
                <div id="nine" className="calc-button small-button red-button" onClick={() => changeOperand("9")}>9</div>
                <div id="add" className="calc-button small-button white-button" onClick={() => changeOperator("+")}>+</div>
                <div id="decimal" className="calc-button small-button red-button" onClick={() => changeOperand(".")}>.</div>
                <div id="zero" className="calc-button small-button red-button" onClick={() => changeOperand("0")}>0</div>
                <div id="equals" className="calc-button large-button white-button" onClick={calculateResult}>=</div>
            </div>
        </div>
    );
}

export default Calculator