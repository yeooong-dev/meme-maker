//캔버스
const canvas = document.querySelector("canvas");
// 칼라 변경
const color = document.getElementById("color");
// 칼라 옵션
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
// 배경색 변경
const modeBtn =document.getElementById("mode-btn");
//클리어
const destroyBtn = document.getElementById("destroy-btn");
//지우개
const eraserBtn = document.getElementById("eraser-btn");
//이미지 삽입
const fileInput = document.getElementById("file")
//이미지 저장
const SaveBtn = document.getElementById("save");
//붓 굵기
const lineWidth = document.getElementById("line-width");
//붓
const ctx = canvas.getContext("2d");
//텍스트 상자
const textInput = document.getElementById("text");

const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 1000;

canvas.width=1500;
canvas.height=1000;
ctx.lineWidth = lineWidth.value;
ctx.lineCap ="round";
ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

//ispainting이 true면 stroke를 써서 선을 그리고 함수를 끝냄
//false라면 죠용히 브러쉬만 움직여줌
function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
}

function onLineWidthChange(event){
   ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
};

function onColorClick(event){
    const colorValue = event.target.dataset.color
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false
        modeBtn.innerText ="Paint"
    } else {
        isFilling = true
        modeBtn.innerText ="Brush"
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserCilck(){
    ctx.strokeStyle = "white";
    isFilling =false
    modeBtn.innerText ="Brush";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}    

function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "60px serif";
        ctx.fillText(text, event.offsetX, event.offsetY)
        ctx.restore();
    }
}

function onSaveClick(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a")
    a.href =url
    a.download = "myDrawing.png"
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change" , onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserCilck);
fileInput.addEventListener("change", onFileChange);
SaveBtn.addEventListener("click", onSaveClick);


// ctx.lineWidth = 2;

// const colors = [
//     "#55efc4",
//     "#81ecec",
//     "#74b9ff",
//     "#a29bfe",
//     "#dfe6e9",
//     "#00b894",
//     "#00cec9",
//     "#6c5ce7",
//     "#ffeaa7",
//     "#fab1a0",
//     "#ff7675",
//     "#636e72",
//     "#fdcb6e",
//     "#e17055",
//     "#2d3436"
// ]

// function onclick(event){
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }

// canvas.addEventListener("mousemove", onclick);

//집 그리기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.fillRect(200, 200, 200, 20);
// ctx.lineWidth = 2;
// ctx.strokeRect(300, 300, 50, 100);
// ctx.moveTo(200,200);
// ctx.lineTo(325,100);
// ctx.lineTo(450,200)
// ctx.fill();

//사람 그리기
// ctx.fillRect(200, 200, 15, 100);
// ctx.fillRect(400, 200, 15, 100);
// ctx.fillRect(260,200,90,200);
// ctx.arc(305,150,75,0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(270, 130, 7, 0, 2 * Math.PI);
// ctx.arc(340, 130, 7, 0, 2 * Math.PI);
// ctx.fill();
