
/* writes poem to document based on frame */
function writePoem(poem, bitmap, fontSize) {
    poemElement = document.createElement('p');
    poemElement.innerHTML = "";
    document.write(poem.name + '</br>');
    var body = poem.body;
    for(y = 0; y < bitmap.length; y++) {
        poemElement.innerHTML += '</br>';
        for(i = 0; i + fontSize < bitmap[y].length; i += fontSize) {
            if (body.length >= fontSize) {
                if (bitmap[y][i] != 0) {
                    poemElement.innerHTML += body.substring(0, fontSize);
                    body = body.substring(fontSize);
                } else {
                    poemElement.innerHTML += '&nbsp';
                }
            } else {
                window.onload = function() {
                    document.getElementById('poem').appendChild(poemElement);
                }
                return;
            }
        }
    }
    window.onload = function() {
        document.getElementById('poem').appendChild(poemElement);
    }
}

var bitmap = [[0,0,1,1,1,0,0,1,1,1], [0,1,1,0,1,1,1], [0,0,0,0,1,1,1,1], [0,1,1,1]]
writePoem(new poem('the title', 'the body of the poem'), bitmap, 1);
