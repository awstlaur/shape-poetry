//http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
//brightness  =  sqrt( .241 R2 + .691 G2 + .068 B2 )
function brightness(rgba){
	return rgba.a == 0 ? -1 :
	Math.sqrt(
		rgba.r * rgba.r * 0.241 + 
		rgba.g * rgba.g * 0.691 +
		rgba.b * rgba.b * 0.068
	);
}

function brightnessSeive(rgba, threshold){
	var white = 255;
	var black = 0;
	var bright = brightness(rgba);
	//console.log('bright: ', bright);
	// console.log(rgba);
	// console.log('bright', bright);
	if(bright > threshold || bright == white){
		rgba.r = white;
		rgba.g = white;
		rgba.b = white;
	}else{
		rgba.r = black;
		rgba.g = black;
		rgba.b = black;
	}
	return rgba;
}

function canvasToBitmap(canvas, brightnessTolerance){
	var ctx = canvas.getContext('2d');

	// ctx.rect(0,0,canvas.width, canvas.height);
	// ctx.fillStyle="white";
	// ctx.fill();

	var imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
	var width  = imgData.width;
	var height = imgData.height;
	var data = imgData.data;
	var bitmap = new Array(width);
	for(var x = 0; x < width; x++){
		bitmap[x] = new Array(height);
	}
	// for(var y = 0; y < height; y++){
	// 	for(var x = 0; x < width; x++){
	// 		bitmap[x][y] = -2;
	// 	}
	// }
	var testData = ctx.createImageData(width, height);
	// console.log('h,w; ', height, width);
	// iterate over all pixels based on x and y coordinates
	for(var y = 0; y < height; y++) {
	  // loop through each column
	  for(var x = 0; x < width; x++) {
	  	var index = ((width * y) + x) * 4;
	    var red = data[index];
	    var green = data[index + 1];
	    var blue = data[index + 2];
	    var alpha = data[index + 3];
	    if(alpha > 0){ 
	    	console.log('a');
	    }
	    var value = brightnessSeive({r: red, g: green, b: blue, a: alpha}, brightnessTolerance).r;
	    if(value == 255 || alpha == 0){
	    	bitmap[x][y] = 0;
	    	testData.data[index]	= 255;
	    	testData.data[index + 1] = 255;
	    	testData.data[index + 2] = 255;
	    	testData.data[index + 3] = alpha;
	    }else if(value == 0){
	    	bitmap[x][y] = 1;
	    	testData.data[index]	= 0;
	    	testData.data[index + 1] = 0;
	    	testData.data[index + 2] = 0;
	    	testData.data[index + 3] = alpha;
	    }else{
	    	bitmap[x][y] = -1;
	    	throw new Error('seive failure!');
	    }
	  }
	}	    	   
	    //ctx.putImageData(testData, 0, 0);

	    return bitmap;
}

function transpose(arr,arrLen) {
  for (var i = 0; i < arrLen; i++) {
    for (var j = 0; j <i; j++) {
      //swap element[i,j] and element[j,i]
      var temp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = temp;
    }
  }
}