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

  // 빈 값 검사_J
  // 입력 폼에 값을 입력하지 않았을 경우 알럿 노출
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

        // 수정/삭제 아이콘 추가(폰트어썸), 삭제 버튼 클릭 시 비밀번호 입력 모달창 노출_J
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
  // 삭제 모달창 input 빈값 검사_J
  if (!password) return alert("비밀번호를 입력해주세요");

  let formData = new FormData();
  formData.append("id", id);
  formData.append("password", password);

  // 서버에서 가져온 값, (data["result"]) 고유 아이디, 유저가 입력한 비밀번호 값을 매치하여 일치할 경우(1) 삭제+알럿 노출,
  // 일치하지 않을 경우(0) 삭제X+알럿 노출_J
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

//버튼 이벤트_J
function delEvents(id) {
  $("#del-btn").attr("onclick", `delDocument('${id}')`);
}
// attr - 엘리먼트의 속성 값을 가져오거나 변경할 수 있는 함수
// del-btn 온클릭, delDocument의 아이디 값을 가져온다.
