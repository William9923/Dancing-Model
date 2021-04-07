import { vec } from "../../util/vector";

// sisi depan yg ngehadep kita (depan belakang) front, sisi kiri kanan: side, sisi bawah atas: flat
type orientation = "front" | "side" | "ground";
const x = 0;
const y = 1;
const z = 2;

/*
 * @param p1 the first point
 * @param p2 the second point
 * @param p3 the third point
 * @param p4 the fourth point
 */
const buildQuad = (
  p1: Point,
  p2: Point,
  p3: Point,
  p4: Point,
  normalArray: number[],
  reversed: boolean = false,
) => {
  const temp1 = vec.sub(p2, p1);
  const temp2 = vec.sub(p4, p1);
  const normalDir = reversed ? -1 : 1;
  const normal = vec.mul(normalDir, vec.cross(temp1, temp2));

  normalArray.push(...normal, ...normal, ...normal, ...normal);

  if (reversed) {
    return [...p4, ...p3, ...p2, ...p1];
  } else {
    return [...p1, ...p2, ...p3, ...p4];
  }
};

export { buildQuad };
