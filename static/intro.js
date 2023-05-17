// 문서 객체 읽어드리고 생성하기
const introText = document.querySelector("#intro");
const speakBtn = document.querySelector("#speakBtn");

// web Speech API
const speechContent = window.speechSynthesis;

// speech가 실행 중인지 여부를 확인하기 위한 변수
let isSpeaking = false;

// button을 누를 시 음성 출력
speakBtn.addEventListener("click", () => {
  speakIntroText(introText);
  // speech 시작 시 isSpeaking 변수를 true로 변경
  isSpeaking = true;
});

// text를 누를 시 현재 나오는 음성 정지
introText.addEventListener("click", () => {
  speechContent.cancel();
  isSpeaking = false;
});

// 음성을 실행하는 함수
function speakIntroText(text) {
  // SpeechSynthesisUtterance(): JS에서 인간의 음성으로 변환을 가능하게 해주는 객체
  const speech = new SpeechSynthesisUtterance(text.innerText);
  speech.lang = "ko-KR";
  speech.rate = 0.9; // 음성 속도 조절
  // 'speech.onend'콜백 함수를 사용해서 speech 종료 시 isSpeaking변수를 false로 변경
  speech.onend = () => {
    isSpeaking = false;
  };
  // 위 speech상수에 저장된 텍스트를 음성으로 변환하여 출력해준다. true: 중복실행 방지
  speechContent.speak(speech, true);
}
