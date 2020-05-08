let positive_width;
let negative_width;
let control_panel;

let positive_slider;
let negative_slider;
let delta_slider;

let offset;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight*2);
  frameRate(60);
  positive_width = 10;
  negative_width = 70;

  fill(0);
  noStroke();
  control_panel = document.getElementById("controls");
  
  createElement("span", "black width").parent(control_panel)
  positive_slider = createSlider(0, 400, 200, 1);
  positive_slider.parent(control_panel);
  positive_slider.style('width', '100%');

  createElement("span", "white width").parent(control_panel)
  negative_slider = createSlider(0, 400, 200, 1);
  negative_slider.parent(control_panel);
  negative_slider.style('width', '100%');

  createElement("span", "velocity").parent(control_panel)
  delta_slider = createSlider(0, 100, 20);
  delta_slider.parent(control_panel);
  delta_slider.style('width', '100%');

  offset = 0;
}

function draw() {
  // put drawing code here
  background(255);

  positive_width = positive_slider.value();
  negative_width = negative_slider.value();

  offset += (deltaTime/70)*delta_slider.value();
  // console.log(offset);
  //console.log("pos: " + positive_width);
  //console.log("neg: " + negative_width);


  for(let row = 0; row < height; row += 1) {
    if(row % (negative_width+positive_width) === 0){
      rect(0,(row+int(offset))%(height),width,positive_width);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth-3, windowHeight-3);
}