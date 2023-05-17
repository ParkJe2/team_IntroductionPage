// 문서 객체 읽어드리고 생성하기
const introText = document.querySelector("#intro");
const speakBtn = document.querySelector("#speakBtn");

// web Speech API
const speechContent = window.speechSynthesis;

speakBtn.addEventListener("click", () => {
  speakIntroText(introText);
});

introText.addEventListener("click", () => {
  speakIntroText(introText);
});

function speakIntroText(text) {
  const speech = new SpeechSynthesisUtterance(text.innerText);
  speech.lang = "ko-KR";
  speech.rate = 0.9; // 음성 속도 조절
  speechContent.speak(speech, true);
}
