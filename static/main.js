$(document).ready(function () {
  show_comment();
});

function save_comment() {
  let name = $("#name").val();
  let password = $("#password").val();
  let comment = $("#comment").val();

  let formData = new FormData();
  formData.append("name_give", name);
  formData.append("password_give", password);
  formData.append("comment_give", comment);

  // 입력되었는지 확인해주는 기능
  if (!$("#name").val()) return alert("작성자 이름을 입력해주세요");
  if (!$("#password").val()) return alert("비밀번호를 입력해주세요");
  if (!$("#comment").val()) return alert("응원 한마디를 입력해주세요");

  fetch("/comment", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}
function show_comment() {
  fetch("/comment")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      $("#comment-list").empty();
      rows.forEach((a) => {
        let name = a["name"];
        let comment = a["comment"];
        let id = a["id"];
        let password = a["password"];

        let temp_html = `<div class="card">
                      <div class="card-body">
                      <div class="icon-btn">
                      <a href=""><i class="fa-regular fa-pen-to-square"></i></a>
                      <a href="" data-bs-toggle="modal" data-bs-target="#DelModal" onclick="delEvents('${id}')"><i class="fa-solid fa-trash-can"></i>
                      </a>
                      </div>
                      <blockquote class="blockquote mb-0">
                          <p>${comment}</p>
                          <footer class="blockquote-footer">${name}</footer>
                      </blockquote>
                      </div>
                  </div>`;
        $("#comment-list").append(temp_html);
      });
    });
}
function delDocument(id) {
  const password = $(".modal-pw").val();

  if (!password) return alert("비밀번호를 입력해주세요");

  let formData = new FormData();
  formData.append("id", id);
  formData.append("password", password);

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

function delEvents(id) {
  $("#del-btn").attr("onclick", `delDocument('${id}')`);
}

// ------------------------------------------------ 혜진
// 모달 클래스(모달 내용) 가져오기
let modals = document.getElementsByClassName("modal");
// 버튼 클래스(모달 띄우게 하는 카드) 가져오기
let btns = document.getElementsByClassName("btn");
let funcs = [];

// Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
function Modal(num) {
  return function() {
    // 해당 btns 클래스의 내용을 클릭하면 Modal을 띄움
    btns[num].onclick =  function() {
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