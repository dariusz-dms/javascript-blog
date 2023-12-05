const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

function clearTitleList() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
}

function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(clickedElement);

  // Add class 'active' to the clicked link
  clickedElement.classList.add('active');

  // Remove class 'active' from all article links except the clicked one
  const links = document.querySelectorAll('.titles a');
  links.forEach(link => {
    if (link !== clickedElement) {
      link.classList.remove('active');
    }
  });

  // Remove class 'active' from all articles
  const articles = document.querySelectorAll('.post');
  articles.forEach(article => {
    article.classList.remove('active');
  });

  // Get 'href' attribute from the clicked link
  const articleId = clickedElement.getAttribute('href');

  // Find the correct article using the selector (value of 'href' attribute)
  const selectedArticle = document.querySelector(articleId);

  // Add class 'active' to the correct article
  selectedArticle.classList.add('active');
}

function generateTitleLinks(){
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

generateTitleLinks();
