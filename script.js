// script.js - 心理測驗核心邏輯
const questions = [
  {
    text: "1. 當你遇到一個新的挑戰時，你的第一反應是：",
    options: [
      {key: 'A', text: '（A） 馬上跳進去、先試看看', type: '馬' },
      {key: 'B', text: '（B） 先觀察環境、研究方式', type: '男孩' },
      {key: 'C', text: '（C） 有點猶豫、怕搞砸、先做部分準備', type: '狐狸' },
      {key: 'D', text: '（D） 幫助他人，在背後支撐或配合', type: '鼴鼠' }
    ]
  },
  {
    text: "2. 在人際互動中，當朋友需要幫忙 /情緒低落時，你通常會：",
    options: [
      {key: 'A', text:'（A）鼓勵他們「快起來、一起去做點什麼」', type:'馬'},
      {key: 'B', text:'（B）安靜陪伴、傾聽他們說出來', type:'男孩'},
      {key: 'C', text:'（C）有點退縮、不太確定怎麼幫比較好', type:'狐狸'},
      {key: 'D', text:'（D）主動提供支持、做好後勤或照顧他們', type:'鼴鼠'}
    ]
  },
  {
    text: "3. 當你在思考人生或尋找方向時，你偏好哪種方式？",
    options: [
      {key:'A', text:'（A）設定目標、立刻動手實踐', type:'馬'},
      {key:'B', text:'（B）深入思考、寫筆記、分析可能性', type:'男孩'},
      {key:'C', text:'（C）小心翼翼、怕錯、慢慢走', type:'狐狸'},
      {key:'D', text:'（D）和他人分享、互相支持、一步一腳印', type:'鼴鼠'}
    ]
  },
  {
    text: "4. 面對失敗或挫折，你最可能的反應是：",
    options: [
      {key:'A', text:'（A）立刻反彈、再戰一次', type:'馬'},
      {key:'B', text:'（B）自我反省、思考教訓', type:'男孩'},
      {key:'C', text:'（C）感到沮喪、有點退縮、怕再犯錯', type:'狐狸'},
      {key:'D', text:'（D）尋求或提供人際支持、共同面對', type:'鼴鼠'}
    ]
  },
  {
    text: "5. 如果要選擇你最看重的特質，是哪一項：",
    options: [
      {key:'A', text:'（A）冒險精神/行動力', type:'馬'},
      {key:'B', text:'（B）思考深度/內在探索', type:'男孩'},
      {key:'C', text:'（C）謹慎/安全感', type:'狐狸'},
      {key:'D', text:'（D）溫暖/支持他人', type:'鼴鼠'}
    ]
  }
];

const analyses = {
  '馬': `你是【馬型】：\n你習慣當那個「載大家走過去」的人。\n你的樣子\n你很習慣扛責任、撐住場面。很多時候，你自己其實也會累、也會徬，可是你會先問：「大家還好嗎？」你是那種會陪著別人走一段的人，願意當那匹穩穩向前的馬。\n\n你給人的感覺\n你讓人有安全感。只要你在，事情好像就能慢慢被處理好。很多人會在不知不覺中依賴你、把難題丟給你，因為你看起來總是知道該怎麼做。\n\n給你的提醒\n你不是永遠都要那麼堅強。當你覺得很重的時候，也可以停下來，把一些重量放回去，或者請別人幫忙扛一點。有時候，真正的力量不是一直往前衝，而是敢在需要的時候說：「我也想被照顧。」`,

  '男孩': `你是【男孩型】：\n關於自己，你還在學著怎麼相信。\n你的樣子\n你有很強的感受力，對世界充滿好奇，也對自己充滿問號。你常常會想：「我到底夠不夠好？」「我能不能被喜歡、被理解？」這種敏感，讓你更容易看見別人的情緒，也更容易忽略自己的需要。\n\n你給人的感覺\n在別人眼中，你像一個正在長大的孩子，真誠、直接、很真實。你會為了關係不斷自我檢討，只想讓自己變得更好。很多人因為你願意說出脆弱，而覺得被陪伴。\n\n給你的提醒\n你不需要完美才值得被愛。試著多看看自己已經做得不錯的地方，允許「還在路上」的自己存在。當你願意對自己溫柔一點，你就會發現：原來你早就已經是某個人心裡，很重要的那個存在。`,

  '狐狸': `你是【狐狸型】：\n你看得很清楚，只是習慣把心收好。\n你的樣子\n你敏銳、細心，對人的真心假意、情況的危險程度，有一種直覺式的判斷。你不會輕易把自己交出去，因為你知道受傷有多痛，所以寧可慢一點、再確定一點。\n\n你給人的感覺\n一開始，你可能讓人覺得有距離、有點冷，但真正走進你心裡的人都知道：你其實非常忠誠、非常有義氣。你不會亂承諾，一旦說出口，就會盡力做到。\n\n給你的提醒\n保持界線是好事，但也別把自己關得太緊。不是每個人都會像過去那些人一樣傷你。你可以試著多給世界一點點機會—不是為了別人，而是為了讓自己有機會被好好對待。`,

  '鼴鼠': `你是【鼴鼠型】：\n你的溫柔，是世界很需要的安慰。\n你的樣子\n你很重視「舒服感」——食物、氣氛、陪伴、小確幸。你知道人不可能每天都很強，所以你特別會照顧情緒、照顧氣氛。你會為別人準備點心、傳訊息問候、講些好笑的話，讓沉重變得沒那麼可怕。\n\n你給人的感覺\n你像一個會做甜點的好朋友，可能不會給一大串理性分析，但總會讓人覺得：「跟你在一起就不那麼難過了。」多人其實靠你的存在，才撐過了一些很黑暗的日子。\n\n給你的提醒\n在照顧別人之前，也別忘了問一句：「那我自己呢？」你值得把同樣的溫柔，留一份給自己。偶爾不用那麼逗趣、那麼體貼，也沒關係—就算今天只想躺著，你一樣是很可愛的你。`
};

let idx = 0;
let answers = []; // store chosen types
let score = { 馬:0, 男孩:0, 狐狸:0, 鼴鼠:0 };
let radarChart = null;

const quizContainer = document.getElementById('quiz-container');
const progressBar = document.getElementById('progress-bar');

function renderCard() {
  const q = questions[idx];
  const card = document.createElement('div');
  card.className = 'quiz-card';

  const qText = document.createElement('h3');
  qText.innerText = q.text;
  card.appendChild(qText);

  const opts = document.createElement('div');
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerText = opt.text;
    btn.onclick = () => selectOption(opt.type);
    opts.appendChild(btn);
  });

  // 下一題按鈕（在卡片下方）
  const nextBtn = document.createElement('button');
  nextBtn.innerText = idx < questions.length -1 ? '下一題' : '完成並看結果';
  nextBtn.disabled = true;
  nextBtn.style.marginTop = '12px';

  // 當選擇一個選項後 enable next
  function selectOption(type) {
    // 記錄選擇（覆蓋本題選擇）
    answers[idx] = type;
    // 先把所有 option 標記回原狀
    const optionButtons = card.querySelectorAll('.option');
    optionButtons.forEach(b => { b.style.opacity = '1'; b.style.border = 'none'; });
    // 將被選的按鈕變色
    const clicked = Array.from(optionButtons).find(b => b.innerText === q.options.find(o=>o.type===type).text);
    if (clicked) {
      clicked.style.opacity = '0.9';
      clicked.style.border = '2px solid #1976d2';
    }
    nextBtn.disabled = false;
  }

  nextBtn.onclick = () => {
    // 如果本題沒選擇，拒絕
    if (!answers[idx]) return;
    // 記分
    score[answers[idx]]++;
    idx++;
    // 更新進度
    updateProgress();
    // 移除現有卡片並渲染下一個
    quizContainer.innerHTML = '';
    if (idx < questions.length) {
      renderCard();
    } else {
      showResult();
    }
  };

  card.appendChild(opts);
  card.appendChild(nextBtn);

  quizContainer.appendChild(card);
}

function updateProgress() {
  const percent = Math.round((idx / questions.length) * 100);
  progressBar.style.width = percent + '%';
}

renderCard();
updateProgress();

function showResult() {
  // 隱藏題目
  quizContainer.classList.add('hidden');
  // 重新測驗按鈕
const restartBtn = document.createElement('button');
restartBtn.textContent = '重新測驗';
restartBtn.onclick = () => window.location.reload();
document.getElementById('result').appendChild(restartBtn);

// 顯示結果區塊
  const result = document.getElementById('result');
  result.classList.remove('hidden');

  // 計算最大分，可能有多個
  const maxScore = Math.max(...Object.values(score));
  const topTypes = Object.keys(score).filter(t => score[t] === maxScore && maxScore>0);

  // 準備雷達圖 datasets
  const labels = ['馬','男孩','狐狸','鼴鼠'];
  const baseData = labels.map(l => score[l]);

  const datasets = [];
  // 基本分佈（灰色背景）
  datasets.push({
    label: '分佈',
    data: baseData,
    backgroundColor: 'rgba(200,200,200,0.25)',
    borderColor: 'rgba(160,160,160,0.9)',
    borderWidth: 1
  });

  // 若有主要類型（1 或 多），為每個主要類型加入高亮 dataset
  const palette = ['rgba(54,162,235,0.25)','rgba(255,159,64,0.25)','rgba(153,102,255,0.25)','rgba(75,192,192,0.25)'];
  const stroke = ['rgba(54,162,235,1)','rgba(255,159,64,1)','rgba(153,102,255,1)','rgba(75,192,192,1)'];

  topTypes.forEach((t,i)=>{
    datasets.push({
      label: t + '（主要）',
      data: baseData,
      backgroundColor: palette[i % palette.length],
      borderColor: stroke[i % stroke.length],
      borderWidth: 2
    });
  });

  // render chart
  const ctx = document.getElementById('radarChart').getContext('2d');
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: { labels, datasets },
    options: { scales: { r: { beginAtZero: true, max: questions.length } } }
  });

  // 設定下載按鈕
  document.getElementById('downloadChart').onclick = () => {
    const link = document.createElement('a');
    link.href = radarChart.toBase64Image();
    link.download = '心理測驗_雷達圖.png';
    link.click();
  };

  // 顯示解析文字（若多個，逐一顯示）
  const explanation = document.getElementById('explanation');
  explanation.innerHTML = '';
  if (topTypes.length === 0) {
    explanation.innerText = '未偵測到主要類型。';
    return;
  }

  topTypes.forEach(t => {
    const block = document.createElement('div');
    block.className = 'card';
    const h = document.createElement('h3');
    h.innerText = t + '型解析';
    const p = document.createElement('p');
    p.innerText = analyses[t];
    block.appendChild(h);
    block.appendChild(p);
    explanation.appendChild(block);
  });
}

