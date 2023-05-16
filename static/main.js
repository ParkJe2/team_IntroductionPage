$(document).ready(function () {
  show_comment();
});

// post 하는 기능
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
  if (!$("#name").val()) return alert("작성자 이름을 입력해주세요");
  if (!$("#password").val()) return alert("비밀번호를 입력해주세요");
  if (!$("#comment").val()) return alert("응원 한마디를 입력해주세요");

  fetch("/comment", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      // 메시지 띄워줌
      alert(data["msg"]);
      window.location.reload();
    });
}

// get 하는 기능
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
        //comment-list에 보내줌
        $("#comment-list").append(temp_html);
      });
    });
}
// --------------------------------------------------------------------


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
