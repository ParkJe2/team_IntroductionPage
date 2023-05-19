// -----------------------------------김영빈---------------------------------------------------
$(document).ready(function () {
  show_comment();
});

// 1. post 하는 기능
function save_comment() {
  // name, password, comment 저장
  let name = $("#name").val();
  let password = $("#password").val();
  let comment = $("#comment").val();

  // formData에 값을 태워서 fetch로 /comment로 날려줌
  let formData = new FormData();
  formData.append("name_give", name);
  formData.append("password_give", password);
  formData.append("comment_give", comment);

  //  빈칸이 있으면, 있다고 알려주는 기능
  // 입력되었는지 확인해주는 기능
  // <-----------빈 값 검사_제이-----------------
  // 입력 폼에 값을 입력하지 않았을 경우 알럿 노출 ++5/19 작성자 이름 -> 닉네임 수정
  if (!$("#name").val()) return alert("닉네임을 입력해주세요");
  if (!$("#password").val()) return alert("비밀번호를 입력해주세요");
  if (!$("#comment").val()) return alert("응원 한마디를 입력해주세요");
  // --------------------제이----------------------->

  fetch("/comment", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      // 메시지 띄워줌
      alert(data["msg"]);
      window.location.reload();
    });
}

// 4. get 하는 기능
function show_comment() {
  fetch("/comment")
    .then((res) => res.json())
    .then((data) => {
      // rows안에 result값 담아줌
      let rows = data["result"];
      $("#comment-list").empty();
      // name, comment, 글쓴이 고유id, 입력한 password를 가져옴
      rows.forEach((a) => {
        let name = a["name"];
        let comment = a["comment"];
        let id = a["id"];
        let password = a["password"];

        //가져온 응원 한마디와 닉네임을 보여줌
        // <-----------// 수정/삭제 아이콘 추가(폰트어썸), 삭제 버튼 클릭 시 비밀번호 입력 모달창, 수정 버튼 클릭 시 수정 인풋창 노출_제이--------------->
        let temp_html = `<div id="${id}" class="card">
                        <div class="card-body">
                        <div class="icon-btn">
                        <a onclick="editEvents('${id}');"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a href="" data-bs-toggle="modal" data-bs-target="#DelModal" onclick="delEvents('${id}')"><i class="fa-solid fa-trash-can"></i>
                        </a>
                        </div>
                        <blockquote class="blockquote mb-0">
                            <p>${comment}</p>
                            <footer class="blockquote-footer">${name}</footer>
                        </blockquote>
                        </div>
                    </div>`;
        //comment-list에 보내줌

        $("#comment-list").append(temp_html);
      });
    });
}

// ---------------------------------------------------------------------김영빈--------------------------

// <------------------제아-----------------------
function delDocument(id) {
  const password = $(".modal-pw").val();

  // 삭제 모달창 input 빈값 검사
  if (!password) return alert("비밀번호를 입력해주세요");

  let formData = new FormData();
  formData.append("id", id);
  formData.append("password", password);

  // 서버에서 가져온 값, (data["result"]) 고유 아이디, 유저가 입력한 비밀번호 값을 매치하여 일치할 경우(1) 삭제+알럿 노출,
  // 일치하지 않을 경우(0) 삭제X+알럿 노출
  fetch("/delDocument", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      if (data["result"] == 1) {
        alert("삭제가 완료 되었습니다");
        window.location.reload();
      } else {
        alert("잘못된 비밀번호입니다.");
      }
    });
}

// 삭제 버튼 이벤트
function delEvents(id) {
  $("#del-btn").attr("onclick", `delDocument('${id}')`);
}
// attr - 엘리먼트의 속성 값을 가져오거나 변경할 수 있는 함수
// del-btn 온클릭, delDocument의 아이디 값을 가져온다.

// 5/19 수정 기능 추가분

function editEvents(id) {
  const comment = $(`#${id} > div > blockquote > p`).text();
  const name = $(`#${id} > div > blockquote > footer`).text();
  // 위 경로에 있는 텍스트를 가져온다.

  $(`#${id} > div > div`).hide();
  // 위 경로에 있는 div를 숨긴다.

  $(`#${id} > div > blockquote > footer`).attr("class", "blockquote");
  // 위 경로에 있는 클래스 네임을 "blockquote"로 바꿔준다 (.attr()사용, 닉네임 앞에 "-"를 지우기 위해)

  $(`#${id} > div > blockquote > p`).text("");
  $(`#${id} > div > blockquote > p`).append(
    `<input type="text" class="form-control commentForm" id="${id}-editComment" value="${comment}">`
  );
  // 위 경로의 텍스트를 공백처리(.text("")) 한 후, 응원 한마디 수정 input창을 추가한다.(.append())

  $(`#${id} > div > blockquote > footer`).text("");
  $(`#${id} > div > blockquote > footer`).append(
    `<div class="editForm">
    <input type="text" class="form-control nameForm" id="${id}-editName" value="${name}">
    <input type="password" class="form-control pwForm" id="${id}-editPw" placeholder="비밀번호 입력">
    <button type="button" class="edit-btn" onclick="editDocument('${id}')">수정</button>
    </div>`
  );
  // 위 경로의 텍스트를 공백처리(.text("")) 한 후, 닉네임 수정 input창, 비밀번호 입력창, 수정 버튼을 추가한다.(.append())
}

function editDocument(id) {
  const name = $(`#${id}-editName`).val();
  const comment = $(`#${id}-editComment`).val();
  const password = $(`#${id}-editPw`).val();
  // 각 변수에 아이디를 포함한 수정 내용 값을 담는다

  if (!name) return alert("닉네임을 입력해주세요");
  if (!comment) return alert("응원 한마디를 입력해주세요");
  if (!password) return alert("비밀번호를 입력해주세요");
  // 빈 값 검사

  let formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("comment", comment);
  formData.append("password", password);

  fetch("/editDocument", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      if (data["result"] == 1) {
        alert("수정이 완료 되었습니다");
        window.location.reload();
      } else {
        alert("잘못된 비밀번호입니다.");
      }
    });
}
// 서버에서 가져온 값, (data["result"]) 고유 아이디, 유저가 입력한 비밀번호 값을 매치하여 일치할 경우(1) 수정+알럿 노출,
// 일치하지 않을 경우(0) 수정X+알럿 노출

// ----------------------제이----------------------->

// ------------------------------------------------ 혜진
// 모달 클래스(모달 내용) 가져오기
let modals = document.getElementsByClassName("modal");
// 버튼 클래스(모달 띄우게 하는 카드) 가져오기
let btns = document.getElementsByClassName("btn");
let funcs = [];

// Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
function Modal(num) {
  return function () {
    // 해당 btns 클래스의 내용을 클릭하면 Modal을 띄움
    btns[num].onclick = function () {
      modals[num].style.display = "block";
    };
  };
}

// 원하는 모달 수만큼 모달 함수를 호출해서 funcs 함수(배열)에 정의
for (let i = 0; i < btns.length; i++) {
  funcs[i] = Modal(i);
}

// funcs 배열에서 해당 인덱스 j의 함수 호출
for (let j = 0; j < btns.length; j++) {
  funcs[j]();
}

// window 객체를 클릭하면 모달 닫기
window.onclick = function (event) {
  if (event.target.className == "modal") {
    event.target.style.display = "none";
  }
};
// ------------------------------------------------ 혜진

// 우리 주석//
function addLike() {
  countA = countA + 1;
  document.querySelector("#result").innerHTML = +countA;
}
var countA = 0;

function addLike1() {
  countB = countB + 1;
  document.querySelector("#result1").innerHTML = +countB;
}
var countB = 0;

function addLike2() {
  countC = countC + 1;
  document.querySelector("#result2").innerHTML = +countC;
}
var countC = 0;

function addLike3() {
  countD = countD + 1;
  document.querySelector("#result3").innerHTML = +countD;
}
var countD = 0;

function addLike4() {
  countE = countE + 1;
  document.querySelector("#result4").innerHTML = +countE;
}
var countE = 0;
// 우리끝
