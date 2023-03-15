document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

let currentColor = "#000000";
let userSelection = "color";
let currentSize = 16;
let mouseDown = false;

const colorChoice = document.getElementById("colorChoice");
const colorButton = document.getElementById("colorButton");
const rainbowButton = document.getElementById("rainbowButton");
const eraserButton = document.getElementById("eraserButton");
const clearButton = document.getElementById("clearButton");
const size = document.getElementById("gridDimension");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

colorChoice.oninput = (e) => setColor(e.target.value);
colorButton.onclick = () => setSelection("color");
rainbowButton.onclick = () => setSelection("rainbow");
eraserButton.onclick = () => setSelection("eraser");
clearButton.onclick = () => reload();
sizeSlider.onmousemove = (e) => newSize(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function setColor(newColor){
    currentColor = newColor;
}

function setSelection(newSelection){
    activateButton(newSelection);
    userSelection = newSelection;
}

function changeSize(val){
    setSize(val);
    newSize(val);
    reload();
}

function setSize(newSize){
    currentSize = newSize;
}

function newSize(val){
    size.innerHTML = `${val} x ${val}`
}

function reload(){
    clear();
    setGrid(currentSize)
}

function clear(){
    grid.innerHTML = ""
}

function setGrid(val){
    grid.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${val}, 1fr)`;

    for(let i=0; i<val**2; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return

    if(userSelection === "color"){
        e.target.style.backgroundColor = currentColor;
    }
    else if(userSelection === "rainbow"){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else if(userSelection === "eraser"){
        e.target.style.backgroundColor = "#FFFFFF";
    }
}

function activateButton(newChoice){
    if(userSelection === "color"){
        colorButton.classList.remove("active");
    }
    else if(userSelection === "rainbow"){
        rainbowButton.classList.remove("active");
    }
    else if(userSelection === "eraser"){
        eraserButton.classList.remove("active");
    }

    if(newChoice === "color"){
        colorButton.classList.add("active");
    }
    else if(newChoice === "rainbow"){
        rainbowButton.classList.add("active");
    }
    else if(newChoice === "eraser"){
        eraserButton.classList.add("active");
    }
}

window.onload = () => {
    setGrid(16)
    activateButton("color")
    currentColor = "#000000";
    userSelection = "color";
}