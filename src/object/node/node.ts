import { mat4 } from "../../util/matrix";

abstract class Node {
  // Webgl properties
  protected gl: WebGL2RenderingContext;
  protected program: WebGLProgram;

  // Node properties
  protected dimension: number = 3;
  protected points: number[] = [];
  protected normals: number[] = [];

  // Material properties
  protected Kd: number[] = [1.0, 1.0, 1.0];
  protected Ks: number[] = [1.0, 1.0, 1.0];
  protected Ka: number[] = [0.25, 0.25, 0.25];
  protected shininess: number = 100;

  // Object transformations
  protected translate: Point = [0, 0, 0];
  protected rotate: Point = [0, 0, 0];
  protected scale: Point = [1, 1, 1];

  // Transformation matrices used
  protected baseTransformMatrix: number[] = mat4.identity();
  protected transformMatrix: number[] = mat4.identity();

  constructor(gl: WebGL2RenderingContext, program: WebGLProgram, baseTransformMatrix: number[]) {
    this.gl = gl || null;
    this.program = program || null;

    this.baseTransformMatrix = baseTransformMatrix || mat4.identity();
  }

  public setGl(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  public setProgram(program: WebGLProgram) {
    this.program = program;
  }

  public setTransformation(transformationType: Transformation, newArr: Point) {
    switch (transformationType) {
      case "rotate":
        this.rotate = newArr;
        break;
      case "scale":
        this.scale = newArr;
        break;
      case "translate":
        this.translate = newArr;
        break;
      default:
        throw `shape.setTransformation: invalid transformation type '${transformationType}'`;
    }
    this.calculateTransformMatrix();
  }

  public getTransformation(transformationType: Transformation) {
    switch (transformationType) {
      case "rotate":
        return this.rotate;
      case "scale":
        return this.scale;
      case "translate":
        return this.translate;
      default:
        throw `shape.getTransformation: invalid transformation type '${transformationType}'`;
    }
  }

  protected calculateTransformMatrix() {
    this.transformMatrix = mat4.mMult(
      mat4.xRotation(this.rotate[0]),
      mat4.yRotation(this.rotate[1]),
      mat4.zRotation(this.rotate[2]),
      mat4.scale(...this.scale),
      mat4.translation(...this.translate),
    );
    const gl = this.gl;

    const transformMatrixPos = gl.getUniformLocation(this.program, "mTransform");

    const transformMatrix = new Float32Array(this.transformMatrix);

    this.gl.uniformMatrix4fv(transformMatrixPos, false, transformMatrix);
  }

  public setPoints(...points: number[]) {
    this.points = points;
  }

  public setNormals(...normals: number[]) {
    this.normals = normals;
  }

  public changePosition(vertexData: number[]) {
    const { gl, program } = this;
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    const positionPos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(positionPos, this.dimension, gl.FLOAT, false, 0, 0);

    return buffer;
  }

  public changeNormal(normalData: number[]) {
    const { gl, program } = this;
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);

    const normalPos = gl.getAttribLocation(program, "vertNormal");
    gl.enableVertexAttribArray(normalPos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(normalPos, this.dimension, gl.FLOAT, false, 0, 0);

    return buffer;
  }

  setPhongProperties() {
    const { gl, program } = this;

    gl.uniform3fv(gl.getUniformLocation(program, "Kd"), new Float32Array(this.Kd));
    gl.uniform3fv(gl.getUniformLocation(program, "Ks"), new Float32Array(this.Ks));
    gl.uniform3fv(gl.getUniformLocation(program, "Ka"), new Float32Array(this.Ka));

    gl.uniform1f(gl.getUniformLocation(program, "shininess"), this.shininess);
  }


  /*
   * Abstract methods
   */

  public abstract setupPoints(): void;

  public abstract render(): void;
}

export default Node;
