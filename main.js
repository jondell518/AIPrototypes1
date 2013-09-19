
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
var startButton = document.getElementById("startButton");
startButton.addEventListener('click', function(){
	console.log("Process started!");
	loopStarted = true;
	setInterval(loop, 1000/fps)
})
var ctx = c.getContext("2d");
var fps = 10;
var x = 0;
var y = 0;
var cellDimension = 10;
var numCellsW = 250;
var numCellsH = 250;
var offset = 2;
var bool = true;

var cell = function(x,y,bool) {
	var returnObj = {};
	returnObj.x = x;
	returnObj.y = y;
	returnObj.b = bool;
	returnObj.reDraw = function(){
		// if(returnObj.b == true) {
		// 	//console.log("they are the same!");
		// 	ctx.fillStyle = "#ffff00";
		// 	var posX = returnObj.x*(cellDimension+offset);
		// 	var posY = returnObj.y*(cellDimension+offset);
		// 	ctx.fillRect(posX,posY,cellDimension, cellDimension);
		// }
		if(returnObj.b == false)
		{
			ctx.fillStyle = '#838B8B';
			var posX = returnObj.x*(cellDimension+offset);
			var posY = returnObj.y*(cellDimension+offset);
			ctx.fillRect(posX,posY,cellDimension, cellDimension);
		}
	};
	returnObj.draw = function(){
		
		// if(returnObj.b == true) {
		// 	//console.log(returnObj.b)
		// 	ctx.fillStyle = "#00000";
		// 	var posX = returnObj.x*(cellDimension+offset);
		// 	var posY = returnObj.y*(cellDimension+offset);
		// 	ctx.fillRect(posX,posY,cellDimension, cellDimension);
		//  }
		if(returnObj.b == false)
		{
			ctx.fillStyle = '#838B8B';
			var posX = returnObj.x*(cellDimension+offset);
			var posY = returnObj.y*(cellDimension+offset);
			ctx.fillRect(posX,posY,cellDimension, cellDimension);
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
			console.log(rand)
			if(rand < 5)
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
var update = function(tempCells){

	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,1000,600);


	for(var i =1; i<numCellsW-1;i++)
	{
		for(var j = 1; j <numCellsH-1; j++)
		{
			var liveCounter = 0;
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

			if(cells[i][j].b === true && liveCounter === 3)
			{
				tempCells[i][j].b = false;
			}
			if(cells[i][j].b === false && liveCounter === 2)
			{
				tempCells[i][j].b = false;
			}
			if(cells[i][j].b === false && liveCounter === 3)
			{
				tempCells[i][j].b = false;
			}
			else
				tempCells[i][j].b = true;
		}
		
	}






}
var loop = function(){
	var tempCells = cells.slice(0,cells.length)
	console.log("tempcells initialized: " + tempCells);
	update(tempCells);
	//cells = tempCells.slice(0,tempCells.length);
	for(var i = 0; i < numCellsW; i++)
	{
		for (var j = 0; j < numCellsH; j++) {
			cells[i][j].reDraw();
		};
	}
	// console.log("loop finished being called!");
}
init();
