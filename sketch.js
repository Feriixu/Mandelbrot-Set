var minval = -0.5;
var maxval = 0.5;

var minslider;
var maxslider;

var blue = 0;
var green = 0;
function setup() {
  createCanvas(800, 800);
  createP("");

  minslider = createSlider(-1.5, 0, -1.5, 0.01);
  maxslider = createSlider(0, 1.5, 1.5, 0.01);
}

function draw() {
  var max_iterations = 100;
  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var a = map(x, 0, width, minslider.value(), maxslider.value());
      var b = map(y, 0, height, minslider.value(), maxslider.value());

      var n = 0;
      var z = 0;
      var ca = a;
      var cb = b;

      while (n < max_iterations) {

        var aa = a * a - b * b;
        var bb = 2 * a * b;

        a = aa + ca;
        b = bb + cb;

        if (abs(aa + bb > 16)) {
          break;
        }
        n++;
      }

      var bright = map(n, 0, max_iterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      blue = map(n, 0, max_iterations, 255, 0);
      green = map(n, 0, 100, 255, 0);
      green = 0;
      if (n == max_iterations) {
        bright = 0;
        green = map(n, 0, 100, 0, 50);
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = green;
      pixels[pix + 2] = blue;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
