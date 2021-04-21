class Light {
  // Light properties
  private _Id: Color;
  private _Is: Color;
  private _Ia: Color;

  // Position, in cartesian for simplicity
  private _position: number[];

  // Callback to be called when camera position changed
  private _propertyChangedCallback: (light: Light) => void;


  /*
   * Constructor
   */

  constructor(propertyChangedCallback?: (light: Light) => void,
              Id?: Color, Is?: Color, Ia?: Color, position?: number[]) {
    this._Id = Id || [1.0, 1.0, 1.0];
    this._Is = Is || [1.0, 1.0, 1.0];
    this._Ia = Ia || [0.25, 0.25, 0.25];
    this._position = position || [1.0, 1.0, 1.0];

    if (!!propertyChangedCallback)
      this._propertyChangedCallback = propertyChangedCallback;
  }


  /*
   * Property getter and setter
  */

  public get Id() {
    return this._Id;
  }

  public get Is() {
    return this._Is;
  }

  public get Ia() {
    return this._Ia;
  }

  public setColor(Id: Color, Is: Color, Ia: Color) {
    this._Id = Id;
    this._Is = Is;
    this._Ia = Ia;
    this.broadcastChange();
  }

  public get position() {
    return this._position;
  }

  public setPosition(position: number[]) {
    this._position = position;
    this.broadcastChange();
  }

  public set propertyChangedCallback(callback: (light: Light) => void) {
    this._propertyChangedCallback = callback;
  }

  /*
   * Calculate view matrix
   */

  public broadcastChange() {
    if (!!this._propertyChangedCallback)
      this._propertyChangedCallback(this);
  }
}

export default Light;
