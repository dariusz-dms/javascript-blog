document.addEventListener('DOMContentLoaded', function() {
  const titleClickHandler = function(event) {
    event.preventDefault(); // Prevent default link behavior

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

    // Get all articles
    const allArticles = document.querySelectorAll('.post');

    // Remove old content of titles list
    const titlesList = document.querySelector('.titles');
    titlesList.innerHTML = '';

    // Generate article links and insert them into the titles list
    allArticles.forEach(article => {
      const articleId = article.id;
      const articleTitle = article.querySelector('.post-title').textContent;

      // Create HTML for the link based on article information
      const articleLinkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      // Append the generated link to the titles list
      titlesList.innerHTML += articleLinkHTML;
    });

    // Add event listeners to the new links
    const newLinks = document.querySelectorAll('.titles a');
    newLinks.forEach(link => {
      link.addEventListener('click', titleClickHandler);
    });
  };

  // Initial event listeners for existing links
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
});