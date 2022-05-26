//Seleccion de elementos
const main = document.querySelector('#main-container');

//Renderizado

const renderSingleNews = (Info) => {
  //Titulo
  const titulo_container = document.createElement('div');
  titulo_container.classList = 'single-post-title bg-img background-overlay';
  titulo_container.style = 'background-image: url("./img/newsPlaceholder.jpg")';
  main.appendChild(titulo_container);

  const div_1 = document.createElement('div');
  div_1.classList = 'container h-50';
  titulo_container.appendChild(div_1);

  const div_2 = document.createElement('div');
  div_2.classList = 'row h-50 align-items-end';
  div_1.appendChild(div_2);

  const div_3 = document.createElement('div');
  div_3.classList = 'col-12';
  div_2.appendChild(div_3);

  const div_titulo = document.createElement('div');
  div_titulo.classList = 'single-post-title-content';
  div_3.appendChild(div_titulo);

  const div_source = document.createElement('div');
  div_source.classList = 'gazette-post-tag';
  div_titulo.appendChild(div_source);

  const tag = document.createElement('a');
  tag.href = '#';
  if (Info.source.name === undefined) {
    tag.innerHTML = 'Noticia';
  } else {
    tag.innerHTML = Info.source.name;
  }
  div_source.appendChild(tag);

  const h2 = document.createElement('h2');
  h2.innerHTML = Info.titulo;
  div_titulo.appendChild(h2);

  const p = document.createElement('p');
  p.innerHTML = Info.fecha;
  div_titulo.appendChild(p);

  //Contenido e imagen

  const contenido_container = document.createElement('div');
  contenido_container.classList = 'single-post-contents';
  main.appendChild(contenido_container);

  const div_4 = document.createElement('div');
  div_4.classList = 'container';
  contenido_container.appendChild(div_4);

  const div_5 = document.createElement('div');
  div_5.classList = 'row justify-content-center';
  div_4.appendChild(div_5);

  const div_6 = document.createElement('div');
  div_6.classList = 'col-12 col-md-8';
  div_5.appendChild(div_6);

  const div_contenido = document.createElement('div');
  div_contenido.classList = 'single-post-text';
  div_6.appendChild(div_contenido);

  const p_contenido = document.createElement('p');
  p_contenido.innerHTML = Info.descripcion;
  div_contenido.appendChild(p_contenido);

  const div_7 = document.createElement('div');
  div_7.classList = 'col-12';
  div_5.appendChild(div_7);

  const div_img = document.createElement('div');
  div_img.classList = 'single-post-thumb';
  div_7.appendChild(div_img);

  const img = document.createElement('img');
  if (Info.img == null) {
    img.src = './img/newsPlaceholder.jpg';
  } else {
    img.src = Info.img;
  }
  div_img.appendChild(img);

  //Leer mas

  const button = document.createElement('div');
  button.classList = 'post-continue-btn';
  button.innerHTML = `<a class="font-pt" href="${Info.url}" target="_blank">Leer mas<i class="fa fa-chevron-right" aria-hidden="true"></i
  ></a>`;
  main.appendChild(button);
};

export { renderSingleNews };
