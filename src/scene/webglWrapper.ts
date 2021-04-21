import Light from "../light";
import Node from "../object";

import {requestCORSIfNotSameOrigin} from "../util/convert";

export enum AttributeVector {
  "POSITION" = "position",
  "NORMAL" = "vertNormal",
}

export enum UniformMatrix {
  "PROJ" = "mProj",
  "VIEW" = "mView",
  "WORLD" = "mWorld",
  "TRANSFORM" = "mTransform",
}

class WebGLWrapper {
  // Webgl properties
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;

  protected texture: Texture;

  /*
   * Constructor
   */

  constructor(private canvas: HTMLCanvasElement) {
    canvas.width = 800;
    canvas.height = 800;

    this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);

    // Load initial texture mode
    this.texture = "none";

    this.program = this.createProgram();

    this.initMainShader(this.program);

    // Load the environment
    this.loadEnvMapAndCreateTexture();

    // Load bump texture
    this.applyTexCoord();
    this.loadBumpMapAndCreateTexture();
    this.applyUseNormalMap(false);
  }

  /*
   * Webgl setup
   */

  private createProgram() {
    const program = this.gl.createProgram();
    if (!program) {
      throw "shape.createProgram: no program!";
    }
    return program;
  }

  private createCompiledShader(type: number, sourceCode: string) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) {
      const shaderTypeString = type == gl.VERTEX_SHADER ? "vertex" : "fragment";
      throw `shape.createCompiledShader: error while creating ${shaderTypeString} shader`;
    }
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    return shader;
  }

  private setupProgram(program: WebGLProgram, vShader: WebGLShader, fShader: WebGLShader) {
    const gl = this.gl;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);
  }

  private initMainShader(program: WebGLProgram) {
    const gl = this.gl;
    const vShader = this.createCompiledShader(
      gl.VERTEX_SHADER,
      `
      attribute vec3 position;
      attribute vec3 vertNormal;
      attribute vec2 texCoord;

      uniform vec3 lightPosition;

      // Position matrices
      uniform mat4 mTransform;
      uniform mat4 mWorld;
      uniform mat4 mView;
      uniform mat4 mProj;

      // Blinn-Phong model
      varying vec3 L;
      varying vec3 V;
      varying vec3 N;

      // UV coordinate
      varying vec2 fTexCoord;

      // Env texture properties
      varying vec3 R;

      void main() {
        // Calculate model view matrix
        mat4 modelViewMatrix =  mView * mWorld * mTransform;

        // Assign gl_Position value
        gl_Position = mProj * modelViewMatrix * vec4(position, 1);

        // Blinn-Phong model
        vec3 vertPos = (modelViewMatrix * vec4(position, 1)).xyz;

        L = normalize((mView * vec4(lightPosition, 1)).xyz - vertPos);
        V = normalize(-vertPos);
        N = normalize((modelViewMatrix * vec4(vertNormal,0)).xyz);

        // Env mapping
        vec3 eyePos = (modelViewMatrix * vec4(position, 1)).xyz;
        R = reflect(eyePos, N);

        // Pass UV coordinate
        fTexCoord = texCoord;
      }
      `,
    );
    const fShader = this.createCompiledShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;

      uniform int useShading;
      uniform int useTexture;

      // Light properties
      uniform vec3 Id;
      uniform vec3 Is;
      uniform vec3 Ia;

      // Material properties
      uniform vec3 Kd;
      uniform vec3 Ks;
      uniform vec3 Ka;
      uniform float shininess;

      // Blinn-Phong model
      varying vec3 L;
      varying vec3 V;
      varying vec3 N;

      // UV coordinate
      varying vec2 fTexCoord;

      // Texture type
      uniform int textureType;

      // Environment texture variable
      uniform samplerCube envTexture;
      varying vec3 R;

      // Bump texture variable
      uniform sampler2D bumpNormalMap;
      uniform int useNormalMap;

      vec4 calculateColor(vec3 normal) {
        vec3 color;
        if (useShading == 1) {
          // Build Blinn-Phong model
          vec3 H = normalize(L + V);

          vec3 diffuse = Kd * Id * max(dot(L, normal), 0.0);
          vec3 specular = Ks * Is * pow(max(dot(normal, H), 0.0), shininess);
          vec3 ambient = Ka * Ia;

          color = diffuse + specular + ambient;
        } else {
          color = vec3(0, 0, 0);
        }

        // Return
        return vec4(color, 1);
      }

      void main() {
        // Initial check
        if (useTexture != 1) {
          gl_FragColor = calculateColor(N);
          return;
        }


        // Check texture type
        if (textureType == 1) {  // env
          gl_FragColor = textureCube(envTexture, -R);
        }

        else if (textureType == 2) {  // bump
          vec3 normal;
          if (useNormalMap == 1) {
            normal = texture2D(bumpNormalMap, fTexCoord).rgb;
            normal = normalize(normal * 2.0 - 1.0);
          } else {
            normal = N;
          }
          gl_FragColor = calculateColor(normal);
        }

        else {  // no texture
          gl_FragColor = calculateColor(N);
        }
      }
      `,
    );
    this.setupProgram(program, vShader, fShader);
  }


  /*
   * GLSL value apply helpers
   */

  protected applyAttributeVector(
    label: AttributeVector,
    vectorData: number[],
    dimension: number = 3,
  ) {
    const {gl, program} = this;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vectorData), gl.STATIC_DRAW);

    const attrPos = gl.getAttribLocation(program, label);
    gl.enableVertexAttribArray(attrPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attrPos, dimension, gl.FLOAT, false, 0, 0);
  }

  protected applyUniformMatrix4fv(label: UniformMatrix, matrix: number[]) {
    const {gl, program} = this;
    gl.uniformMatrix4fv(gl.getUniformLocation(program, label), false, new Float32Array(matrix));
  }

  protected applyLightProperties(light: Light) {
    const {gl, program} = this;

    gl.uniform3fv(gl.getUniformLocation(program, "Id"), new Float32Array(light.Id));
    gl.uniform3fv(gl.getUniformLocation(program, "Is"), new Float32Array(light.Is));
    gl.uniform3fv(gl.getUniformLocation(program, "Ia"), new Float32Array(light.Ia));

    gl.uniform3fv(
      gl.getUniformLocation(program, "lightPosition"),
      new Float32Array(light.position),
    );
  }

  protected applyMaterialProperties(object: Node) {
    const {gl, program} = this;

    gl.uniform3fv(gl.getUniformLocation(program, "Kd"), new Float32Array(object.Kd));
    gl.uniform3fv(gl.getUniformLocation(program, "Ks"), new Float32Array(object.Ks));
    gl.uniform3fv(gl.getUniformLocation(program, "Ka"), new Float32Array(object.Ka));

    gl.uniform1f(gl.getUniformLocation(program, "shininess"), object.shininess);
  }

  protected applyUseShading(useShading: boolean) {
    const {gl, program} = this;
    gl.uniform1i(gl.getUniformLocation(program, "useShading"), useShading ? 1 : 0);
  }

  protected applyUseTexture(useTexture: boolean) {
    const {gl, program} = this;
    gl.uniform1i(gl.getUniformLocation(program, "useTexture"), useTexture ? 1 : 0);
  }

  protected applyUseNormalMap(useNormalMap: boolean) {
    const {gl, program} = this;
    gl.uniform1i(gl.getUniformLocation(program, "useNormalMap"), useNormalMap ? 1 : 0);
  }

  protected applyTexCoord() {
    const {gl, program} = this;

    // prettier-ignore
    const texCoordData = [
      // front-right pentagon
      0.5, -1,
      0.5, 0,
      0.855, -0.28,
      1, -0.75,
      // front-left pentagon
      0.5, -1,
      0, -0.75,
      0.145, -0.28,
      0.5, 0
    ];

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordData), gl.STATIC_DRAW);

    const texCoordPos = gl.getAttribLocation(program, "texCoord");
    gl.enableVertexAttribArray(texCoordPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(texCoordPos, 2, gl.FLOAT, false, 0, 0);
  }

  protected applyTexture(textureType: Texture) {
    const {gl, program} = this;

    switch (textureType) {
      case "environment":
        gl.uniform1i(gl.getUniformLocation(program, "textureType"), 1);
        break;
      case "bump":
        gl.uniform1i(gl.getUniformLocation(program, "textureType"), 2);
        break;
      default:
        gl.uniform1i(gl.getUniformLocation(program, "textureType"), 0); // no texture
        break;
    }
  }

  protected loadEnvMapAndCreateTexture() {
    const {gl, program} = this;

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const faceInfos = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url:
          "https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-x.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url:
          "https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-x.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url:
          "https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-y.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url:
          "https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-y.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url:
          "https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg",
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url:
          "https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-z.jpg",
      },
    ];
    faceInfos.forEach((faceInfo) => {
      const {target, url} = faceInfo;

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 512;
      const height = 512;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;

      // setup each face so it's immediately renderable
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

      // Asynchronously load an image
      const image = new Image();
      requestCORSIfNotSameOrigin(image, url);
      image.src = url;
      image.addEventListener("load", function () {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(target, level, internalFormat, format, type, image);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(gl.getUniformLocation(program, "envTexture"), 0);
  }

  protected loadBumpMapAndCreateTexture() {
    const {gl, program} = this;

    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]));

    // Asynchronously load an image
    var image = new Image();
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });
    image.src = require('../../res/normal.png');

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(gl.getUniformLocation(program, "bumpNormalMap"), 1);
  }

  /*
   * Draw array wrapper method
   */
  protected draw(mode: number, startingIdx: number, size: number) {
    this.gl.drawArrays(mode, startingIdx, size);
  }
}

export default WebGLWrapper;
