class Camera {
  // Position
  private _position: number[];


  /*
   * Constructor
   */

  constructor(position: number[]) {
    this._position = position || [0, 0, 0];
  }


  /*
   * Property getter and setter
   */

   public get position() {
       return this._position;
   }

   public set position(position: number[]) {
       this._position = position;
   }
}

export default Camera;
