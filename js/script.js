document.addEventListener('DOMContentLoaded', function() {
    const titleClickHandler = function(){
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
  
      // Usuń klasę 'active' ze wszystkich linków
      const links = document.querySelectorAll('.titles a');
      links.forEach(link => {
        link.classList.remove('active');
      });
  
      // Dodaj klasę 'active' do klikniętego linka
      clickedElement.classList.add('active');
  
      // Ukryj wszystkie artykuły (usunięcie klasy 'active')
      const articles = document.querySelectorAll('.post');
      articles.forEach(article => {
        article.classList.remove('active');
      });
  
      // Pobierz wartość atrybutu 'href' z klikniętego linka
      const articleId = clickedElement.getAttribute('href');
  
      // Znajdź artykuł o odpowiednim ID
      const selectedArticle = document.querySelector(articleId);
  
      // Dodaj klasę 'active' do znalezionego artykułu
      selectedArticle.classList.add('active');
    };
  });