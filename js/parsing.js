/* gets user input text from a textarea */
var bitmap__ = [[0,0,1,1,1,0,0,1,1,1], 
              [0,1,1,0,1,1,1], 
              [0,0,0,0,1,1,1,1], 
              [0,1,1,1],
              [0,1,0,1,1,1,1,1],
              [1,1,0,1,1,0,0,0,0,0]];

$('#image').ready(function() {
    // console.log($('#image'));
    getInput();
});             

function getInput() {
    var bitmap = addImage();
    transpose(bitmap, bitmap.length);
    var bCount = 0;
    for(var i = 0; i < bitmap.length; i++){
        for(var j = 0; j < (bitmap[i]).length; j++){
            if(bitmap[i][j] == 1){
                bCount++;
            }
        }
    }
    console.log('bCount', bCount);
    $(document).ready(function(){
        var body = "";
        $("#poemArea").keyup(function(){
            body = $(this).val();
            console.log(body);
            var myPoem = new poem("name", body);
            writePoem(myPoem, bitmap, 1); 
        });
    })
}

function uploadImage() {
    var path = $('#imageFile').val();
    console.log("path " + path);
    return true;
}

function addImage() {    
    var c = document.getElementById("image");
    console.log(c);
    var ctx = c.getContext("2d");
    var img = document.getElementById("heart");
    ctx.drawImage(img, 0, 0);
        console.log(ctx.getImageData(0,0,c.width, c.height));
    var bitmap = canvasToBitmap(c, 0);
    console.log(bitmap);
    return bitmap;
}

/* writes poem to document based on frame */
function writePoem(poem, bitmap, fontSize) {
    console.log("called with: " + poem.body);
    $('#poem').val('');
    var poemElement = "";
    var body = poem.body;
    for(y = 0; y < bitmap.length; y++) {
        console.log("adding line");
        poemElement += '\n';
        for(i = 0; i + fontSize < bitmap[y].length; i += fontSize) {
            if (body.length >= fontSize) {            
                if (bitmap[y][i] != 0) {
                    //For none zeroes, go through the body
                    poemElement += body.substring(0, fontSize);
                    body = body.substring(fontSize);
                } else {
                    //For zeroes, add empty spaces
                    poemElement += ' ';
                }
            } else {
                document.getElementById('poem').value = poemElement;
                return;
            }
        }
    }

    document.getElementById('poem').value = poemElement;

}


//getInput();
