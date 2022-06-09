import { renderSingleNews } from './news.js';
//Seleccion Carousel
const carouselItem_1 = document.querySelector('#carousel-item-1');
const carouselItem_2 = document.querySelector('#carousel-item-2');
const carouselItem_3 = document.querySelector('#carousel-item-3');
const carouselCaption_1 = document.querySelector('#carousel-caption-1');
const carouselCaption_2 = document.querySelector('#carousel-caption-2');
const carouselCaption_3 = document.querySelector('#carousel-caption-3');
//Selección Noticia Principal
const noticiaPrincipal = document.querySelector('#noticiaPrincipal');
const etiquetaPrincipal = document.querySelector('#etiquetaPrincipal');
const seguir_leyendo = document.querySelector('#seguir-leyendo');
//Selección Noticias Populares
const pop_container = document.querySelector('#pop-container');
//Seleccion Ultimas Noticias
const ultimas_container = document.querySelector('#ultimas-container');
//Selección No te pierdas
const side_news_container = document.querySelector('#side-news-container');
//Selección News grid
const news_grid = document.querySelector('#news-grid');
//Selección Volver
const volverBtn = document.querySelector('#volver');
//Seleccion main
const main = document.querySelector('#main-container');
const pag_container = document.querySelector('#pag-container');
const volv_container = document.querySelector('#volv-container');
//Seleccion User
const user_name = document.querySelector('#user');
const nav_bar = document.querySelector('#navbarsExample04');
const log_btn = document.querySelector('#logBtn');

//Elementos de la API

let apiKey = 'dc42d3e395de4b70 96ae3ed808bf75bc';

let urlTop = 'https://newsapi.org/v2/top-headlines?country=ar';

fetch(
  'http://api.mediastack.com/v1/news?access_key=725f80f2546c343ee79b4bc6c1bef27b'
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// Fetch News

const getCategoryNews = async (categoria, cantidad, pagina) => {
  const response = await fetch(
    `${urlTop}&category=${categoria}&pageSize=${cantidad}&page=${pagina}&apiKey=${apiKey}`
  );
  const data = await response.json();
  const news = data.articles;
  return news;
};

const getEveryNews = async (termino, pagina) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${termino}&language=es&sortBy=popularity&pageSize=6&page=${pagina}&apiKey=${apiKey}`
  );
  const data = await response.json();
  const news = data;
  return news;
};

//User

document.addEventListener('DOMContentLoaded', () => {
  const userInfo = JSON.parse(localStorage.getItem('Userinfo'));

  if (userInfo) {
    user_name.innerHTML =
      `<i class="fa-solid fa-user"></i>` + ` ${userInfo.usuario}`;
    log_btn.classList = 'btn btn-danger';
    log_btn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>`;
    log_btn.onclick = () => {
      localStorage.removeItem('Userinfo');
      log_btn.className = 'btn btn-success';
      log_btn.onclick = () => {
        location.href = './sing_in.html';
      };
      location.reload();
    };
    nav_bar.appendChild(logOutBtn);
  }
  return;
});

//Carousel

const showCarousel = async (carouselItem, carouselCaption, pagina) => {
  let newsArray = await getCategoryNews('general', 1, pagina);
  let news = newsArray[0];
  const newsInfo = {
    img: news.urlToImage,
    titulo: news.title,
    fecha: news.publishedAt.split('T')[0],
    descripcion: news.description,
    url: news.url,
    source: news.source.name,
  };

  const img = document.createElement('img');
  if (newsInfo.img == null) {
    img.src = './img/newsPlaceholder.jpg';
  } else {
    img.src = newsInfo.img;
  }
  img.classList = 'd-block w-100 h-auto';
  carouselItem.appendChild(img);

  const h1 = document.createElement('h1');
  h1.innerHTML = newsInfo.titulo;
  carouselCaption.appendChild(h1);

  const p = document.createElement('p');
  p.innerHTML = `<a class="btn btn-sm btn-danger" href="${newsInfo.url}" target="_blank">Leer mas</a>`;
  carouselCaption.appendChild(p);
};

//Categorias

let category_1 = ['business', 'entertainment', 'science', 'technology'];
let category_2 = ['health', 'sports'];

let x = Math.floor(Math.random() * 4);
let y = Math.floor(Math.random() * 4);
let z = Math.floor(Math.random() * 2);

//Noticia Principal

const showNewsPrincipal = async () => {
  let newsArray = await getCategoryNews(category_1[x], 1, 1);
  let news = newsArray[0];

  const newsInfo = {
    img: news.urlToImage,
    titulo: news.title,
    fecha: news.publishedAt.split('T')[0],
    descripcion: news.description,
    url: news.url,
    source: news.source.name,
  };

  const link = document.createElement('a');
  link.innerHTML = category_1[x];
  link.href = '#';
  etiquetaPrincipal.appendChild(link);

  const h2 = document.createElement('h2');
  h2.innerHTML = newsInfo.titulo;
  h2.classList = 'font-pt';
  noticiaPrincipal.appendChild(h2);

  const p = document.createElement('p');
  p.innerHTML = newsInfo.fecha;
  p.classList = 'gazette-post-date';
  noticiaPrincipal.appendChild(p);

  const imgDiv = document.createElement('div');
  imgDiv.classList = 'blog-post-thumbnail my-5';
  noticiaPrincipal.appendChild(imgDiv);

  const img = document.createElement('img');
  if (newsInfo.img == null) {
    img.src = './img/newsPlaceholder.jpg';
  } else {
    img.src = newsInfo.img;
  }
  imgDiv.appendChild(img);

  const p2 = document.createElement('p');
  p2.innerHTML = newsInfo.descripcion;
  noticiaPrincipal.appendChild(p2);

  seguir_leyendo.href = newsInfo.url;
};

//Noticias Populares

const showPopNews = async () => {
  let news = await getCategoryNews(category_1[y], 2, 2);

  news.forEach((article) => {
    const newsInfo = {
      img: article.urlToImage,
      titulo: article.title,
      fecha: article.publishedAt.split('T')[0],
      descripcion: article.description,
      url: article.url,
      source: article.source.name,
    };

    const div = document.createElement('div');
    div.classList =
      'gazette-single-todays-post d-md-flex align-items-start mb-5';
    pop_container.appendChild(div);

    const img_div = document.createElement('div');
    img_div.classList = 'todays-post-thumb';
    div.appendChild(img_div);

    const img = document.createElement('img');
    if (newsInfo.img == null) {
      img.src = './img/newsPlaceholder.jpg';
    } else {
      img.src = newsInfo.img;
    }
    img_div.appendChild(img);

    const content_div = document.createElement('div');
    content_div.classList = 'todays-post-content';
    div.appendChild(content_div);

    const tag_div = document.createElement('div');
    tag_div.classList = 'gazette-post-tag';
    content_div.appendChild(tag_div);

    const link = document.createElement('a');
    link.innerHTML = category_1[y];
    link.href = '#';
    tag_div.appendChild(link);

    const h3 = document.createElement('a');
    content_div.appendChild(h3);

    const title = document.createElement('a');
    title.innerHTML = newsInfo.titulo;
    title.href = '#';
    title.classList = 'font-pt mb-2';
    h3.appendChild(title);

    const span = document.createElement('span');
    span.innerHTML = newsInfo.fecha;
    span.classList = 'gazette-post-date mb-2';
    content_div.appendChild(span);

    const p = document.createElement('p');
    p.innerHTML = newsInfo.descripcion;
    content_div.appendChild(p);

    title.addEventListener('click', () => {
      main.innerHTML = '';
      volv_container.style.display = 'block';
      renderSingleNews(newsInfo);
    });
  });
};

// Últimas Noticias

const showUltimasNews = async () => {
  let news = await getCategoryNews('general', 2, 2);

  news.forEach((article) => {
    const newsInfo = {
      img: article.urlToImage,
      titulo: article.title,
      fecha: article.publishedAt.split('T')[0],
      descripcion: article.description,
      url: article.url,
      source: article.source.name,
    };

    const img_div = document.createElement('div');
    img_div.classList = 'single-breaking-news-widget';
    ultimas_container.appendChild(img_div);

    const img = document.createElement('img');
    if (newsInfo.img == null) {
      img.src = './img/newsPlaceholder.jpg';
    } else {
      img.src = newsInfo.img;
    }
    img_div.appendChild(img);

    const tag_div = document.createElement('div');
    tag_div.classList = 'breakingnews-title';
    img_div.appendChild(tag_div);

    const p = document.createElement('p');
    p.innerHTML = 'Ultimas Noticias';
    tag_div.appendChild(p);

    const titulo_div = document.createElement('div');
    titulo_div.classList = 'breaking-news-heading gradient-background-overlay';
    img_div.appendChild(titulo_div);

    const title = document.createElement('a');
    title.innerHTML = newsInfo.titulo;
    title.href = '#';
    title.classList = 'font-pt breaking-news-heading';
    titulo_div.appendChild(title);

    title.addEventListener('click', () => {
      main.innerHTML = '';
      volv_container.style.display = 'block';
      renderSingleNews(newsInfo);
    });
  });
};

//No te pierdas

const showSideNews = async () => {
  let news = await getCategoryNews(category_2[z], 3, 1);

  news.forEach((article) => {
    const newsInfo = {
      img: article.urlToImage,
      titulo: article.title,
      fecha: article.publishedAt.split('T')[0],
      descripcion: article.description,
      url: article.url,
      source: article.source.name,
    };

    const div = document.createElement('div');
    div.classList = 'single-dont-miss-post d-flex mb-30';
    side_news_container.appendChild(div);

    const img_div = document.createElement('div');
    img_div.classList = 'dont-miss-post-thumb';
    div.appendChild(img_div);

    const img = document.createElement('img');
    if (newsInfo.img == null) {
      img.src = './img/newsPlaceholder.jpg';
    } else {
      img.src = newsInfo.img;
    }
    img_div.appendChild(img);

    const content_div = document.createElement('div');
    content_div.classList = 'dont-miss-post-content';
    div.appendChild(content_div);

    const title = document.createElement('a');
    title.innerHTML = newsInfo.titulo;
    title.href = '#';
    title.classList = 'font-pt';
    content_div.appendChild(title);

    const span = document.createElement('span');
    span.innerHTML = newsInfo.fecha;
    content_div.appendChild(span);

    title.addEventListener('click', () => {
      main.innerHTML = '';
      volv_container.style.display = 'block';
      renderSingleNews(newsInfo);
    });
  });
};

// News Grid

const showNewsGrid = async () => {
  let news = await getCategoryNews('general', 8, 2);

  news.forEach((article) => {
    const newsInfo = {
      img: article.urlToImage,
      titulo: article.title,
      fecha: article.publishedAt.split('T')[0],
      descripcion: article.description,
      url: article.url,
      source: article.source.name,
    };

    const div_1 = document.createElement('div');
    div_1.classList = 'col-12 col-md-3';
    news_grid.appendChild(div_1);

    const div_2 = document.createElement('div');
    div_2.classList = 'single-video-post';
    div_1.appendChild(div_2);

    const div_3 = document.createElement('div');
    div_3.classList = 'video-post-thumb';
    div_2.appendChild(div_3);

    const img = document.createElement('img');
    if (newsInfo.img == null) {
      img.src = './img/newsPlaceholder.jpg';
    } else {
      img.src = newsInfo.img;
    }
    div_3.appendChild(img);

    const h5 = document.createElement('h5');
    div_2.appendChild(h5);

    const title = document.createElement('a');
    title.innerHTML = newsInfo.titulo;
    title.href = '#';
    h5.appendChild(title);

    title.addEventListener('click', () => {
      main.innerHTML = '';
      volv_container.style.display = 'block';
      renderSingleNews(newsInfo);
    });
  });
};

//Volver
volverBtn.addEventListener('click', () => {
  pag_container.style.display = 'none';
  volv_container.style.display = 'none';
});

// init
const init = () => {
  showCarousel(carouselItem_1, carouselCaption_1, 1);
  showCarousel(carouselItem_2, carouselCaption_2, 2);
  showCarousel(carouselItem_3, carouselCaption_3, 3);
  showNewsPrincipal();
  showPopNews();
  showUltimasNews();
  showSideNews();
  showNewsGrid();
};

//run

init();

export { getCategoryNews, getEveryNews };
