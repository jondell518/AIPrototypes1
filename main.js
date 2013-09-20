
var c = document.getElementById("mycanvas");
c.addEventListener('click',function(evt){
	var indexX = Math.floor(evt.clientX/(cellDimension+offset));
	var indexY = Math.floor(evt.clientY/(cellDimension+offset));
	//console.log("in event listener" + 	cells[indexX][indexY].b);
	if(loopStarted == false)
	{
		cells[indexX][indexY].b = false;
	//cells[indexX][indexY].clear();
	cells[indexX][indexY].draw();
	console.log(indexX + " " + indexY);
	}
else
	console.log("Loop already started fool!");
});
var loopStarted = false;
var myInterval;
var startButton = document.getElementById("startButton");
startButton.addEventListener('click', function(){
	console.log("Process started!");
	loopStarted = true;
	myInterval = setInterval(loop, 1000/fps)
})
var stopButton = document.getElementById("stopButton");
stopButton.addEventListener('click', function(){
	loopStarted = false;
	clearInterval(myInterval);
})

var genButton = document.getElementById("genCells");
genButton.addEventListener('click', function(){

	for(var i = 0; i < numCellsW; i++)
	{
		cells[i] = [];
		for (var j = 0; j < numCellsH; j++) {

			var math = Math.random()*10;
			var rand = Math.floor(math);
			var cellBool;
			if(rand < 8)
			{
				cellBool = true;
			}
			else
				cellBool = false;

			cells[i][j] = cell(i,j, cellBool);
			cells[i][j].reDraw("#838B8B");
		};
	}
})
var ctx = c.getContext("2d");
var fps = 15;
var x = 0;
var y = 0;
var cellDimension = 10;
var numCellsW = 100;
var numCellsH = 50;
var offset = 2;
var bool = true; //initialized to being dead

var cell = function(x,y,bool) {
	var returnObj = {};
	returnObj.x = x;
	returnObj.y = y;
	returnObj.b = bool;
	returnObj.cellLock = false;
	returnObj.reDraw = function(color){
		var COLOR = color;
		if(returnObj.b === false)
		{
			ctx.fillStyle = COLOR;
			var posX = returnObj.x*(cellDimension+offset);
			var posY = returnObj.y*(cellDimension+offset);
			ctx.fillRect(posX,posY,cellDimension, cellDimension);
		}
		
		

	};
	returnObj.draw = function(color){
		var COLOR = color;

		ctx.fillStyle = COLOR;
		var posX = returnObj.x*(cellDimension+offset);
		var posY = returnObj.y*(cellDimension+offset);
		ctx.fillRect(posX,posY,cellDimension, cellDimension);

		

	};

	return returnObj;
}


var cells = [];
var init = function(){

	ctx.fillStyle = "#00000";
	ctx.fillRect(0,0,1000,600);
	for(var i = 0; i < numCellsW; i++)
	{
		cells[i] = [];
		for (var j = 0; j < numCellsH; j++) {
			cells[i][j] = cell(i,j, true);
			
		};
	}

};
var lockedCells = []
var k =0;
var update = function(){
	
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,1000,600);


	for(var i =1; i<numCellsW-1;i++)
	{
		tempCells[i] = [];
		for(var j = 1; j <numCellsH-1; j++)
		{
			var liveCounter = 0;
			var squareCounter = 0;


			//if(i < numCellsW){
				if(cells[i+1][j].b === false)
				{
					liveCounter++;

				}
			//}
			//if(i < numCellsW && j < numCellsH){
				if(cells[i+1][j+1].b === false)
				{
					liveCounter++;

				}
			// }
			// if(j > 0 && i < numCellsW){
				if(cells[i+1][j-1].b === false)
				{
					liveCounter++;

				}
			// }
			// if(j < numCellsH){
				if(cells[i][j+1].b === false)
				{
					liveCounter++;
				}
			// }
			// if(j > 0){
				if(cells[i][j-1].b === false)
				{
					liveCounter++;
				}
			// }
			// if(j > 0 && i > 0){
				if(cells[i-1][j-1].b === false)
				{
					liveCounter++;
				}
			// }
			// if(i > 0){
				if(cells[i-1][j].b === false)
				{
					liveCounter++;
				}
			// }
			// if(i > 0 && j < numCellsH){
				if(cells[i-1][j+1].b === false)
				{
					liveCounter++;
				}
			// }

			
			if(cells[i][j].cellLock === false){
				if(cells[i][j].b === false) {
					if(liveCounter < 2) {
						tempCells[i][j] = true;
					} else if(liveCounter > 3) {
						tempCells[i][j] = true;
					} else {
						tempCells[i][j] = false;
					}
				} else {
					if(liveCounter === 3) {
						tempCells[i][j] = false;
					} else {
						tempCells[i][j] = true;
					}
				}
			}

			if(cells[i][j].b === false && liveCounter === 4)
			{
				//console.log("SQUARE SHOULD BE LOCKED");
				//tempCells[i][j].reDraw("#FFF000");
				tempCells[i][j] = false;
				cells[i][j].cellLock = true;
				lockedCells[k] = cells[i][j];
				lockedCells[k].color = '#F4C430';
				k++;
				//console.log(cells[i][j].cellLock);
			}
			if(cells[i][j].b === false && liveCounter === 5)
			{
				tempCells[i][j] = false;
				cells[i][j].cellLock = true;
				lockedCells[k] = cells[i][j];
				lockedCells[k].color = '#DAA520';
				k++;
			}
			if(cells[i][j].b === false && liveCounter === 6)
			{
				tempCells[i][j] = false;
				cells[i][j].cellLock = true;
				lockedCells[k] = cells[i][j];
				lockedCells[k].color = '#EEE600';
				k++;
			}


		}
	}

}



var tempCells = [];
var loop = function(){
	update();
	var k,x;
	for( k = 1; k<numCellsW-1;k++)
	{
		
		for(x =0; x<numCellsH;x++)
		{
			cells[k][x].b = tempCells[k][x];
		}
	}


	for(var i = 1; i < numCellsW-1; i++)
	{
		for (var j = 1; j < numCellsH-1; j++) {

			if(cells[i][j].cellLock === false){
				cells[i][j].reDraw("#838B8B");
			} 
			
		};
	}

	for(q = 0; q < lockedCells.length; q++)
	{
		lockedCells[q].draw(lockedCells[q].color);
	}
}
init();
