import { getEveryNews } from './main.js';

//Seleccion de elementos
const form_busqueda = document.forms.formBusqueda;
const main = document.querySelector('#main-container');
const pag_container = document.querySelector('#pag-container');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

let pagina = 1;

form_busqueda.addEventListener('submit', async (e) => {
  e.preventDefault();

  let input = form_busqueda.busqueda.value;

  if (input === '') {
    return;
  }
  main.innerHTML = '';
  pag_container.style.display = 'block';

  const fetchNews = async () => {
    let newsData = await getEveryNews(input, pagina);

    if (newsData.totalResults == 0) {
      const h2 = document.createElement('h2');
      h2.classList = 'font-pt';
      h2.innerHTML = 'No hay resultados para tu busqueda';
      main.appendChild(h2);

      return;
    }
    let news = newsData.articles;
    news.forEach((article) => {
      renderNews(article);
    });
  };

  fetchNews();

  nextBtn.addEventListener('click', () => {
    main.innerHTML = '';
    pagina++;

    fetchNews();

    if (pagina > 1) {
      prevBtn.parentElement.classList.remove('disabled');
    }
  });

  prevBtn.addEventListener('click', () => {
    main.innerHTML = '';
    pagina--;

    fetchNews();
    if (pagina === 1) {
      prevBtn.parentElement.classList.add('disabled');
    }
  });
});

const renderNews = (article) => {
  const news_container = document.createElement('div');
  news_container.classList = 'col-12 col-md-4';
  main.appendChild(news_container);

  const post = document.createElement('div');
  post.classList = 'gazette-welcome-post';
  news_container.appendChild(post);

  const tag = document.createElement('div');
  tag.classList = 'gazette-post-tag';
  post.appendChild(tag);

  const source = document.createElement('a');
  source.href = '#';
  source.innerHTML = article.source.name;
  tag.appendChild(source);

  const h2 = document.createElement('h2');
  h2.classList = 'font-pt';
  h2.innerHTML = article.title;
  post.appendChild(h2);

  const fecha = document.createElement('p');
  fecha.classList = 'gazette-post-date';
  fecha.innerHTML = article.publishedAt.split('T')[0];
  post.appendChild(fecha);

  const imgDiv = document.createElement('div');
  imgDiv.classList = 'blog-post-thumbnail my-5';
  post.appendChild(imgDiv);

  const img = document.createElement('img');
  img.src = article.urlToImage;
  imgDiv.appendChild(img);

  const desc = document.createElement('p');
  desc.innerHTML = article.description;
  post.appendChild(desc);

  const seguir = document.createElement('div');
  seguir.classList = 'post-continue-reading-share mt-30';
  post.appendChild(seguir);

  const button = document.createElement('div');
  button.classList = 'post-continue-btn';
  button.innerHTML = `<a class="font-pt" href="${article.url}" target="_blank">Leer mas<i class="fa fa-chevron-right" aria-hidden="true"></i
  ></a>`;
  seguir.appendChild(button);
};

export { renderNews };
