/*
the Game of life: a tribute to John Conway

the field is a grid of cells each having a life value
a cell dies with less than 2 living neighbors
a cell dies with more than 3 living neighbors
a cell is born when neighbored by exactly 3 
a cell lives if next to 2 or 3 neighbors, but the life value decreases each round

*/

var data;           //2d data array
var grid = 7;      //cell size
var matrixH = 70;   //rows
var matrixW = 70;   //columns
var matrixWidth = matrixW*grid;  //to draw canvas
var matrixHeight = matrixH*grid; //to draw canvas

var speed = 5;          //clock rate of simulation
var threshold = 90;     //cut off value for cell to die
var fade = 0.70;        //reduction of life at each tick

function setup() {
    var canvas = createCanvas(matrixWidth, matrixHeight);
    canvas.parent("sketch-div"); //handle for the domon in the html file

    //create a new matrix
    data = new Array(matrixH);
    for (let y=0; y<matrixH; y++){
        data[y] = new Array(matrixW);
    }

    //seed matrix
    for (let y=0; y < matrixH; y++){
        for (let x=0; x < matrixW; x++){
            if (y==0 || x==0) { 
                data[y][x] = 0 //set border value to 0
            } else if (y==matrixH-1 || x==matrixW-1) { 
                data[y][x] = 0;
            } else {
                data[y][x] = round(random(threshold+25)); //create some variablity in initial cells
            }
        }
    }

    // console.log("speed ", speed);
    // console.log("threshold ", threshold);
    // console.log("fade ", fade);
}

function draw() {
    background(20);
    //drawGrid(); 
    
    fade = parseFloat(document.getElementById("fadeRange").value);
    speed = parseInt(document.getElementById("speedRange").value);
    frameRate(speed);

    //only look at cells one unit in from border. Border cells always 0
    for (let y=1; y < (matrixH-1); y++){
        for (let x=1; x < (matrixW-1); x++){
            
            //count the cells around target cell
            let count = 0; 
            if (data[y-1][x-1] > threshold) { count++; }
            if (data[y-1][x] > threshold) { count++; }
            if (data[y-1][x+1] > threshold) { count++; }
        
            if (data[y][x-1] > threshold) { count++ };
            if (data[y][x+1] > threshold) { count++ };
                
            if (data[y+1][x-1] > threshold) { count++ };
            if (data[y+1][x] > threshold) { count++ };
            if (data[y+1][x+1] > threshold) { count++ }; 
            
            //decide what to do once count is finished
            if (count < 2 || count > 3) {
                 data[y][x] = 0;             //died
            } else if (count == 3) {
                 data[y][x] = 255;           //born
            } else {
                data[y][x] = data[y][x]*fade; //progressively reduce life value
            }

            drawCell(y,x);
        }
    }
}

function drawCell(y,x) {
    noStroke();
    fill(255, 240, 170, data[y][x]); //color of the cell
    ellipse(find(x), find(y), grid*0.75, grid*0.75);

    function find(a){
        return (a*grid)+(grid/2);
    }
}

function drawGrid(){
    stroke(35);
    strokeWeight(1);
    for (let i=0; i<matrixW; i++){
        for (let j=0; j<matrixH; j++){
            line(i*grid, 0, i*grid, matrixHeight);
            line(0, j*grid, matrixWidth, j*grid);
        }
    }
}
