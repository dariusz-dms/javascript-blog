const titleClickHandler = function(event){
    event.preventDefault(); // Zapobiegaj domyślnemu zachowaniu linku
  
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(clickedElement);
  
    // Remove class 'active' from all article links
    const links = document.querySelectorAll('.titles a');
    links.forEach(link => {
      link.classList.remove('active');
    });
  
    // Add class 'active' to the clicked link
    clickedElement.classList.add('active');
  
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
  };
  
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }