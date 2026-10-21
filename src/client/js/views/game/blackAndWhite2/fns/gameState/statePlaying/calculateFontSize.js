export default (text, width, fontFamily = 'Arial') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const baseSize = 16;

  ctx.font = `${baseSize}px ${fontFamily}`;

  const textWidth = ctx.measureText(text).width;

  return baseSize * (width / textWidth);
}
