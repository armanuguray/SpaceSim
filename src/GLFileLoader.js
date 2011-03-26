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
    GLuint loadTexture(gl, path);
    
    /*
     * @param gl: WebGL object
     * @param path: path to the shader file
     * @param type: VERT or FRAG
     * @return shader object
     *
    GLuint loadShaderFromPath(gl, type, path);
    
    /*
     * @param gl: WebGL object
     * @param src: The shader source code
     * @param type: VERT or FRAG
     * @return shader object
     *
    GLuint loadShader(gl, type, src);
    
    /*
     * Links the given list of shader objects
     * and creates a shader program.
     * 
     * @param gl: WebGL object
     * @param shaders: array of shader objects
     * @return shader program object
     GLuint createShaderProgram(gl, shaders);
*/

function loadTexture(gl, path)
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
}

function loadShader(gl, type, src)
{
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
        throw gl.getShaderInfoLog(shader);
    
    return shader;
}

function loadShaderFromPath(gl, type, path)
{
// TODO: solve these problems. AJAX doesn't let downloading from localhost
//       may have to set up a temporary server?
    try {
        var request = new XMLHttpRequest();
        request.open("GET", path, true);
        request.send("--allow-file-access-from-file");
        request.onreadystatechange = function() {
		if(ajaxRequest.readyState == 4){
            alert("osman");
			ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
        }
    } catch (e) {
        //alert(e);
    }
}



