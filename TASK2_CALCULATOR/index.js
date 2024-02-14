let screen = document.getElementById("screen")
let btnNum = document.getElementsByClassName("darkgrey")
let highlighted = null;
let secopr = null;
let firstNum = null;
let result = null;
for (let i = 0; i < btnNum.length;i++){
     btnNum[i].addEventListener("click",(event)=>{
     let num = event.target.innerHTML
     screen.innerHTML += parseInt(num)
})
}
let reset = () => {
     let res = document.getElementById("reset")
     screen.innerHTML = "0"
}
let opr = document.getElementsByClassName("orange")
for (let i = 0; i < opr.length; i++) {
    opr[i].addEventListener("click", (event) => {
        if (highlighted) {
            highlighted.classList.remove("default");
            highlighted.classList.add("orange");
        }

        event.target.classList.remove("orange");
        event.target.classList.add("default");
        highlighted = event.target;
        console.log(highlighted)
     
        firstNum = parseInt(screen.innerHTML);
        screen.innerHTML = "";
    });
}


document.getElementById("equals").addEventListener("click", () => {
    if (firstNum === null) {
        console.log("Please enter a number and select an operator before clicking equals.");
        return;
    }
    highlighted.classList.remove("default")
    highlighted.classList.add("orange")
    let secondNum = parseInt(screen.innerHTML);

    switch (highlighted.innerHTML) {
        case "+":
            result = firstNum + secondNum;
            console.log(result)
            break;
        case "-":
            result = firstNum - secondNum;
            console.log(result)
            break;
        case "*":
            result = firstNum * secondNum;
            console.log(result)
            break;
        case "/":
            result = firstNum / secondNum;
            console.log(result)
            break;
        default:
            console.log("Unexpected operator: " + highlighted.innerHTML);
            return;
    }
    // display the result
    screen.innerHTML = result;
});
let signAlter = document.getElementById("sign-alter");
signAlter.addEventListener("click", () => {
    if (screen.innerHTML[0] === "") {
        screen.innerHTML = "-" + screen.innerHTML;
    } else if (screen.innerHTML[0] === "-") {
        screen.innerHTML = screen.innerHTML.substring(1); // Remove the '-' sign
    }
});
let percentFinder = document.getElementById("per")
percentFinder.addEventListener("click",() => {
    let percentValue = parseInt(screen.innerHTML)
    let result = percentValue / 100
    screen.innerHTML = result;
})
let decimal = document.getElementById("dot");
decimal.addEventListener("click",() => {
    if(screen.innerHTML.includes(".")) {
        screen.innerHTML
    } else {
    screen.innerHTML = screen.innerHTML + ".";
}
})