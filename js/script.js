document.addEventListener('DOMContentLoaded', function () {

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.authors.list';

  function clearTitleList() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  }

  function titleClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;

    // Dodaj klasę 'active' do klikniętego linka
    clickedElement.classList.add('active');

    // Usuń klasę 'active' z wszystkich innych linków do artykułów
    const links = document.querySelectorAll('.titles a');
    links.forEach(link => {
      if (link !== clickedElement) {
        link.classList.remove('active');
      }
    });

    // Usuń klasę 'active' z wszystkich artykułów
    const articles = document.querySelectorAll('.post');
    articles.forEach(article => {
      article.classList.remove('active');
    });

    // Pobierz atrybut 'href' z klikniętego linka
    const articleId = clickedElement.getAttribute('href');

    // Znajdź odpowiedni artykuł za pomocą selektora (wartości atrybutu 'href')
    const selectedArticle = document.querySelector(articleId);

    // Dodaj klasę 'active' do odpowiedniego artykułu
    selectedArticle.classList.add('active');
  }

  function generateTitleLinks(customSelector = '') {
    clearTitleList();

    // Znajdź wszystkie artykuły na podstawie dostarczonego customSelectora lub domyślnego selektora
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    // Iteruj przez każdy artykuł
    articles.forEach(article => {
      // Get the ID, title, and create link HTML for each article
      const articleId = article.id;
      const titleElement = article.querySelector(optTitleSelector);
      const articleTitle = titleElement.textContent;
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      // Add the generated link HTML to the list of titles
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML += linkHTML;
    });

    // Get all links within titles and add click event listeners to them
    const links = document.querySelectorAll('.titles a');
    links.forEach(link => {
      link.addEventListener('click', titleClickHandler);
    });
  }

  function tagClickHandler(event) {
    // Prevent the default action for this event
    event.preventDefault();

    // Create a new constant named "clickedElement" and give it the value of "this"
    const clickedElement = this;

    // Create a new constant "href" and read the attribute "href" of the clicked element
    const href = clickedElement.getAttribute('href');

    // Create a new constant "tag" and extract the tag from the "href" constant
    const tag = href.replace('#tag-', '');

    // Find all tag links with class active
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    // START LOOP: for each active tag link
    activeTagLinks.forEach(tagLink => {
      // remove class active
      tagLink.classList.remove('active');
    });
    // END LOOP: for each active tag link
    // Find all tag links with "href" attribute equal to the "href" constant
    const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    // START LOOP: for each found tag link//
    sameTagLinks.forEach(tagLink => {
      // add class active
      tagLink.classList.add('active');
    });
    // END LOOP: for each found tag link//

    // Execute the function "generateTitleLinks" with the article selector as an argument
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function calculateTagsParams(count, params) {
    // Calculate the normalized count of occurrences
    const normalizedCount = count - params.min;

    // Calculate the width of the range
    const normalizedMax = params.max - params.min;

    // Calculate the percentage value
    const percentage = normalizedCount / normalizedMax;

    // Calculate the class number
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    // Return an object with parameters
    return {
      classNumber: classNumber,
      classSize: `tag-size-${classNumber}`
    };
  }

  // Example of using the function
  const params = {
    min: 2,
    max: 8
  };

  const countExample = 6; // Example count of occurrences
  const result = calculateTagsParams(countExample, params);

  console.log(result);

  function generateTags() {
    // Create a new variable allTags with an empty object
    let allTags = {};

    // Find all articles
    const articles = document.querySelectorAll('.post');

    // START LOOP: for every article:
    articles.forEach(article => {
      // Find the tags wrapper
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      // Create an HTML variable with an empty string
      let html = '';

      // Get tags from the data-tags attribute
      const articleTags = article.getAttribute('data-tags');

      // Split tags into an array
      const articleTagsArray = articleTags.split(' ');

      // START LOOP: for each tag
      for (let tag of articleTagsArray) {
        // Generate HTML of the link
        const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

        // [NEW] check if this link is NOT already in allTags
        if (!allTags[tag]) {
          // [NEW] add tag to allTags object
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        // Add generated code to the html variable
        html += tagHTML;
      }
      // END LOOP: for each tag

      // Insert HTML of all the links into the tags wrapper
      tagsWrapper.innerHTML = html;
    });
    // END LOOP: for every article

    // Find the list of tags in the right column
    const tagList = document.querySelector(optTagsListSelector);

    // Add HTML from allTags to tagList
    tagList.innerHTML = Object.keys(allTags).join(' ');
  }

  // Find all links to tags
  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('.post-tags a');

    // START LOOP: for each link
    tagLinks.forEach(tag => {
      // Add tagClickHandler as an event listener for that link
      tag.addEventListener('click', tagClickHandler);
    });
    // END LOOP: for each link
  }

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

  // Function adding listeners to author links
  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');

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

  generateTags();
  addClickListenersToTags();
  // calculateTagClass(); // This function is not defined in your code
  clearTitleList();
  // titleClickHandler(); // You don't need to call this function here
  generateTitleLinks();
  generateAuthors();
  addClickListenersToAuthors();
});
