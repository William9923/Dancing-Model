import Light from "../light";
import BaseObject from "../object";

export enum UniformMatrix {
  "PROJ" = "mProj",
  "VIEW" = "mView",
  "WORLD" = "mWorld",
  "TRANSFORM" = "mTransform"
}

class WebGLWrapper {
  // Webgl properties
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;


  /*
   * Constructor
   */

  constructor(private canvas: HTMLCanvasElement) {
    canvas.width = 800;
    canvas.height = 800;

    this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);

    this.program = this.createProgram();
    this.initMainShader(this.program);
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
      }
      `,
    );
    const fShader = this.createCompiledShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;

      varying vec3 fragColor;

      void main() {
        gl_FragColor = vec4(fragColor, 1);
      }
      `,
    );
    this.setupProgram(program, vShader, fShader);
  }


  /*
   * GLSL value apply helpers
   */

  private applyPosition(vertexData: number[]) {
    const { gl, program } = this;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    const positionPos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(positionPos, this.dimension, gl.FLOAT, false, 0, 0);
  }

  private applyNormal(normalData: number[]) {
    const { gl, program } = this;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);

    const normalPos = gl.getAttribLocation(program, "vertNormal");
    gl.enableVertexAttribArray(normalPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(normalPos, this.dimension, gl.FLOAT, false, 0, 0);
  }

  private applyUniformMatrix4fv(label: UniformMatrix, matrix: number[]) {
    const { gl, program } = this;
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, label),
      false,
      new Float32Array(matrix)
    );
  }

  private applyLightProperties(light: Light) {
    const { gl, program } = this;

    gl.uniform3fv(gl.getUniformLocation(program, "Id"), new Float32Array(light.Id));
    gl.uniform3fv(gl.getUniformLocation(program, "Is"), new Float32Array(light.Is));
    gl.uniform3fv(gl.getUniformLocation(program, "Ia"), new Float32Array(light.Ia));

    gl.uniform3fv(
      gl.getUniformLocation(program, "lightPosition"),
      new Float32Array(light.position),
    );
  }

  private applyMaterialProperties(object: BaseObject) {
    const { gl, program } = this;

    gl.uniform3fv(gl.getUniformLocation(program, "Kd"), new Float32Array(object.Kd));
    gl.uniform3fv(gl.getUniformLocation(program, "Ks"), new Float32Array(object.Ks));
    gl.uniform3fv(gl.getUniformLocation(program, "Ka"), new Float32Array(object.Ka));

    gl.uniform1f(gl.getUniformLocation(program, "shininess"), object.shininess);
  }

  private applyUseShading(useShading: boolean) {
    const { gl, program } = this;
    gl.uniform1i(gl.getUniformLocation(program, "useShading"), this.useShading);
  }
}

export default WebGLWrapper;
