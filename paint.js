let drawingCanvas = document.querySelector("#canvas");
let saveButton = document.querySelector(".save");
let downloadButton = document.querySelector(".download");
let clearButton = document.querySelector(".clear");
let colorInput = document.querySelector("#penColor");
let widthInput = document.querySelector("#penWidth");
let outputDivision = document.querySelector(".output");
downloadButton.disabled = true;

let ctx = drawingCanvas.getContext("2d");
let penPosition = {
    draw: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
};

drawingCanvas.addEventListener("mouseenter", (e) => {
    penPosition.x = e.pageX;
    penPosition.y = e.pageY;
});
drawingCanvas.addEventListener("mousemove", (e) => {
    penPosition.lastX = penPosition.x;
    penPosition.lastY = penPosition.y;
    penPosition.x = e.clientX;
    penPosition.y = e.clientY;
    drawing();
});
drawingCanvas.addEventListener("mousedown", () => {
    penPosition.draw = true;
});
drawingCanvas.addEventListener("mouseup", () => {
    penPosition.draw = false;
});
drawingCanvas.addEventListener("mouseout", () => {
    penPosition.draw = false;
});
clearButton.addEventListener("click", () => {
    let confirmation = confirm("Are you sure that you want to clear the canvas?");
    if (confirmation == true) {
        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
});
saveButton.addEventListener("click", () => {
    let dataURL = drawingCanvas.toDataURL();
    let newImage = document.createElement("img");
    newImage.src = dataURL;
    outputDivision.appendChild(newImage);
    downloadButton.disabled = false;
    
});
downloadButton.addEventListener("click", () => {
    let dataURL = drawingCanvas.toDataURL();
    let downloadAnchor = document.createElement("a");
    let fileName = Math.random().toString(16) + ".png";
    downloadAnchor.setAttribute("download", fileName);
    downloadAnchor.href = dataURL;
    outputDivision.appendChild(downloadAnchor);
    downloadAnchor.click();
    outputDivision.removeChild(downloadAnchor);
});

function drawing() {
    if(penPosition.draw == true) {
        ctx.beginPath();
        ctx.moveTo(penPosition.lastX, penPosition.lastY);
        ctx.lineTo(penPosition.x, penPosition.y);
        ctx.strokeStyle = colorInput.value;
        ctx.lineWidth = widthInput.value;
        ctx.stroke();
        ctx.closePath();
    } 
}