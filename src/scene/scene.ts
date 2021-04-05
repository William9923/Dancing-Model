import Camera from "../camera";
import Light from "../light";
import { toCartesian } from "../util/convert";
import { mat4 } from "../util/matrix";

class Scene {
  // Webgl properties
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;

  // Object, camera, and light used
  private _objects: Object[] = new Array();
  private _camera: Camera = new Camera(this.setViewMatrix.bind(this));
  private _light: Light = new Light();

  // Matrices used
  private transformMatrix: number[] = mat4.identity();
  private viewMatrix: number[] = mat4.identity();
  private projMatrix: number[] = mat4.orthographicProj();
  private worldMatrix: number[] = mat4.identity();

  // Use shading
  private useShading: 0 | 1 = 1;


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

    this.applyTransformMatrix();
    this.applyViewMatrix();
    this.applyWorldMatrix();
    this.applyProjectionMatrix();

    this.setLight(this._light);
    this.setUseShading(true);
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
   * Matrix helpers
   */

  public setProjection(projectionType: Projection) {
    switch (projectionType) {
      case "orthographic":
        this.projMatrix = mat4.orthographicProj();
        break;
      case "oblique":
        this.projMatrix = mat4.obliqueProj();
        break;
      case "perspective":
        this.projMatrix = mat4.perspectiveProj();
        break;
      default:
        throw `shape.setProjection: invalid projection type '${projectionType}'`;
    }
    this.applyProjectionMatrix();
  }

  private applyProjectionMatrix() {
    const { gl, program } = this;

    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "mProj"),
      false,
      new Float32Array(this.projMatrix)
    );
  }

  private setViewMatrix(viewMatrix: number[]) {
    this.viewMatrix = viewMatrix;
    this.applyViewMatrix();
  }

  private applyViewMatrix() {
    const { gl, program } = this;

    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "mView"),
      false,
      new Float32Array(this.viewMatrix)
    );
  }

  private applyWorldMatrix() {
    const { gl, program } = this;

    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "mWorld"),
      false,
      new Float32Array(this.worldMatrix)
    );
  }

  // TODO: remove
  private applyTransformMatrix() {
    const { gl, program } = this;

    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "mTransform"),
      false,
      new Float32Array(this.transformMatrix)
    );
  }


  /*
   * Property getter and setter
   */

  public get camera() {
    return this._camera;
  }

  public setCamera(camera: Camera) {
    this._camera = camera;
    this._camera.positionChangedCallback = this.setViewMatrix.bind(this);
    this.viewMatrix = this._camera.viewMatrix();
    this.applyViewMatrix();
  }

  public setLight(light: Light) {
    const { gl, program } = this;

    this._light = light;

    gl.uniform3fv(gl.getUniformLocation(program, "Id"), new Float32Array(this._light.Id));
    gl.uniform3fv(gl.getUniformLocation(program, "Is"), new Float32Array(this._light.Is));
    gl.uniform3fv(gl.getUniformLocation(program, "Ia"), new Float32Array(this._light.Ia));

    gl.uniform3fv(
      gl.getUniformLocation(program, "lightPosition"),
      new Float32Array(this._light.position),
    );
  }

  public setUseShading(useShading: boolean) {
    const { gl, program } = this;

    this.useShading = useShading ? 1 : 0;
    gl.uniform1i(gl.getUniformLocation(program, "useShading"), this.useShading);
  }


  /*
   * Add object
   */

  public add(object: Object) {
    const { gl, program } = this;
    object.setGl(gl);
    object.setProgram(program);
    this._objects.push(object);
  }


  /*
   * Draw scene
   */

  public render() {
    const gl = this.gl;

    // TODO: traverse objects to be drawn
    this._objects[0].render();
  }
}

export default Scene;
