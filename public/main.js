function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function main() {
  const canvas = document.querySelector("#Engine");
  const gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("WebGL2 not supported");
  }

  var vertexShaderSource = document.querySelector("#vertex-shader").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader").text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttribute = gl.getAttribLocation(program, "a_position");

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [-1, 1, 1, 1, -1 - 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
  
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.vertexAttribPointer(positionAttribute,size,type,normalize,stride,offset);

  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType,offset,count);
}

main();
