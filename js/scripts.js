

const defaultGridSize = 16;
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

const grid = document.querySelector(".grid");
let rangeSliderVal = document.getElementById("myRange").value;
const eraserBtn = document.getElementById("eraser-btn");
const brushBtn = document.getElementById("brush-btn");
const rangeSlider = document.getElementById("myRange");
const gridSizeText = document.getElementById("grid-size");
const  clearBtn = document.getElementById("clear-btn");
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
      if(isMouseDown)
          {
              const myCell = e.target;
              myCell.style.backgroundColor = pickedColor;
          }
  }
  function changeColorClick(e)
  {
              const myCell = e.target;
              myCell.style.backgroundColor = pickedColor;
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
    for(let i = 0; i < dim*dim; i++)
    {
            const cell = document.createElement('div');
            cell.addEventListener('mouseover', changeColorHold);
            cell.addEventListener('click', changeColorClick);
            cell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px`;
            grid.appendChild(cell);
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
}
function changetoBrush()
{
    pickedColor = colorPicker.value;
}
function checkForGridChange(e)
{
        rangeSliderVal = e.target.value;
        clearGrid();
        gridSizeText.textContent = `${rangeSliderVal} X ${rangeSliderVal}`;
}
colorPicker.addEventListener('input', changePickedColor);
rangeSlider.addEventListener('input', checkForGridChange);
clearBtn.addEventListener('click', clearGrid);
eraserBtn.addEventListener('click', changeToEraser)
brushBtn.addEventListener('click', changetoBrush )
generateGrid();
console.log(pickedColor);