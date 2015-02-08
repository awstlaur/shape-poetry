/* gets user input text from a textarea */
var bitmap = [[0,0,1,1,1,0,0,1,1,1], 
              [0,1,1,0,1,1,1], 
              [0,0,0,0,1,1,1,1], 
              [0,1,1,1],
              [0,1,0,1,1,1,1,1],
              [1,1,0,1,1,0,0,0,0,0]];

function getInput() {
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


getInput();
