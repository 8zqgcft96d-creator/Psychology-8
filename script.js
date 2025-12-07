/* Full script.js with all features */
const questions = [
  {
    q: "1. 當你遇到一個新的挑戰/任務時,你的第一反應是：",
    options: {
      A: "馬上跳進去、先試看看",
      B: "先觀察環境、研究方式",
      C: "有點猶豫、怕搞砸、先做部分準備",
      D: "想幫助他人、在背後支撐或配合"
    }
  },
  {
    q: "2. 人際互動中，當朋友情緒低落時，你會：",
    options: {
      A: "鼓勵他們「快起來、一起去做點什麼」",
      B: "安靜陪伴、傾聽他們說出來",
      C: "有點退縮、不太確定怎麼幫比較好",
      D: "主動提供支持、做好後勤或照顧他們"
    }
  },
  {
    q: "3. 思考人生方向時，你偏好：",
    options: {
      A: "設定目標、立刻動手實踐",
      B: "深入思考、寫筆記、分析可能性",
      C: "小心翼翼、怕錯、慢慢走",
      D: "和他人分享、互相支持、一步一腳印"
    }
  },
  {
    q: "4. 面對失敗或挫折，你最可能：",
    options: {
      A: "立刻反彈、再戰一次",
      B: "自我反省、思考教訓",
      C: "感到沮喪、有點退縮、怕再犯錯",
      D: "尋求或提供人際支持、共同面對"
    }
  },
  {
    q: "5. 你最看重的特質是：",
    options: {
      A: "冒險精神 / 行動力",
      B: "思考深度 / 內在探索",
      C: "謹慎 / 安全感",
      D: "溫暖 / 支持他人"
    }
  }
];

let current = 0;
let answers = [];
let radarChart;

const startBtn = document.getElementById("startBtn");
const quizDiv = document.getElementById("quiz");
const coverDiv = document.getElementById("cover");
const resultDiv = document.getElementById("result");
const analysisDiv = document.getElementById("analysis");

startBtn.onclick = () => {
  coverDiv.style.display = "none";
  quizDiv.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  quizDiv.innerHTML = "";

  const qCard = document.createElement("div");
  qCard.className = "question-card";

  qCard.innerHTML = `<h3>${questions[current].q}</h3>`;

  Object.entries(questions[current].options).forEach(([key, text]) => {
    const opt = document.createElement("div");
    opt.className = "option";
    opt.innerHTML = `<span class='radio-circle'></span>${key}. ${text}`;
    opt.onclick = () => selectOption(key);
    qCard.appendChild(opt);
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "nextBtn";
  nextBtn.textContent = current === questions.length - 1 ? "完成並看結果" : "下一題";
  nextBtn.disabled = true;
  nextBtn.id = "nextButton";
  nextBtn.onclick = nextQuestion;

  quizDiv.appendChild(qCard);
  quizDiv.appendChild(createProgress());
  quizDiv.appendChild(nextBtn);
}

function createProgress() {
  const bar = document.createElement("div");
  bar.id = "progress";
  bar.innerHTML = `<div id='progressFill' style='width:${(current / questions.length) * 100}%;'></div>`;
  return bar;
}

function selectOption(letter) {
  answers[current] = letter;
  document.getElementById("nextButton").disabled = false;
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizDiv.style.display = "none";
  resultDiv.style.display = "block";

  const count = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(a => count[a]++);

  drawRadar(count);
  showAnalysis(count);
}

function drawRadar(count) {
  const ctx = document.getElementById("radarChart").getContext("2d");
  if (radarChart) radarChart.destroy();

  radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["馬(A)", "男孩(B)", "狐狸(C)", "鼴鼠(D)"],
      datasets: [
        {
          label: "你的分佈",
          data: [count.A, count.B, count.C, count.D],
          borderColor: "black",
          backgroundColor: "rgba(0,0,0,0.2)"
        }
      ]
    },
    options: { scales: { r: { suggestedMin: 0, suggestedMax: 5 } } }
  });

  document.getElementById("downloadBtn").onclick = function () {
    const link = document.createElement("a");
    link.href = radarChart.toBase64Image();
    link.download = "result.png";
    link.click();
  };
}

function showAnalysis(count) {
  analysisDiv.innerHTML = "";

  const types = {
    A: `你是【馬型】︰你習慣當那個「載大家走過去」的人。你的樣子…`,
    B: `你是【男孩型】︰關於自己，你還在學著怎麼相信…`,
    C: `你是【狐狸型】︰你看得很清楚，只是習慣把心收好…`,
    D: `你是【鼴鼠型】︰你的溫柔，是世界需要的安慰…`
  };

  const max = Math.max(count.A, count.B, count.C, count.D);
  Object.entries(count).forEach(([key, value]) => {
    if (value === max) {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = types[key];
      analysisDiv.appendChild(card);
    }
  });

  document.getElementById("restartBtn").onclick = () => location.reload();
}
