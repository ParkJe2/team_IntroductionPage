const ourFavoriteQuote = [
  {
    quote:
      "가는 소스가 고와야 오는 파일에 바이러스 없다. 늦게 배운 코딩 날 새는 줄 모른다.",
    menber: "김영빈",
  },
  {
    quote: "Actions speak louder than words.",
    menber: "김우리",
  },
  {
    quote: "실패는 잊어라 그러나 그것이 준 교훈은 절대 잊으면 안된다.",
    menber: "박제이",
  },
  {
    quote:
      "가장 무서운 순간은 항상 시작하기 직전이다. 그 후에는 모든 것이 나아지기만 할 것이다.",
    menber: "장혜진",
  },
  {
    quote: "짧은 인생, 당신이 언제나 즐거웠으면 좋겠다.",
    menber: "지설희",
  },
];

// 문서 객체 읽어들이고 생성하기
const footer = document.querySelector("#quote");
const quote = document.querySelector("#quote span:first-child");
const member = document.querySelector("#quote span:last-child");

// 화면에 즉시 보여지게 하는 함수
setTimeout(() => {
  // 랜덤 비전 만들기
  const slideVision =
    ourFavoriteQuote[Math.floor(Math.random() * ourFavoriteQuote.length)];

  quote.innerText = slideVision.quote;
  member.innerText = slideVision.menber;
}, 0);

// 자동 슬라이드 구현
let index = 0; // 인덱스 초기값

const loopInterval = setInterval(() => {
  const slideVision = ourFavoriteQuote[index];

  quote.innerText = slideVision.quote;
  member.innerText = slideVision.menber;

  // ourVision 배열의 길이를 넘어가면 index를 0으로 초기화한다.
  // (배열의 길이: 5, 인덱스: 4인 경우, 나눈 나머지는 0이므로 index변수에 다시 0이 할당되어 0번째 요소를 선택할 수 있다.)
  index = (index + 1) % ourFavoriteQuote.length;
}, 2000);
