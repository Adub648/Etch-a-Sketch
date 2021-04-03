// define values
let maxRows = 16;
let maxCols = 16;
let boxColor = "black";
let rainbowColor = false;
let rainbowColorEraser = false;
const gridSize = document.getElementById("gridSize");
const eraserBtn = document.getElementById("eraser");
const rainbowBtn = document.getElementById("rainbow");
const darknessBtn = document.getElementById("darkness");

// generate initial grid
generateDivs();

// grid size button
gridSize.addEventListener("click", function () {
    newGrid(gridSize);
    gridSize.classList.toggle("btnPressed");
});

// eraser button
eraserBtn.addEventListener("click", function () {
    eraser();
    eraserBtn.classList.toggle("btnPressed");
});

// rainbow button
rainbowBtn.addEventListener("click", function () {
    rainbow();
    rainbowBtn.classList.toggle("btnPressed");
});

// enabling and disabling eraser function
function eraser() {
    if (boxColor !== "white") {
        rainbowColor = false;
        boxColor = "white";
    } else {
        if (rainbowColorEraser == true) {
            rainbowColor = true;
        } else {
            rainbowColor = false;
            boxColor = "black";
        }        
    }

    if (rainbowBtn.disabled == false) {
        rainbowBtn.disabled = true;
    } else {
        rainbowBtn.disabled = false;
    }
}

// enabling and disabling rainbow function
function rainbow() {
    if (rainbowColor == false) {
        rainbowColor = true;
        rainbowColorEraser = true;
    } else {
        boxColor = "black";
        rainbowColor = false;
        rainbowColorEraser = false;
    }
}

function changeColors(e) {
    // change color of square
    if (rainbowColor == true) {
        e.target.style.backgroundColor =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    }  else {
        e.target.style.backgroundColor = boxColor;
    }
}

function newGrid(gridSize) {
    // prompt for size of grid
    gridSize = prompt("Size of grid (1-64):", "");
    maxRows = gridSize;
    maxCols = gridSize;
    // verify correct values entered
    if (isNaN(gridSize) || gridSize <= 0 || gridSize > 64) {
        gridSize = undefined;
        newGrid();
    }
    // generate new grid
    deleteDivs();
    generateDivs(maxRows, maxCols);
}

function deleteDivs() {
    // delete previous grid
    const deleteContainer = document.querySelector("#divContainer");
    deleteContainer.remove();
}

// generate the grid
function generateDivs() {
    // grid default values
    let divContainer = document.createElement("div");
    divContainer.id = "divContainer";
    divContainer.classList.add("grid");
    document.getElementById("body").appendChild(divContainer);
    
    // set the number of rows and columns in the grid
    setGridSize(divContainer);

    // create individual grid boxes
    for (let i = 0; i < maxCols * maxRows; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("divBox");
        newDiv.addEventListener("mouseover", changeColors);
        divContainer.appendChild(newDiv);
    }
}

// set how many rows and columns in the grid

function setGridSize(divContainer) {
    divContainer.style.gridTemplateColumns = `repeat(${maxCols}, 1fr)`;
    divContainer.style.gridTemplateRows = `repeat(${maxRows}, 1fr)`;
}