/*
 * @author Arman Uguray
 *
 * Utility functions that handle texture and shader loading.
 * These functions should absolutely be called at initialization as
 * download times will impair performance.
 *
 */

/*
 
 /*
  * Loads a texture into memory
  *
  * @param gl: WebGL object
  * @param path: path to the image containing the texture
  * @return texture id
  *
  WebGLTexture loadTexture(gl, path);
  */
 /*
  * @param gl: WebGL object
  * @param path: path to the shader file
  * @param type: VERT or FRAG
  * @return shader object
  *
  WebGLShader loadShaderFromPath(gl, type, path);
  */
 /*
  * @param gl: WebGL object
  * @param src: The shader source code
  * @param type: VERT or FRAG
  * @return shader object
  *
  WebGLShader loadShader(gl, type, src);
  */
 /*
  * Links the given list of shader objects
  * and creates a shader program.
  * 
  * @param gl: WebGL object
  * @param shaders: array of shader objects
  * @return shader program object
  *
  WebGLShaderProgram createShaderProgram(gl, shaders);
  */
 
 GLFileLoader = (function() 
 {
     
     var loadTexture = function(gl, path)
     {
         // download the image. once it is downloaded, upload it to the graphics card
         var image = new Image();
         var texture = gl.createTexture();
         image.onload = function() {
             gl.bindTexture(gl.TEXTURE_2D, texture);
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
             gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
             gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
             var error = gl.getError();
             if (error != gl.NO_ERROR) {
                 var str = "GL Error: " + error;
                 throw str;
             }
         }
         return texture;
     };
     
     var loadShader = function(gl, type, src)
     {
         console.log("Compiling: \n" + src);
         // create the shader object
         var shader;
         if (type == "VERT")
             shader = gl.createShader(gl.VERTEX_SHADER);
         else if (type == "FRAG")
             shader = gl.createShader(gl.FRAGMENT_SHADER);
         else throw "Invalid shader type: " + type;
         
         // compile the shader
         gl.shaderSource(shader, src);
         gl.compileShader(shader);
         
         // if shader didn't compile, throw exception
         if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
             throw "Error compiling shader: " + gl.getShaderInfoLog(shader);
         
         return shader;
     };
     
     var loadShaderFromPath = function(gl, type, path)
     {  
        var request = new XMLHttpRequest();
        var toReturn;
        request.onreadystatechange = function() 
        {
            if (request.readyState == 4) 
                toReturn = loadShader(gl, type, request.responseText);
        }
        request.open("GET", path, false); // the request should be synchronous
        request.send();
        return toReturn;
    };
     
    return {
        loadTexture : loadTexture,
        loadShader : loadShader,
        loadShaderFromPath : loadShaderFromPath
    };
 }());
 
 
 
 