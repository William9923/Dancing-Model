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
      `attribute vec3 position;
      attribute vec3 vertNormal;

      varying vec3 fragColor;
      uniform vec3 lightPosition;
      uniform int useShading;

      // Light properties
      uniform vec3 Id;
      uniform vec3 Is;
      uniform vec3 Ia;

      // Material properties
      uniform vec3 Kd;
      uniform vec3 Ks;
      uniform vec3 Ka;
      uniform float shininess;

      // Position matrices
      uniform mat4 mTransform;
      uniform mat4 mWorld;
      uniform mat4 mView;
      uniform mat4 mProj;

      // env texture properties
      varying vec3 R;

      void main() {
        gl_Position = mProj * mView * mWorld * mTransform * vec4(position, 1);

        if (useShading == 1) {
          // Build blinn phong model
          vec3 vertPos = (mView * mWorld * mTransform * vec4(position, 1)).xyz;
          vec3 L = normalize((mView * vec4(lightPosition, 1)).xyz - vertPos);
          vec3 V = normalize(-vertPos);
          vec3 H = normalize(L + V);
          vec3 N = normalize((mView * mWorld * mTransform * vec4(vertNormal, 0)).xyz);

          vec3 diffuse = Kd * Id * max(dot(L, N), 0.0);
          vec3 specular = Ks * Is * pow(max(dot(N, H), 0.0), shininess);
          vec3 ambient = Ka * Ia;

          fragColor = diffuse + specular + ambient;
        } else {
          fragColor = vec3(0, 0, 0);
        }

        vec4 a_position = vec4(position, 1);
        mat4 modelViewMatrix =  mView * mWorld * mTransform;
        vec3 eyePos = (modelViewMatrix * a_position).xyz;

        vec3 N = normalize((modelViewMatrix*vec4(vertNormal,0)).xyz);
        R = reflect(eyePos, N);
      }
      `,
    );
    const fShader = this.createCompiledShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;

      varying vec3 fragColor;

      uniform int textureType;
      
      // environment texture variable
      uniform samplerCube envTexture;
      
      varying vec3 R;

      void main() {
        if (textureType == 1) {
          gl_FragColor = textureCube(envTexture, -R);
        } else {
          gl_FragColor = vec4(fragColor, 1);
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

  protected applyTexture(textureType: Texture) {
    const {gl, program} = this;

    switch (textureType) {
      case "environment":
        gl.uniform1i(gl.getUniformLocation(program, "textureType"), 1);
        console.log("hid dis");
        break;
      default:
        gl.uniform1i(gl.getUniformLocation(program, "textureType"), 0); // no texture
        console.log("hid dis II");
        break;
    }
  }

  protected loadEnvMapAndCreateTexture() {
    const {gl, program} = this;

    const texture = gl.createTexture();
    // gl.activeTexture(gl.TEXTURE2);

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

  /*
   * Draw array wrapper method
   */
  protected draw(mode: number, startingIdx: number, size: number) {
    this.gl.drawArrays(mode, startingIdx, size);
  }
}

export default WebGLWrapper;
