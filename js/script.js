const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optAuthorsListSelector = '.authors.list'; // Dodana deklaracja
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function clearTitleList() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
}

function titleClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(clickedElement);

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
}

function generateTitleLinks(customSelector = '') {
  clearTitleList();
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  activeTagLinks.forEach(tagLink => {
    tagLink.classList.remove('active');
  });

  const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  sameTagLinks.forEach(tagLink => {
    tagLink.classList.add('active');
  });

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll('.post');

  articles.forEach(article => {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const tagClass = calculateTagClass(allTags[tag], { min: 2, max: 8 });
      html += `<li class="${tagClass}"><a href="#tag-${tag}">${tag}</a></li>`;

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagsWrapper.innerHTML = html;
  });

  const tagList = document.querySelector(optTagsListSelector);
  let allTagsHTML = '';
  for (let tag in allTags) {
    const tagLink = calculateTagClass(allTags[tag], { min: 2, max: 8 });
    allTagsHTML += `<li class="${tagLink}"><a href="#tag-${tag}">${tag} (${allTags[tag]})</a></li>`;
  }
  tagList.innerHTML = allTagsHTML;
}

document.addEventListener('DOMContentLoaded', function () {
  generateTags();
});

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('.post-tags a');

  tagLinks.forEach(tag => {
    tag.addEventListener('click', tagClickHandler);
  });
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  articles.forEach(article => {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const authorLink = document.createElement('a');
    const author = ''; // Get author information from the article

    authorLink.setAttribute('href', `#author-${author}`);
    authorLink.textContent = `by ${author}`;

    authorWrapper.appendChild(authorLink);
    article.setAttribute('data-author', author);
  });

  const allAuthors = {};
  articles.forEach(article => {
    const authorName = article.getAttribute('data-author');

    if (!allAuthors[authorName]) {
      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
  });

  const authorList = document.querySelector(optAuthorsListSelector);
  let authorsHTML = '';

  for (let author in allAuthors) {
    authorsHTML += `<li><a href="#author-${author}">${author} (${allAuthors[author]})</a></li>`;
  }

  authorList.innerHTML = authorsHTML;
  console.log('Generating authors...');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');

  authorLinks.forEach(author => {
    author.addEventListener('click', authorClickHandler);
  });
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  generateTitleLinks(`[data-author="${author}"]`);
}

document.addEventListener('DOMContentLoaded', function () {
  generateAuthors();
  addClickListenersToAuthors();
});
