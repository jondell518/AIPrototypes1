
var c = document.getElementById("mycanvas");
c.addEventListener('click',function(evt){
	var indexX = Math.floor(evt.clientX/(cellDimension+offset));
	var indexY = Math.floor(evt.clientY/(cellDimension+offset));
	console.log("in event listener" + 	cells[indexX][indexY].b);
	cells[indexX][indexY].b = false;
	//cells[indexX][indexY].clear();
	//cells[indexX][indexY].draw();
	console.log(indexX + " " + indexY);
});
var ctx = c.getContext("2d");
var fps = 30;
var x = 0;
var y = 0;
var cellDimension = 25;
var numCellsW = 10;
var numCellsH = 10;
var offset = 5;
var bool = true;

var cell = function(x,y,bool) {
	var returnObj = {};
	returnObj.x = x;
	returnObj.y = y;
	returnObj.b = bool;
	returnObj.draw = function(){
		
		if(returnObj.b == true) {
			//console.log(returnObj.b)
			ctx.fillStyle = "#cc00cc";
			var posX = returnObj.x*(cellDimension+offset);
			var posY = returnObj.y*(cellDimension+offset);
			ctx.fillRect(posX,posY,cellDimension, cellDimension);
		}
		if(returnObj.b == false)
		{
			ctx.fillStyle = '#000000';
			var posX = returnObj.x*(cellDimension+offset);
			var posY = returnObj.y*(cellDimension+offset);
			ctx.fillRect(posX,posY,cellDimension, cellDimension);
		}
			
	};

	return returnObj;
}


var cells = [];
var init = function(){

	for(var i = 0; i < numCellsW; i++)
	{
		cells[i] = [];
		for (var j = 0; j < numCellsH; j++) {
			cells[i][j] = cell(i,j, bool);
		};
	}

};

var loop = function(){
	
	for(var i = 0; i < numCellsW; i++)
	{
		for (var j = 0; j < numCellsH; j++) {
			cells[i][j].draw();
		};
	}
	// console.log("loop finished being called!");
}
init();
setInterval(loop, 1000/fps)