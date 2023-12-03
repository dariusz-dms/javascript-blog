document.addEventListener('DOMContentLoaded', function() {
    const titleClickHandler = function(event){
      console.log('Link was clicked!');
    }
    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
      const handleLinkClick = function(event){
      // Kod obsługi kliknięcia linku
      event.preventDefault(); // Zapobiegaj domyślnemu zachowaniu linku
  
      const clickedElement = this;
      console.log('Link was clicked!');
      console.log(clickedElement);
  
      /* remove class 'active' from all article links  */
      const links = document.querySelectorAll('.titles a');
      links.forEach(link => {
        link.classList.remove('active');
      });
  
      /* add class 'active' to the clicked link */
      clickedElement.classList.add('active');
  
      /* remove class 'active' from all articles */
      const articles = document.querySelectorAll('.post');
      articles.forEach(article => {
        article.classList.remove('active');
      });
  
      /* get 'href' attribute from the clicked link */
      const articleId = clickedElement.getAttribute('href');
  
      /* find the correct article using the selector (value of 'href' attribute) */
      const selectedArticle = document.querySelector(articleId);
  
      /* add class 'active' to the correct article */
      selectedArticle.classList.add('active');
    };
    
  });