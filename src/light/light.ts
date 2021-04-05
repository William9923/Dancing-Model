class Light {
  // Light properties
  private _Id: Color;
  private _Is: Color;
  private _Ia: Color;

  // Position
  private _position: number[];


  /*
   * Constructor
   */

  constructor(Id: Color, Is: Color, Ia: Color, position: number[]) {
    this._Id = Id || [0.1953125, 0.50390625, 0.65625];
    this._Is = Is || [0.6171875, 0.87109375, 0.99609375];
    this._Ia = Ia || [0.1953125, 0.50390625, 0.65625];
    this._position = position || [1.0, 1.0, 1.0];
  }


  /*
   * Property getter and setter
   */

   public get Id() {
       return this._Id;
   }

   public set Id(Id: Color) {
       this._Id = Id;
   }

   public get Is() {
       return this._Is;
   }

   public set Is(Is: Color) {
       this._Is = Is;
   }

   public get Ia() {
       return this._Ia;
   }

   public set Ia(Ia: Color) {
       this._Ia = Ia;
   }

   public get position() {
       return this._position;
   }

   public set position(position: number[]) {
       this._position = position;
   }
}

export default Light;
