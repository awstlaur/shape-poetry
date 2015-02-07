//http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
//brightness  =  sqrt( .241 R2 + .691 G2 + .068 B2 )
function brightness(rgba){
	return Math.sqrt(
		rgba.r * rgba.r * 0.241 + 
		rgba.g * rgba.g * 0.691 +
		rgba.b * rgba.b * 0.068
	);
}

function brightnessSeive(rgba, threshold){
	var white = 255;
	var black = 0;
	var bright = brightness(rgba);
	// console.log(rgba);
	// console.log('bright', bright);
	if(bright > threshold || bright == 255){
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