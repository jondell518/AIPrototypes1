
var c = document.getElementById("mycanvas");
c.addEventListener('click',function(evt){
	var indexX = Math.floor(evt.clientX/(cellDimension+offset));
	var indexY = Math.floor(evt.clientY/(cellDimension+offset));
	console.log("in event listener" + 	cells[indexX][indexY].b);
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
var ctx = c.getContext("2d");
var fps = 5;
var x = 0;
var y = 0;
var cellDimension = 10;
var numCellsW = 50;
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
	returnObj.draw = function(){
		if(returnObj.cellLock === false){
			if(returnObj.b === false)
			{
				ctx.fillStyle = '#838B8B';
				var posX = returnObj.x*(cellDimension+offset);
				var posY = returnObj.y*(cellDimension+offset);
				ctx.fillRect(posX,posY,cellDimension, cellDimension);
			}
		}

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
			cells[i][j].draw();
		};
	}

};
var update = function(){
	console.log("Update called!");
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,1000,600);


	for(var i =0; i<numCellsW;i++)
	{
		tempCells[i] = [];
		for(var j = 1; j <numCellsH-1; j++)
		{
			var liveCounter = 0;
			var squareCounter = 0;
			if(cells[i+1][j].b === false)
			{
				liveCounter++;
				
			}
			if(cells[i+1][j+1].b === false)
			{
				liveCounter++;
				
			}
			if(cells[i+1][j-1].b === false)
			{
				liveCounter++;
				
			}
			if(cells[i][j+1].b === false)
			{
				liveCounter++;
			}
			if(cells[i][j-1].b === false)
			{
				liveCounter++;
			}
			if(cells[i-1][j-1].b === false)
			{
				liveCounter++;
			}
			if(cells[i-1][j].b === false)
			{
				liveCounter++;
			}
			if(cells[i-1][j+1].b === false)
			{
				liveCounter++;
			}

			

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


		if(cells[i][j].b === false && squareCounter === 8)
			{
				//console.log("SQUARE SHOULD BE LOCKED");
				//tempCells[i][j].reDraw("#FFF000");
				tempCells[i][j] = true;
				cells[i][j].cellLock = true;
				//console.log(cells[i][j].cellLock);
			}

	}
}

}



var tempCells = [];
var loop = function(){
	update();
	var k,x;
	for( k = 0; k<numCellsW;k++)
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
			} else {
				console.log("locked cells being drawn");
				cells[i][j].reDraw("#cc00cc");
			}
			
		};
	}
// console.log("loop finished being called!");
}
init();
