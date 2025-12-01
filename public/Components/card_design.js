const container = document.querySelector('.card-container');
function toggle(card) {
 card.classList.toggle('ACTIVE');
 const btn = card.querySelector('.detail');
 btn.textContent = card.classList.contains('ACTIVE') ? 'Less Details' : 'More Details';
}
container.addEventListener('click', e => {
 const card = e.target.closest('.card');
 if (!card) return;
 const btn = e.target.closest('.detail');
 const isbtn = Boolean(btn && card.contains(btn));
 const body = e.target.matches('.card-body') && e.target === card.querySelector('.card-body');
 const header_img = e.target.matches('.card-header img');
 if (body || header_img || isbtn) toggle(card); return
})
function createCard(data) {
 const template = `
        <div data-aos="fade-up" class="card">
 <div class="card-header">
  <img src="${data.image}" alt="img">
  <div class="top-tag">
   <p>${data.mainTag}</p>
   <div><i class='bx ${data.weatherIcon}'></i></div>
  </div>
 </div>
 <div class="card-body">
  <h1 class="card-title">${data.title}</h1>
  <div>
   <h2 class="card-location">${data.location}</h2>
   <h3 class="card-best-time">Best time to travel:&nbsp;<span>${data.bestTime}</span></h3>
  </div>
  <p class="card-intro">${data.intro}</p>
  <div class="card-detail">
   <h2>ABOUT</h2>
   <p>${data.about}</p>
   <h2>HIGHLIGHTS</h2>
   <p>${data.highlights.join("<br>")}</p>
  </div>
  <div class="card-tag">
   ${data.tags.map(tag => `<span>${tag}</span>`).join("")}
  </div>
  <div class="card-button">
   <a href="${data.locationLink}" target="_blank"><button class="view-map">View On Map</button></a>
   <button class="detail">More Details</button>
  </div>
  <div class="card-info">
   <div class="card-review">
    <span>${data.review}</span>
    ${"<i class='bx bxs-star'></i>".repeat(Math.floor(data.review))}
    <i class='bx bxs-star-half'></i>
    <span>(${data.reviewCount})</span>
   </div>
   <div class="card-extra">
    <p>Exploration Time ≈ <span>${data.exploreTime}</span></p>
    <p>Expenses Cost ≈ <span>${data.cost}</span></p>
   </div>
  </div>
 </div>
</div>
    `
 const wrapper = document.createElement("div");
 wrapper.innerHTML = template.trim();
 return wrapper.firstChild;
}
const groups = {};
cardsData.forEach(data => {
 if (!groups[data.mainTag]) {
  groups[data.mainTag] = [];
 }
 groups[data.mainTag].push(data);
});
Object.keys(groups).forEach(mainTag => {
 const section = document.createElement("div");
 section.className = "category-section";
 const title = document.createElement("h1");
 title.className = "category-title";
 title.id = `${mainTag}`;
 title.innerText = mainTag;
 section.appendChild(title);
 const cardGroup = document.createElement("div");
 cardGroup.className = "category-group";
 groups[mainTag].forEach(data => {
  const card = createCard(data);
  cardGroup.appendChild(card);
 });
 section.appendChild(cardGroup);
 container.appendChild(section);
});















document.querySelectorAll('.GO-TARGET').forEach(btn => {
 btn.addEventListener('click', () => {
  const target = document.getElementById(btn.dataset.target);
  target.scrollIntoView({ behavior: 'smooth' });
 })
})