import {buildQuad} from "./util";

export const buildCubePoints = (normalArray: number[]) => {
  // prettier-ignore
  const coords: Point[] = [
        [-0.5, -0.5, 0.5],
        [-0.5, 0.5, 0.5],
        [-0.5, -0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [0.5, -0.5, 0.5],
        [0.5, 0.5, 0.5],
        [0.5, -0.5, -0.5],
        [0.5, 0.5, -0.5],
    ];

  // prettier-ignore

  const arr = [

    // Front side
    ...buildQuad(
        coords[0],
        coords[1],
        coords[5],
        coords[4],
        normalArray,
        true,
    ),

    // Back side
    ...buildQuad(
        coords[2],
        coords[3],
        coords[7],
        coords[6],
        normalArray,
        false,
    ),

    // Left side
    ...buildQuad(
        coords[4],
        coords[6],
        coords[7],
        coords[5],
        normalArray,
        false,
    ),
    
    // Right side
    ...buildQuad(
        coords[0],
        coords[2],
        coords[3],
        coords[1],
        
        normalArray,
        true,
    ),

    // Bottom side
    ...buildQuad(
        coords[0],
        coords[2],
        coords[6],
        coords[4],
        normalArray,
        false,
    ),

    // Top side
    ...buildQuad(
        coords[1],
        coords[3],
        coords[7],
        coords[5],
        normalArray,
        true,
    )
];
    console.log("Points");
    console.log(arr);
  return arr;
};
