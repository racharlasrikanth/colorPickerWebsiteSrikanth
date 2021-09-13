const hexToRGBconverter = function (hexCode) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hexCode.length == 4) {
    r = "0x" + hexCode[1] + hexCode[1];
    g = "0x" + hexCode[2] + hexCode[2];
    b = "0x" + hexCode[3] + hexCode[3];

    // 6 digits
  } else if (hexCode.length == 7) {
    r = "0x" + hexCode[1] + hexCode[2];
    g = "0x" + hexCode[3] + hexCode[4];
    b = "0x" + hexCode[5] + hexCode[6];
  }

  return "rgb(" + +r + "," + +g + "," + +b + ")";
};

const rgbToHslConverter = function (r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  let returnedValue = [
    Math.floor(h * 360),
    Math.floor(s * 100),
    Math.floor(l * 100),
  ];
  return `hsl(${returnedValue[0]}, ${returnedValue[1]}%, ${returnedValue[2]}%)`;
};

const hslToHexConverter = function (h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
};

export { hexToRGBconverter, rgbToHslConverter, hslToHexConverter };
