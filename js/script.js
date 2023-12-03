// Pobierz wszystkie linki do artykułów
const links = document.querySelectorAll('.article-link');

// Pobierz wszystkie linki po kliknięciu przycisku
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);

// Iteruj przez każdy link i dodaj nasłuchiwanie zdarzenia 'click'
links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Zapobiegaj domyślnemu zachowaniu linku

    

        // Usuń klasę 'active' ze wszystkich linków
        links.forEach(link => {
            link.classList.remove('active');
        });

        // Dodaj klasę 'active' do klikniętego linka
        this.classList.add('active');

        // Ukryj wszystkie artykuły (usunięcie klasy 'active')
        const articles = document.querySelectorAll('.article');
        articles.forEach(article => {
            article.classList.remove('active');
        });

        // Pobierz wartość atrybutu 'href' z klikniętego linka
        const articleId = this.getAttribute('href');

        // Znajdź artykuł o odpowiednim ID
        const selectedArticle = document.querySelector(articleId);

        // Dodaj klasę 'active' do znalezionego artykułu
        selectedArticle.classList.add('active');
    });
    
});