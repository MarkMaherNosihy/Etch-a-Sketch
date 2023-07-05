
const defaultColor = 'black';
const defaultGridSize = 16;

const grid = document.querySelector(".grid");
let rangeSliderVal = document.getElementById("myRange").value;
const rangeSlider = document.getElementById("myRange");
const gridSizeText = document.getElementById("grid-size");
const  clearBtn = document.getElementById("clear-btn");
let isMouseDown = false;

grid.addEventListener('mousedown', () =>{
    isMouseDown = true;
})
grid.addEventListener('mouseup', () =>{
    isMouseDown = false;
})
grid.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

  function changeColor(e)
  {
      if(isMouseDown)
          {
              const myCell = e.target;
              myCell.style.backgroundColor = defaultColor;
          }
  }

function generateGrid(dim = 16)
{
    const cellSize = 500 / dim;
    //Getting the grid and creating a cell element
    for(let i = 0; i < dim*dim; i++)
    {
            const cell = document.createElement('div');
            cell.addEventListener('mouseover', changeColor);
            cell.addEventListener('mousedown', changeColor);
            cell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px`;
            grid.appendChild(cell);
    }    
}
function clearGrid()
{
    grid.innerHTML = "";
    generateGrid(rangeSliderVal);
}
function checkForGridChange(e)
{
        rangeSliderVal = e.target.value;
        clearGrid();
        gridSizeText.textContent = `${rangeSliderVal} X ${rangeSliderVal}`;
}

rangeSlider.addEventListener('input', checkForGridChange);
clearBtn.addEventListener('click', clearGrid);
generateGrid();
