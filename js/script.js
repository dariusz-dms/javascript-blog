const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';

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

function generateTitleLinks(customSelector = '') {
  clearTitleList();

  // Find all articles based on the provided customSelector or default selector
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  // Iterate through each article
  articles.forEach(article => {
    // Get the ID, title, and create link HTML for each article
    const articleId = article.id;
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.textContent;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    // Add generated link HTML to the list of titles
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML += linkHTML;
  });

  // Get all links within titles and add click event listeners to them
  const links = document.querySelectorAll('.titles a');
  links.forEach(link => {
    link.addEventListener('click', titleClickHandler);
  });
}

function tagClickHandler(event){
  // prevent default action for this event
  event.preventDefault();

  // make new constant named "clickedElement" and give it the value of "this"
  const clickedElement = this;

  // make a new constant "href" and read the attribute "href" of the clicked element
  const href = clickedElement.getAttribute('href');

  // make a new constant "tag" and extract tag from the "href" constant
  const tag = href.replace('#tag-', '');

  // find all tag links with class active
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  // START LOOP: for each active tag link
  activeTagLinks.forEach(tagLink => {
    // remove class active
    tagLink.classList.remove('active');
  });
  // END LOOP: for each active tag link
  // find all tag links with "href" attribute equal to the "href" constant
  const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  // START LOOP: for each found tag link//
  sameTagLinks.forEach(tagLink => {
    // add class active
    tagLink.classList.add('active');
  });
  // END LOOP: for each found tag link//

  // execute function "generateTitleLinks" with article selector as argument
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function generateTags() {
  // create a new variable allTags with an empty object //
  let allTags = {};

  // find all articles
  const articles = document.querySelectorAll('.post');

  // START LOOP: for every article:
  articles.forEach(article => {
    // find tags wrapper
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    // make html variable with empty string //
    let html = '';

    // get tags from data-tags attribute //
    const articleTags = article.getAttribute('data-tags');

    // split tags into array //
    const articleTagsArray = articleTags.split(' ');

    // START LOOP: for each tag
    for (let tag of articleTagsArray) {
      // generate HTML of the link
      const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      // [NEW] check if this link is NOT already in allTags //
      if(!allTags[tag]) {
      // [NEW] add tag to allTags object //
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams)

      // [NEW] create variable for all links HTML code //
      let allTagsHTML = '';

      // [NEW] START LOOP: for each tag in allTags:
      for(let tag in allTags){
        // [NEW] generate code of a link and add it to allTagsHTML //
        allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      }
      // [NEW] END LOOP: for each tag in allTags: //

      //[NEW] add HTML from allTagsHTML to tagList //
      tagList.innerHTML = allTagsHTML;

      // add generated code to html variable
      html += tagHTML;
    }
    // END LOOP: for each tag

    // insert HTML of all the links into the tags wrapper
    tagsWrapper.innerHTML = html;
  });
  // END LOOP: for every article

  // find list of tags in right column //
  const tagList = document.querySelector(optTagsListSelector);

  // add html from allTags to tagList //
  tagList.innerHTML = allTags.join(' ');
}

generateTags();

// find all links to tags
function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.post-tags a');

  // START LOOP: for each link
  tagLinks.forEach(tag => {
    // add tagClickHandler as event listener for that link
    tag.addEventListener('click', tagClickHandler);
  });
  // END LOOP: for each link
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  articles.forEach(article => {
    // Find the wrapper element for the author information
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    // Create a new link element for the author
    const authorLink = document.createElement('a');

    // Extract the author information from the article data or other relevant source
    const author = ''; // Extract the author information here from the article

    // Set the href attribute of the author link
    authorLink.setAttribute('href', `#author-${author}`);
    // Set the displayed text of the author link
    authorLink.textContent = `by ${author}`;

    // Append the author link to the author information wrapper in the article
    authorWrapper.appendChild(authorLink);
    // Set the data-author attribute for each article
    article.setAttribute('data-author', author);
  });
}

function addClickListenersToAuthors() {
  // Find all author links within the article
  const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');

  // Attach a click event listener to each author link
  authorLinks.forEach(author => {
    author.addEventListener('click', authorClickHandler);
  });
}

function authorClickHandler(event) {
  event.preventDefault();

  // Identify the clicked author link
  const clickedElement = this;
  // Extract the author identifier from the href attribute of the clicked author link
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  // Generate title links based on the author attribute and display them
  generateTitleLinks(`[data-author="${author}"]`);
}

// Call generateAuthors and addClickListenersToAuthors function after the HTML structure is loaded
document.addEventListener('DOMContentLoaded', function() {
  generateAuthors();
  addClickListenersToAuthors();
});
