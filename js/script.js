const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

function clearTitleList() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
}

function generateTitleLinks() {
  clearTitleList();

  const articles = document.querySelectorAll(optArticleSelector);
  articles.forEach(article => {
    const articleId = article.id;
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.textContent;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML += linkHTML;
  });

  const links = document.querySelectorAll('.titles a');
  links.forEach(link => {
    link.addEventListener('click', titleClickHandler);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  generateTitleLinks();

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    clickedElement.classList.add('active');

    const links = document.querySelectorAll('.titles a');
    links.forEach(link => {
      if (link !== clickedElement) {
        link.classList.remove('active');
      }
    });

    const articles = document.querySelectorAll('.post');
    articles.forEach(article => {
      article.classList.remove('active');
    });

    const articleId = clickedElement.getAttribute('href');
    const selectedArticle = document.querySelector(articleId);
    selectedArticle.classList.add('active');

    const initialTitleList = document.querySelector('.titles');
    initialTitleList.innerHTML = ''; // Removing initial HTML links

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = clickedElement.parentElement.outerHTML;

    generateTitleLinks();
  });

  const links = document.querySelectorAll('.titles a');
  links.forEach(link => {
    link.addEventListener('click', titleClickHandler);
  });

  const initialTitleList = document.querySelector('.titles');
  initialTitleList.innerHTML = ''; // Removing initial HTML links
});