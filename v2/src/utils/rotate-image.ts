export function drawImageRot(
    context: any,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
    deg: number
) {
    context.save();
    var rad = (deg * Math.PI) / 180;
    context.translate(x + width / 2, y + height / 2);
    context.rotate(rad);
    console.log(img);
    context.drawImage(img, (width / 2) * -1, (height / 2) * -1, width, height);
    context.restore();
}
