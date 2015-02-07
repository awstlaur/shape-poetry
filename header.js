/* a layout for the space the poem should fill */
function frame(name, lines) {
    this.name = name;
    this.lines = lines;
}

/* a start point and width of a line (in pixels) */
function line(coord, width) {
    this.coord = coord;
    this.width = width;
}

/* x, y coordinates, in pixels */
function coord(x, y) {
    this.x = x;
    this.y = y;
}

/* an input poem */
function poem(name, body) {
    this.name = name;
    this.body = body;
}



