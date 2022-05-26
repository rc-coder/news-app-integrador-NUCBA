import { getCategoryNews } from './main.js';
import { renderNews } from './busqueda.js';

//Seleccion de elementos
const dropdown = document.querySelector('.dropdown-menu');
const main = document.querySelector('#main-container');
const pag_container = document.querySelector('#pag-container');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

let pagina = 1;

dropdown.addEventListener('click', ({ target }) => {
  const categoria = target.dataset.category;
  main.innerHTML = '';
  pag_container.style.display = 'block';

  const fetchNews = async () => {
    let news = await getCategoryNews(categoria, 6, pagina);
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
