
const defaultColor = 'black';
const defaultGridSize = 16;

const grid = document.querySelector(".grid");

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
    const cellSize = 800 / dim;
    //Getting the grid and creating a cell element
    for(let i = 0; i < dim; i++)
    {
        for(let j = 0; j < dim; j++)
        {
            const cell = document.createElement('div');
            cell.addEventListener('mouseover', changeColor);
            cell.addEventListener('mousedown', changeColor);
            cell.style.cssText = `width: ${cellSize}px; height: ${cellSize}px`;
            grid.appendChild(cell);
        }
    }    
}


generateGrid();
