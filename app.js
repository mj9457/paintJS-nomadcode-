// < -- cosnts  -- 
const canvas = document.getElementById("jsCanvas"); // 캔버스 태그
const ctx = canvas.getContext("2d"); // 캔버스를 2d로 그림
const colors = document.getElementsByClassName("jsColor"); //  하단 색상
const range = document.getElementById("jsRange"); // 브러쉬 크기
const mode = document.getElementById("jsMode"); // 선긋기 or 채우기
const saveBtn = document.getElementById("jsSave"); // 저장하기


const INITIAL_COLOR = "#2C2C2C"; // 기본 색상
const CANVAS_SIZE = 700; // 기본 사이즈
//  -- cosnts  -- >


// < -- defaults -- 
canvas.width = CANVAS_SIZE; // 캔버스 사이즈 = 700 X 700 
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 기본 배경색 "흰색"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // (0.0)좌표부터 캔버스 사이즈만큼 배경색 채우기
ctx.strokeStyle = INITIAL_COLOR; // 기본 선 색상 
ctx.fillStyle = INITIAL_COLOR; // 기본 채우기 색상
ctx.lineWidth = 2.5; // 브러쉬 기본 크기


let painting = false; // 그리기와 채우기를 아무것도 하지않는 것으로 선언
let filling = false;
//  -- defaults -- >


// < -- functions  -- 
function stopPainting() { // 선긋기 멈춤
    painting = false;
}

function startPainting() { // 선긋기 시작
    painting = true;
}

function onMouseMove(event) { // 마우스가 캔버스 위에서 움직일때 실행하는 함수
    const x = event.offsetX; // 캔버스 위에 X,Y값을가져옴
    const y = event.offsetY;

    if(!painting){ // 그리지 않으면( 버튼 클릭 X ) Path만 그림( 눈에는 안보임)
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else { // 그리기 시작하면 Path값에 선을 그림
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) { // 색상 선택시 
    const color = event.target.style.backgroundColor; // 이벤트 타겟에 스타일에서 배경색 가져옴
    ctx.strokeStyle = color; // 가져온 색상으로 선긋기
    ctx.fillStyle = color; // 가져온 색상으로 채우기
}

function handleRangeChange(event) { // 브러쉬 크기 변경시
    const size = event.target.value; //현재 브러쉬 크기 가져옴
    ctx.lineWidth = size; // 기본값이 2.5인 브러쉬 크기를 현재 브러쉬 크기로 변환
}

function handleModeClick() { // 선긋기 or 채우기 버튼 클릭시
    if(filling == true) { // 현재 채우고 있다면
        filling = false; // 채우지 않는다 ( 한마디로 채우기 => 선긋기로 변경하는 것)
        mode.innerText = "Fill" //  버튼의 Fill로 값을 변경
    } else { // 반대이면
        filling = true; // 선긋기 => 채우기로 변경
        mode.innerText = "Paint" // 버튼의 Paint 로 값을 변경
        ctx.fillStyle = ctx.strokeStyle; // 선긋기와 채우기에 스타일은 동일( 색상 동일 )
    }
}

function handleCanvasClick() { // 캔버스를 클릭할 시
    if(filling) { // 채우기가 되어있다면
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // (0.0)에서 CANVAS_SIZE  가로 세로를 채운다. ( 전체 채움 )
    }
}

function handleCM(event) { // 캔버스 안에서 우클릭시
    event.preventDefault(); // 기존 브라우저의 우클릭 메뉴 안뜨게 금지 
}

function handleSaveClick() { // Save 버튼 클릭시 
    const image = canvas.toDataURL("image/png"); // 현재 canvas에 dataURL을 image로 저장할 때 확장자명 : .png
    const link = document.createElement("a"); // a 태그 생성 ( 안보이는 a 태그 )
    link.href = image; // a 태그의 href를 image에 dataURL로 주소 가져오기
    link.download = "image"; // 세이브명
    link.click(); // a태그 클릭시 실행
}
// -- functions  -- >


// < -- Practice -- 
if(canvas) { // 캔버스에서
    canvas.addEventListener("mousemove", onMouseMove); //  마우스를 움직이면 Path만 그림
    canvas.addEventListener("mousedown", startPainting); //  마우스를 클릭하면 직접 선 그리기 시작
    canvas.addEventListener("mouseup", stopPainting); //  마우스를 클릭 후 때면 그리기 중지
    canvas.addEventListener("mouseleave",stopPainting); //  마우스가 벗어나면 그리기 중지
    canvas.addEventListener("click", handleCanvasClick); // fill or paint 버튼 클릭시 모드 변경
    canvas.addEventListener("contextmenu", handleCM); // 우클릭시 기존 우클릭 메뉴 금지 
}

Array.from(colors).forEach(color => // 각 생상을 배열로 담아 
 color.addEventListener("click", handleColorClick) // 각 색상 클릭시 색상 변경
);

if(range) { // 브러쉬 크기에서
 range.addEventListener("input", handleRangeChange)  // 인풋값 변경시 브러쉬 크기 변경
};

if(mode) { // 모드 클릭 버튼에서
    mode.addEventListener("click", handleModeClick) // 버튼 클릭시 모드 변경
};

if(saveBtn) { // 저장 버튼에서
    saveBtn.addEventListener("click", handleSaveClick) //  버튼 클릭시 저장 
};
//  -- Practice -- >