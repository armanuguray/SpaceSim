/*
 * @author Arman Uguray
 *
 * Utility functions that handle texture and shader loading/binding.
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