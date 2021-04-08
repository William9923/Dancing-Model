import { vec } from "../../../util/vector";

const buildPolygon = (
  ps: Point[],
  normalArray: number[],
  reversed: boolean = false,
) => {
  const temp1 = vec.sub(ps[1], ps[0]);
  const temp2 = vec.sub(ps[ps.length - 1], ps[0]);
  const normalDir = reversed ? -1 : 1;
  const normal = vec.mul(normalDir, vec.cross(temp1, temp2));

  for (let i = 0; i < ps.length; i++)
    normalArray.push(...normal);

  let res = [];
  if (reversed) {
    for (let i = ps.length - 1; i >= 0; i--)
      res.push(...ps[i]);
  } else {
    for (let i = 0; i < ps.length; i++)
      res.push(...ps[i]);
  }
  return res;
};

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

export { buildPolygon, buildQuad };
