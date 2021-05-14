export interface Vec2 {
  x: number;
  y: number;
}

export const radToVec = (rads: number): Vec2 => ({
  x: Math.sin(rads),
  y: Math.cos(rads)
});

export const vecToRad = (vec: Vec2): number => Math.atan2(-vec.x, -vec.y) + Math.PI;

export const addVecs = (a: Vec2, b: Vec2): Vec2 => ({
  x: a.x + b.x,
  y: a.y + b.y
});

export const subtractVecs = (a: Vec2, b: Vec2): Vec2 => ({
  x: a.x - b.x,
  y: a.y - b.y
});

export const scale = (vec: Vec2, scalar: number): Vec2 => ({
  x: vec.x * scalar,
  y: vec.y * scalar
});

export const magnitude = (vec: Vec2): number => Math.sqrt(vec.x**2 + vec.y**2);

const clamp = (val: number, min: number, max: number): number => {
  let newVal = val % max;
  if (newVal < 0) {
    newVal += max;
  }
  return newVal;
};

export const loop = (vec: Vec2, max: Vec2, min: Vec2 = { x: 0, y: 0 }): Vec2 => ({
  x: clamp(vec.x, min.x, max.x),
  y: clamp(vec.y, min.y, max.y)
});
