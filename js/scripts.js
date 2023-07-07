

let defaultGridSize = 16;
let gridArray = [];
const colorPicker = document.getElementById("colorpicker");
// Find the stylesheet that contains the rules
var styleSheet = Array.from(document.styleSheets).find(function (sheet) {
    return sheet.href === null || sheet.href.startsWith(window.location.origin);
  });
  
  // Find the rule that matches the selector #colorpicker::-webkit-color-swatch
  var colorSwatch = Array.from(styleSheet.cssRules).find(function (cssRule) {
    return cssRule.selectorText === '#colorpicker::-webkit-color-swatch';
  });
  
let pickedColor = colorPicker.value;
let selectedMode = 'normal';
let fillStartCell;

const grid = document.querySelector(".grid");
let rangeSliderVal = document.getElementById("myRange").value;
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const brushBtn = document.getElementById("brush-btn");
const rangeSlider = document.getElementById("myRange");
const gridSizeText = document.getElementById("grid-size");
const  clearBtn = document.getElementById("clear-btn");
const fillBtn = document.getElementById("fill-btn");
let isMouseDown = false;

window.addEventListener('mousedown', () =>{
    isMouseDown = true;
})
window.addEventListener('mouseup', () =>{
    isMouseDown = false;
})
grid.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

  function changeColorHold(e)
  {
    const myCell = e.target;
      if(isMouseDown)
          {
            if(selectedMode == 'normal')
            {
                myCell.style.backgroundColor = pickedColor;
            }
            else if (selectedMode == 'rainbow')
            {
                let randomRed = Math.round(Math.random()* 255);
                let randomGreen = Math.round(Math.random()* 255);
                let randomBlue = Math.round(Math.random()* 255);
               myCell.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`;
            }
          }
  }
  function changeColorClick(e)
  {
              const myCell = e.target;
            if(selectedMode == 'normal')
            {
                myCell.style.backgroundColor = pickedColor;

            }
            else if (selectedMode == 'rainbow')
            {
                let randomRed = Math.round(Math.random()* 255);
                let randomGreen = Math.round(Math.random()* 255);
                let randomBlue = Math.round(Math.random()* 255);
               myCell.style.backgroundColor = `rgb(${randomRed},${randomGreen},${randomBlue})`;
            }
            else{
              let indices = getCellIndex(myCell);
              fillStartCell = myCell;
              fill(fillStartCell, indices[0], indices[1]);
            }
  }

  function changePickedColor(e)
  {
    pickedColor = e.target.value;
    colorSwatch.style.cssText = `
    box-shadow: 0 0 1rem ${pickedColor};
    border-radius: 50%;`
  }
function generateGrid(dim = 16)
{
    const cellSize = 500 / dim;
    //Getting the grid and creating a cell element
    for(let i = 0; i < dim; i++)
    {
            gridArray[i] = [];
            for(let j = 0; j < dim; j++)
            {
             const cell = document.createElement('div');
              cell.addEventListener('mouseover', changeColorHold);
              cell.addEventListener('click', changeColorClick);
              cell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px`;
              cell.style.backgroundColor = '#ffffff';
              gridArray[i][j] = cell;
              grid.appendChild(cell);
            }
    }    
}
function clearGrid()
{
    grid.innerHTML = "";
    generateGrid(rangeSliderVal);
}
function changeToEraser()
{
    pickedColor= "#ffffff"
    selectedMode = 'normal';
}
function changetoBrush()
{
    pickedColor = colorPicker.value;
    selectedMode = 'normal';
}
function checkForGridChange(e)
{
        rangeSliderVal = e.target.value;
        defaultGridSize = rangeSliderVal;
        clearGrid();
        gridSizeText.textContent = `${rangeSliderVal} X ${rangeSliderVal}`;
}
function isEmpty(cell)
{
  if(cell.style.backgroundColor == 'rgb(255, 255, 255)')
  {
    return true;
  }
  return false;
  
}
function getCellIndex(cell)
{
  for(let i = 0; i < defaultGridSize; i++)
  {
    
    for(let j = 0; j < defaultGridSize; j++)
    {
      if(cell == gridArray[i][j])
      return [i, j];
    }
  }
}

function fill(startCell, row, col)
{
  startCell.style.backgroundColor = pickedColor;
  if(!(col-1 < 0) && isEmpty(gridArray[row][col-1]))
  {
    fill(gridArray[row][col-1], row, col-1);
  }
  if (!(col+1 > (defaultGridSize - 1)) && isEmpty(gridArray[row][col+1]))
  {
    fill(gridArray[row][col+1], row, col+1);
  }
  if (!(row + 1 > (defaultGridSize - 1)) && isEmpty(gridArray[row+1][col]))
  {
    fill(gridArray[row+1][col], row+1, col);
  }
 if ( !(row-1 < 0) && isEmpty(gridArray[row-1][col]))
  {
    fill(gridArray[row-1][col], row-1, col);
  }
  return;
}


fillBtn.addEventListener('click', ()=> selectedMode = 'fill');
rainbowBtn.addEventListener('click', ()=> selectedMode = 'rainbow');
colorPicker.addEventListener('input', changePickedColor);
rangeSlider.addEventListener('input', checkForGridChange);
clearBtn.addEventListener('click', clearGrid);
eraserBtn.addEventListener('click', changeToEraser);
brushBtn.addEventListener('click', changetoBrush );
generateGrid();

