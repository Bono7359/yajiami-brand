const products = [
  {name:'柔敏香氛潔膚露',category:'cleanse',label:'CLEANSING',image:'cleanser.jpg',description:'為每日清潔而設的潔膚露，讓洗淨肌膚的時光多一分舒適。'},
  {name:'草本柔敏卸妝乳',category:'cleanse',label:'CLEANSING',image:'makeup-remover.jpg',description:'卸除日常彩妝與髒污，為後續保養準備清爽的肌膚。'},
  {name:'玫瑰神奇卸洗凝膠',category:'cleanse',label:'CLEANSING',image:'rose-gel.jpg',description:'凝膠質地的清潔選擇，讓日常卸洗更輕鬆。'},
  {name:'玫瑰去角質潔膚凝膠',category:'cleanse',label:'CLEANSING',image:'exfoliating-gel.jpg',description:'為肌膚清潔步驟增添細緻的整理時刻。'},
  {name:'抗敏修護保溼乳',category:'hydrate',label:'HYDRATION',image:'moisturizer.jpg',description:'日常保濕乳液，陪伴肌膚維持舒適的滋潤感。'},
  {name:'海洋舒緩水晶凍膜',category:'hydrate',label:'HYDRATION',image:'sea-mask.jpg',description:'清透凍膜質地，為保養時光帶來柔潤感受。'},
  {name:'海洋亮采嫩透水晶霜',category:'hydrate',label:'HYDRATION',image:'sea-cream.jpg',description:'水晶霜質地，為肌膚補上日常需要的潤澤。'},
  {name:'玫瑰煥顏修護精露',category:'care',label:'SPECIAL CARE',image:'rose-essence.jpg',description:'玫瑰系列精露，讓細緻保養成為生活的一部分。'},
  {name:'紫根抗老修護精粹',category:'care',label:'SPECIAL CARE',image:'purple-root.jpg',description:'紫根系列精粹，為每日保養增添專屬的呵護步驟。'},
  {name:'黃金蠶絲抗皺煥顏霜',category:'care',label:'SPECIAL CARE',image:'gold-cream.jpg',description:'豐潤霜感，為夜間的細心保養留下溫柔片刻。'},
  {name:'面皰粉刺調理精華',category:'care',label:'SPECIAL CARE',image:'blemish-essence.jpg',description:'局部保養精華，照顧肌膚不同時刻的需求。'},
  {name:'白雪煥膚蜜',category:'care',label:'SPECIAL CARE',image:'snow-honey.jpg',description:'雅佳蜜保養系列的一份細緻選擇。'},
  {name:'魔法抗顏修護霜膜',category:'care',label:'SPECIAL CARE',image:'repair-mask.jpg',description:'霜膜質地，在日常保養中留一段專注自己的時間。'},
  {name:'藍銅玫瑰逆齡再生精華',category:'care',label:'SPECIAL CARE',image:'blue-copper.jpg',description:'玫瑰系列精華，為肌膚保養增添滋潤層次。'},
  {name:'亮采晶透防曬隔離霜',category:'protect',label:'DAYTIME CARE',image:'sunscreen.jpg',description:'白天保養的最後一步，為出門前增添一份細緻照顧。'}
];

const grid = document.querySelector('#product-grid');
const dialog = document.querySelector('#product-dialog');
const closeButton = document.querySelector('.dialog-close');
let lastTrigger;

function renderProducts(filter = 'all') {
  grid.replaceChildren();
  products.filter(product => filter === 'all' || product.category === filter).forEach(product => {
    const card = document.createElement('button');
    card.className = 'product-card';
    card.type = 'button';
    card.setAttribute('aria-label', `查看${product.name}介紹`);
    card.innerHTML = `<div class="product-image"><img src="assets/${product.image}" alt="${product.name}" loading="lazy"></div><div class="product-info"><div><small>${product.label}</small><strong>${product.name}</strong></div><span class="arrow" aria-hidden="true">↗</span></div>`;
    card.addEventListener('click', () => {
      lastTrigger = card;
      document.querySelector('#dialog-image').src = `assets/${product.image}`;
      document.querySelector('#dialog-image').alt = product.name;
      document.querySelector('#dialog-category').textContent = product.label;
      document.querySelector('#dialog-title').textContent = product.name;
      document.querySelector('#dialog-description').textContent = product.description;
      dialog.showModal();
    });
    grid.append(card);
  });
}

renderProducts();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
  renderProducts(button.dataset.filter);
}));
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '開啟選單' : '關閉選單');
  mobileMenu.hidden = isOpen;
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '開啟選單');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
