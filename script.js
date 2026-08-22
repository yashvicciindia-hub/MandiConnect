const vegList = [
  "Tomato","Onion","Potato","Cabbage","Cauliflower","Brinjal","Carrot","Capsicum",
  "Spinach","Cucumber","Green Chilli","Ginger","Garlic","Lady Finger","Pumpkin",
  "Beetroot","Radish","Green Peas","French Beans","Bottle Gourd","Bitter Gourd",
  "Ridge Gourd","Sweet Potato","Drumstick","Coriander","Mint","Fenugreek Leaves",
  "Spring Onion","Broccoli","Lettuce","Turnip","Mushroom","Sweet Corn","Pea Pods",
  "Snake Gourd","Ash Gourd","Colocasia","Yam","Raw Banana","Raw Papaya",
  "Curry Leaves","Celery","Beans Sprouts","Zucchini","Baby Corn","Red Cabbage",
  "Tinda","Parwal","Kakdi","Amaranth Leaves","Methi"
];

function imgFor(name){
  const q = encodeURIComponent(name.toLowerCase().replace(/\s+/g,'-'));
  return `https://loremflickr.com/400/300/${q},vegetable`;
}
const vegImg = {};
vegList.forEach(v=>{ vegImg[v] = imgFor(v); });

const cities = [
  {name:"Ganaur Mandi", city:"Sonipat, Haryana", traders:"Asia's biggest vegetable mandi", upcoming:true},
  {name:"Azadpur Mandi", city:"Delhi", traders:"450+ traders"},
  {name:"Koyambedu Market", city:"Chennai", traders:"300+ traders"},
  {name:"Vashi APMC", city:"Navi Mumbai", traders:"500+ traders"},
  {name:"Gultekdi Market Yard", city:"Pune", traders:"220+ traders"},
  {name:"Yeshwanthpur APMC", city:"Bengaluru", traders:"280+ traders"},
  {name:"Gaddiannaram Market", city:"Hyderabad", traders:"190+ traders"},
  {name:"Lasalgaon Mandi", city:"Nashik", traders:"260+ traders"},
  {name:"Sabzi Mandi Jaipur", city:"Jaipur", traders:"175+ traders"}
];

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

const mandis = cities.map(c=>({
  ...c,
  tags: shuffle(vegList).slice(0,5)
}));

const liveCities = cities.filter(c=>!c.upcoming);

const trends = ["up","down"];
const prices = vegList.map((v,i)=>{
  const base = 6 + (i*3)%55;
  return {
    veg: v,
    mandi: liveCities[i % liveCities.length].name + ", " + liveCities[i % liveCities.length].city,
    min: base,
    max: base + 8 + (i%10),
    trend: trends[i%2]
  };
});

const buyerNames = ["Mehta Traders, Mumbai","FreshServe Foods, Pune","Sharma Spice Co., Delhi","GreenLeaf Exports, Chennai","Patel Wholesale, Ahmedabad","Royal Veggies, Bengaluru"];
const farmerNames = ["Suresh Patil, Nashik","Geeta Devi, Sonipat","Ramlal Yadav, Pune","Anil Kumar, Nagpur","Lakshmi Reddy, Hyderabad","Joginder Singh, Ludhiana"];
const buyerLocations = ["Dadar, Mumbai","Kothrud, Pune","Karol Bagh, Delhi","T Nagar, Chennai","Navrangpura, Ahmedabad","Indiranagar, Bengaluru"];
const farmerLocations = ["Lasalgaon, Nashik","Ganaur, Sonipat","Hadapsar, Pune","Hingna, Nagpur","Shamshabad, Hyderabad","Khanna, Ludhiana"];

const connectImages = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Vegetable_vendor_in_Pune_India.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Onion_Vendor_taking_a_Mid-day_break.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Vegetable_vendor_in_Madurai.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Sabzi_Mandi_in_India.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Fruit_Vendor_in_Colva_Goa_-_panoramio.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Cycle-vegetable-vendor-Sathyamagnalam.jpg?width=500"
];
const connects = [];
for(let i=0;i<8;i++){
  const veg = vegList[(i * 7 + 3) % vegList.length];
  const type = i%2===0 ? "farmer" : "buyer";
  connects.push({
    id: `connect-${i}`,
    type,
    veg,
    img: connectImages[i % connectImages.length],
    title: type==="farmer" ? `${20+i*5} quintals ${veg} available` : `Looking for ${veg} supplier`,
    desc: type==="farmer" ? "Fresh harvest, ready for pickup. Good quality assured." : "Need steady weekly supply, fair price offered.",
    who: type==="farmer" ? farmerNames[i%farmerNames.length] : buyerNames[i%buyerNames.length],
    location: type==="farmer" ? farmerLocations[i%farmerLocations.length] : buyerLocations[i%buyerLocations.length]
  });
}

function renderMandis(filterCity="", filterVeg=""){
  const grid = document.getElementById('mandiGrid');
  grid.innerHTML = "";
  const filtered = mandis.filter(m=>{
    if(m.upcoming) return false;
    const cityMatch = (m.name+m.city).toLowerCase().includes(filterCity.toLowerCase());
    return cityMatch;
  });
  if(filtered.length===0){
    grid.innerHTML = "<p style='text-align:center; color:#888;'>No mandis match that search. Try a different city.</p>";
    return;
  }
  filtered.forEach(m=>{
    const tags = m.tags.map(t=>`<span class="tag">${t}</span>`).join("");
    const thumbs = m.tags.slice(0,3).map(t=>`<img src="${vegImg[t]}" alt="${t}" class="mini-thumb" loading="lazy">`).join("");
    grid.innerHTML += `
      <div class="mandi-card">
        <div class="thumb-strip">${thumbs}</div>
        <div class="body">
          <h3>${m.name}</h3>
          <div class="loc"><i data-lucide="map-pin" aria-hidden="true"></i>${m.city}</div>
          <div>${tags}</div>
          <div class="meta">
            <b>${m.traders}</b>
            <button class="btn-small" onclick="openMandiModal('${m.name}')">View</button>
          </div>
        </div>
      </div>`;
  });
}

function renderComingSoon(){
  const grid = document.getElementById('comingSoonGrid');
  const upcoming = mandis.filter(m=>m.upcoming);
  if(upcoming.length===0){
    grid.innerHTML = "";
    return;
  }
  grid.innerHTML = upcoming.map(m=>`
    <div class="coming-card">
      <span class="cs-badge"><i data-lucide="construction" aria-hidden="true"></i> Launching Soon</span>
      <h3>${m.name}</h3>
      <div class="loc"><i data-lucide="map-pin" aria-hidden="true"></i>${m.city}</div>
      <p class="desc">${m.traders}</p>
      <button onclick="showToast('${m.name} is launching soon (demo)')">Notify Me</button>
    </div>`).join("");
}

function renderPrices(filterVeg=""){
  const body = document.getElementById('priceBody');
  const list = filterVeg ? prices.filter(p=>p.veg===filterVeg) : prices;
  body.innerHTML = list.map(p=>`
    <tr>
      <td><div class="price-veg"><img src="${vegImg[p.veg]}" alt="${p.veg}" class="mini-thumb-round" loading="lazy">${p.veg}</div></td>
      <td>${p.mandi}</td>
      <td>₹${p.min}/kg</td>
      <td>₹${p.max}/kg</td>
      <td class="${p.trend==='up'?'trend-up':'trend-down'}"><i data-lucide="${p.trend==='up'?'trending-up':'trending-down'}" aria-hidden="true"></i>${p.trend==='up'?'Rising':'Falling'}</td>
    </tr>`).join("");
}

function renderConnects(){
  const grid = document.getElementById('connectGrid');
  const sentRequests = getSentConnectionRequests();
  grid.innerHTML = connects.map(c=>{
    const requestSent = sentRequests.includes(c.id);
    return `
    <div class="connect-card ${c.type}">
      <img src="${c.img || vegImg[c.veg]}" alt="${c.veg}" class="connect-thumb" loading="lazy">
      <span class="badge ${c.type}">${c.type==='farmer'?'Selling':'Buying'}</span>
      <h3 style="margin-top:8px;">${c.title}</h3>
      <p>${c.desc}</p>
      <div style="font-size:12px; color:#999;">By ${c.who}</div>
      <div class="connect-location"><i data-lucide="map-pin" aria-hidden="true"></i>${c.location}</div>
      <button class="btn-small connect-button${requestSent ? ' request-sent' : ''}" style="margin-top:10px;" onclick="openConnectModal('${c.id}')"${requestSent ? ' disabled' : ''}>${requestSent ? '<i data-lucide="check" aria-hidden="true"></i> Request Sent' : 'Connect'}</button>
    </div>`;
  }).join("");
}

function populateVegDropdown(){
  const sel = document.getElementById('searchVeg');
  sel.innerHTML = '<option value="">All produce</option>' + vegList.map(v=>`<option>${v}</option>`).join("");
}

function searchMandi(){
  const city = document.getElementById('searchCity').value.trim();
  const veg = document.getElementById('searchVeg').value;

  renderMandis(city, veg);
  renderPrices(veg);

  const panel = document.getElementById('searchResultsPanel');
  const title = document.getElementById('searchResultsTitle');
  const body = document.getElementById('searchResultsBody');

  let results = prices.filter(p=>{
    const cityMatch = city ? p.mandi.toLowerCase().includes(city.toLowerCase()) : true;
    const vegMatch = veg ? p.veg === veg : true;
    return cityMatch && vegMatch;
  });

  if(city || veg){
    panel.style.display = "block";
    title.textContent = `Results for ${veg || "all produce"}${city ? " in " + city : ""}`;
    if(results.length === 0){
      body.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding:20px;">
        No price data found for that search. Try a different city or produce.</td></tr>`;
    } else {
      body.innerHTML = results.map(p=>`
        <tr>
          <td><div class="price-veg"><img src="${vegImg[p.veg]}" alt="${p.veg}" class="mini-thumb-round" loading="lazy">${p.veg}</div></td>
          <td>${p.mandi}</td>
          <td>₹${p.min}/kg</td>
          <td>₹${p.max}/kg</td>
          <td class="${p.trend==='up'?'trend-up':'trend-down'}"><i data-lucide="${p.trend==='up'?'trending-up':'trending-down'}" aria-hidden="true"></i>${p.trend==='up'?'Rising':'Falling'}</td>
        </tr>`).join("");
    }
  } else {
    panel.style.display = "none";
  }

  showPage('mandis');
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

function getSentConnectionRequests(){
  try {
    return JSON.parse(localStorage.getItem('mandiConnectRequests') || '[]');
  } catch(error) {
    return [];
  }
}

function openConnectModal(connectId){
  const listing = connects.find(item=>item.id === connectId);
  const modal = document.getElementById('connectModal');
  if(!listing || !modal || getSentConnectionRequests().includes(connectId)) return;

  const personName = listing.who.split(',')[0];
  const isFarmer = listing.type === 'farmer';
  document.getElementById('connectModalTitle').textContent = `Connect with ${personName}`;
  document.getElementById('connectModalLocation').innerHTML = `<i data-lucide="map-pin" aria-hidden="true"></i>${listing.location}`;
  document.getElementById('connectModalType').textContent = isFarmer ? 'Selling' : 'Buying';
  document.getElementById('connectModalListing').textContent = listing.title;
  document.getElementById('connectMessage').value = isFarmer
    ? `Hi ${personName}, I'm interested in discussing the ${listing.veg.toLowerCase()} available. Please let me know the availability and pricing.`
    : `Hi ${personName}, I'm interested in discussing your requirement for ${listing.veg.toLowerCase()}. Please let me know the quantity and preferred pricing.`;
  document.getElementById('connectRequestView').hidden = false;
  document.getElementById('connectSuccessView').hidden = true;
  modal.dataset.connectId = connectId;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
  refreshIcons();
}

function sendConnectionRequest(){
  const modal = document.getElementById('connectModal');
  const connectId = modal.dataset.connectId;
  const listing = connects.find(item=>item.id === connectId);
  if(!listing) return;

  const sentRequests = getSentConnectionRequests();
  if(!sentRequests.includes(connectId)){
    sentRequests.push(connectId);
    localStorage.setItem('mandiConnectRequests', JSON.stringify(sentRequests));
  }
  const personName = listing.who.split(',')[0];
  document.getElementById('connectRequestView').hidden = true;
  document.getElementById('connectSuccessView').hidden = false;
  document.getElementById('connectSuccessMessage').innerHTML = `Your connection request has been sent to <strong>${personName}</strong>.<br><br>You can continue browsing listings while you wait for a response.`;
  renderConnects();
  refreshIcons();
  modal.querySelector('.connect-success button').focus();
}

function closeConnectModal(){
  const modal = document.getElementById('connectModal');
  if(!modal || modal.hidden) return;
  modal.hidden = true;
  modal.removeAttribute('data-connect-id');
  document.body.classList.remove('modal-open');
}

document.getElementById('connectModal').addEventListener('click', event=>{
  if(event.target.id === 'connectModal') closeConnectModal();
});
document.addEventListener('keydown', event=>{
  if(event.key === 'Escape') closeConnectModal();
});

function openMandiModal(mandiName){
  const mandi = mandis.find(item=>item.name === mandiName);
  const modal = document.getElementById('mandiModal');
  if(!mandi || !modal) return;

  document.getElementById('mandiModalTitle').textContent = mandi.name;
  document.getElementById('mandiModalLocation').innerHTML = `<i data-lucide="map-pin" aria-hidden="true"></i>${mandi.city}`;
  document.getElementById('mandiModalDescription').textContent = `Explore the current directory listing for ${mandi.name}, including its location, activity, and commonly traded produce.`;
  document.getElementById('mandiModalDetails').innerHTML = `
    <div class="modal-detail"><span class="modal-detail-icon"><i data-lucide="users" aria-hidden="true"></i></span><div><span>Directory activity</span><strong>${mandi.traders}</strong></div></div>
    <div class="modal-detail"><span class="modal-detail-icon"><i data-lucide="badge-check" aria-hidden="true"></i></span><div><span>Listing status</span><strong>Active mandi listing</strong></div></div>`;
  document.getElementById('mandiModalTags').innerHTML = mandi.tags.map(tag=>`<span class="tag">${tag}</span>`).join('');
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
  refreshIcons();
}

function closeMandiModal(){
  const modal = document.getElementById('mandiModal');
  if(!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function registerFromMandiModal(){
  closeMandiModal();
  showPage('contact');
}

document.getElementById('mandiModal').addEventListener('click', event=>{
  if(event.target.id === 'mandiModal') closeMandiModal();
});
document.addEventListener('keydown', event=>{
  if(event.key === 'Escape') closeMandiModal();
});

function populateHeroArt(){
  const img1 = document.getElementById('heroImg1');
  const img2 = document.getElementById('heroImg2');
  img1.src = "https://commons.wikimedia.org/wiki/Special:FilePath/Vegetable_vendor_in_Pune_India.jpg?width=600";
  img1.onerror = ()=>{ img1.closest('.frame').style.background = "#D9CFC1"; };
  img2.src = "https://commons.wikimedia.org/wiki/Special:FilePath/Onion_Vendor_taking_a_Mid-day_break.jpg?width=500";
  img2.onerror = ()=>{ img2.closest('.frame').style.background = "#D9CFC1"; };

  const heroStatEl = document.getElementById('heroStatVal');
  if(heroStatEl){
    const tomatoPrice = prices.find(p=>p.veg==="Tomato");
    if(tomatoPrice){
      heroStatEl.textContent = `₹${tomatoPrice.min} to ${tomatoPrice.max}/kg`;
    }
  }
}

function animateCount(el){
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString('en-IN') + suffix;
    if(progress < 1){
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString('en-IN') + suffix;
    }
  }
  requestAnimationFrame(tick);
}

function initStatsCountUp(){
  const statsEl = document.getElementById('statsStrip');
  if(!statsEl) return;
  let played = false;
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !played){
        played = true;
        document.querySelectorAll('.count-num').forEach(animateCount);
        observer.disconnect();
      }
    });
  }, {threshold:0.4});
  observer.observe(statsEl);
}

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById('page-'+id);
  if(target) target.classList.add('active');
  document.querySelectorAll('nav a[data-page]').forEach(a=>a.classList.remove('active'));
  const navLink = document.querySelector(`nav a[data-page="${id}"]`);
  if(navLink) navLink.classList.add('active');
  closeMenu();
  window.scrollTo({top:0, behavior:'smooth'});
}

function toggleMenu(){
  const nav = document.getElementById('siteNav');
  const toggle = document.querySelector('.menu-toggle');
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  toggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}" aria-hidden="true"></i>`;
  refreshIcons();
}

function closeMenu(){
  const nav = document.getElementById('siteNav');
  const toggle = document.querySelector('.menu-toggle');
  if(!nav || !toggle) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
  refreshIcons();
}

function refreshIcons(){
  if(window.lucide) lucide.createIcons({attrs:{'stroke-width':1.8}});
}

populateVegDropdown();
populateHeroArt();
initStatsCountUp();
renderMandis();
renderComingSoon();
renderPrices();
renderConnects();
showPage('home');
refreshIcons();