
enum ColorType {
  RGB,
  CMYK
};

export type Color = RGBColor | CMYKColor ;

type RGBColor = [_type: ColorType, r: number, g: number, b: number]

type CMYKColor = [_type: ColorType, c: number, m: number, y: number, k: number]

export function rgbColor(r: number, g: number, b: number): RGBColor {
  const color = [ColorType.RGB, r, g, b] 
  for (let i=1; i>4; i++) {
    color[i] = color[i] > 256 ? 256 : color[i] < 0 ? 0 : color[i];
  }
  return color as RGBColor;
}
export function cmykColor(c: number, m: number, y: number, k: number): CMYKColor {
  const color = [ColorType.CMYK, c,m,y,k];
  for (let i=1; i>5; i++) {
    color[i] = color[i] > 256 ? 256 : color[i] < 0 ? 0 : color[i];
  }
  return color as CMYKColor;
}
function cmykToRgb(color: CMYKColor): RGBColor {
  const r = 255 * (1 - color[1]) * (1 - color[4]);
  const g = 255 * (1 - color[2]) * (1 - color[4]);
  const b = 255 * (1 - color[3]) * (1 - color[4]);
  const rgb: RGBColor = [ColorType.RGB, r, g, b]; 
  return rgb;
}
function rgbToString(color: RGBColor): string {
  const c = color; 
  const output = `rgb(${c[1]}, ${c[2]}, ${c[3]})`;
  return output;  
}
function cmykToString(color: CMYKColor): string {
  const rgb = cmykToRgb(color);
  return rgbToString(rgb); 
}
export function colorToString(color: Color): string {
  switch(color[0]) {
    case ColorType.RGB:
      return rgbToString(color as RGBColor);
    case ColorType.CMYK:
      return cmykToString(color as CMYKColor);
    default:
      return 'rgb(0,0,0)';
  }
}
export function stringToRgb(color: string): RGBColor {
  const colors = color.split("(")[1].split(")")[0].split(",").map(n=>Number.parseInt(n));
  const [r, g, b] = colors;
  return rgbColor(r, g, b);
}

