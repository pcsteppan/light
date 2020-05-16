let positive_width;
let negative_width;
let control_panel;

let positive_slider;
let negative_slider;
let threshold_slider;
let delta_slider;
let is_vertical;

let previous_sum;

let camShader;

let offset;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60);
  positive_width = 10;
  negative_width = 70;

  //fill(0);
  noStroke();
  control_panel = document.getElementById("controls");
  
  createElement("p", "width").parent(control_panel)
  positive_slider = createSlider(0, 1000, 90, 0.001);
  positive_slider.parent(control_panel);
  positive_slider.style('width', '100%');

  // createElement("p", "white width").parent(control_panel)
  // negative_slider = createSlider(0, 1, 0.5, 0.001);
  // negative_slider.parent(control_panel);
  // negative_slider.style('width', '100%');

  createElement("p", "proportion").parent(control_panel)
  threshold_slider = createSlider(-1, 1, 0.0, 0.001);
  threshold_slider.parent(control_panel);
  threshold_slider.style('width', '100%');

  createElement("p", "velocity").parent(control_panel)
  delta_slider = createSlider(-50, 50, 10, 1);
  delta_slider.parent(control_panel);
  delta_slider.style('width', '100%');
  
  is_vertical = createCheckbox("vertical?", false);
  is_vertical.parent(control_panel);
  // translate 50vh
  // rotate 90deg

  offset = 0;
}

function draw() {
  // put drawing code here
  background(255);

  shader(camShader);
  // lets just send the cam to our shader as a uniform
  // send a slow frameCount to the shader as a time variable
  camShader.setUniform('time', frameCount * 0.01);
  camShader.setUniform('width', positive_slider.value())
  // camShader.setUniform('white', negative_slider.value())
  camShader.setUniform('threshold', threshold_slider.value())
  camShader.setUniform('velocity', delta_slider.value())
  camShader.setUniform('o', is_vertical.checked())

  rect(0,0,width,height);
  /*
  positive_width = positive_slider.value();
  negative_width = negative_slider.value();
  if(previous_sum != positive_width+negative_width || (frameCount % 300) == 0)
    resizeCanvas(windowWidth*2, (int((windowWidth*2)/(positive_width+negative_width))+1)*(positive_width+negative_width));

  previous_sum = negative_width + positive_width
  offset += (deltaTime/70)*delta_slider.value();
  // console.log(offset);
  //console.log("pos: " + positive_width);
  //console.log("neg: " + negative_width);


  for(let row = 0; row < height; row += 1) {
    if(row % (negative_width+positive_width) === 0){
      rect(0,(row+int(offset))%(height),width,positive_width);
    }
  }
  */
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //resizeCanvas(windowWidth, (int((windowHeight*2)/(positive_width+negative_width)))*(positive_width+negative_width));
}