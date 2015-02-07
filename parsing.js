console.log('hello');

function writePoem(frame) {
    document.write(frame.name);
   
}

function makeFrame(poem) {
    var f = new frame(poem.name, []);
    return f;
}

writePoem(makeFrame(new poem('the title', 'the body')));
