const state = {

  commodities: [
    "🌽 Milho PR +1.8%",
    "🌱 Soja MT +0.9%",
    "🐂 Boi Gordo +2.4%",
    "☕ Café Arábica -0.4%",
    "🌾 Trigo +1.1%"
  ],

  news: [
    {
      id:1,
      title:"IA agrícola reduz perdas climáticas em 32%",
      category:"tecnologia",
      author:"AgroSphere Research",
      likes:18,
      content:"Sensores e modelos climáticos aumentam previsibilidade."
    },

    {
      id:2,
      title:"Exportações brasileiras batem recorde",
      category:"mercado",
      author:"Mercado Rural",
      likes:25,
      content:"Novo corredor logístico impulsiona embarques."
    },

    {
      id:3,
      title:"Chuvas elevam produtividade no Centro-Oeste",
      category:"clima",
      author:"Climate Agro",
      likes:12,
      content:"Solo apresenta recuperação hídrica relevante."
    }
  ],

  machines:[
    {
      name:"Trator AX-900",
      power:"420cv",
      tech:"Piloto autônomo"
    },

    {
      name:"Colheitadeira Titan X",
      power:"610cv",
      tech:"IA embarcada"
    }
  ]
};

const tickerTrack = document.getElementById("tickerTrack");

tickerTrack.innerHTML = state.commodities.join(" • ");

function animateCounter(id,target,suffix=""){
  const el = document.getElementById(id);

  let current = 0;

  const increment = target / 100;

  const timer = setInterval(()=>{

    current += increment;

    if(current >= target){
      current = target;
      clearInterval(timer);
    }

    el.innerText = Math.floor(current) + suffix;

  },20);
}

animateCounter("statExports",340,"B");
animateCounter("statArea",198,"M");
animateCounter("statGDP",24,"%");

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }

  });

});

reveals.forEach(el=>observer.observe(el));

const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach(btn=>{

  btn.addEventListener("click",()=>{

    document.querySelectorAll(".tab-btn")
      .forEach(b=>b.classList.remove("active"));

    document.querySelectorAll(".tab-content")
      .forEach(c=>c.classList.remove("active"));

    btn.classList.add("active");

    document
      .getElementById(btn.dataset.tab)
      .classList.add("active");

  });

});

const newsGrid = document.getElementById("newsGrid");

function renderNews(filter="all",search=""){

  newsGrid.innerHTML = "";

  const filtered = state.news.filter(news=>{

    const categoryMatch =
      filter === "all" ||
      news.category === filter;

    const searchMatch =
      news.title.toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;

  });

  filtered.forEach(news=>{

    const card = document.createElement("article");

    card.className = "news-card";

    card.innerHTML = `
      <h3>${news.title}</h3>

      <div class="news-meta">
        ${news.author}
      </div>

      <p>${news.content}</p>

      <div class="news-actions">
        <button onclick="likeNews(${news.id})">
          ❤️ ${news.likes}
        </button>
      </div>
    `;

    newsGrid.appendChild(card);

  });

}

renderNews();

function likeNews(id){

  const item = state.news.find(n=>n.id===id);

  item.likes++;

  renderNews();

}

document.querySelectorAll(".filter-btn")
.forEach(btn=>{

  btn.addEventListener("click",()=>{

    document.querySelectorAll(".filter-btn")
      .forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");

    renderNews(btn.dataset.category);

  });

});

document
.getElementById("searchInput")
.addEventListener("input",e=>{

  renderNews("all",e.target.value);

});

const machineGrid = document.getElementById("machineGrid");

state.machines.forEach(machine=>{

  const card = document.createElement("div");

  card.className = "machine-card";

  card.innerHTML = `
    <h3>${machine.name}</h3>
    <p>Potência: ${machine.power}</p>
    <p>${machine.tech}</p>
  `;

  machineGrid.appendChild(card);

});

const form = document.getElementById("contactForm");

form.addEventListener("submit",(e)=>{

  e.preventDefault();

  const lead = {
    name:name.value,
    email:email.value,
    phone:phone.value,
    message:message.value
  };

  localStorage.setItem(
    "agroLead",
    JSON.stringify(lead)
  );

  showToast("Lead enviado com sucesso.");

  form.reset();

});

function showToast(message){

  const toast = document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(()=>{

    toast.classList.remove("show");

  },3000);

}

const commodityCanvas =
document.getElementById("commodityChart");

const ctx =
commodityCanvas.getContext("2d");

commodityCanvas.width = 600;
commodityCanvas.height = 300;

function drawCommodityChart(){

  ctx.clearRect(0,0,600,300);

  ctx.beginPath();

  ctx.moveTo(0,200);

  const points = [200,180,160,190,120,150];

  points.forEach((point,index)=>{

    ctx.lineTo(index * 100,point);

  });

  ctx.strokeStyle = "#DAA520";

  ctx.lineWidth = 4;

  ctx.stroke();

}

drawCommodityChart();

const climateCanvas =
document.getElementById("climateChart");

const climateCtx =
climateCanvas.getContext("2d");

climateCanvas.width = 600;
climateCanvas.height = 300;

function drawClimateChart(){

  climateCtx.clearRect(0,0,600,300);

  const bars = [120,180,160,210,130];

  bars.forEach((bar,index)=>{

    climateCtx.fillStyle = "#4CAF50";

    climateCtx.fillRect(
      index * 110 + 30,
      300 - bar,
      60,
      bar
    );

  });

}

drawClimateChart();

const particlesCanvas =
document.getElementById("particles-canvas");

const pctx =
particlesCanvas.getContext("2d");

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particles = [];

for(let i=0;i<80;i++){

  particles.push({

    x:Math.random()*window.innerWidth,
    y:Math.random()*window.innerHeight,
    size:Math.random()*4 + 1,
    speed:Math.random()*1 + .2

  });

}

function animateParticles(){

  pctx.clearRect(
    0,
    0,
    particlesCanvas.width,
    particlesCanvas.height
  );

  particles.forEach(p=>{

    p.y += p.speed;

    if(p.y > window.innerHeight){
      p.y = 0;
    }

    pctx.beginPath();

    pctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI*2
    );

    pctx.fillStyle = "rgba(218,165,32,.5)";

    pctx.fill();

  });

  requestAnimationFrame(
    animateParticles
  );

}

animateParticles();

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click",()=>{

  document.body.classList.toggle("light");

});