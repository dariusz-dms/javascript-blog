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
      // Pobierz ID, tytuł i utwórz HTML linka dla każdego artykułu
      const articleId = article.id;
      const titleElement = article.querySelector(optTitleSelector);
      const articleTitle = titleElement.textContent;
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      // Dodaj wygenerowany HTML linka do listy tytułów
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML += linkHTML;
    });

    // Pobierz wszystkie linki w tytułach i dodaj do nich nasłuchiwacze zdarzeń kliknięcia
    const links = document.querySelectorAll('.titles a');
    links.forEach(link => {
      link.addEventListener('click', titleClickHandler);
    });
  }

  function tagClickHandler(event) {
    // Zapobiegnij domyślnej akcji dla tego zdarzenia
    event.preventDefault();

    // Stwórz nową stałą "clickedElement" i przypisz jej wartość "this"
    const clickedElement = this;

    // Stwórz nową stałą "href" i odczytaj atrybut "href" klikniętego elementu
    const href = clickedElement.getAttribute('href');

    // Stwórz nową stałą "tag" i wyodrębnij tag z stałej "href"
    const tag = href.replace('#tag-', '');

    // Znajdź wszystkie linki tagów z klasą active
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    // ROZPOCZNIJ PĘTLĘ: dla każdego aktywnego linku tagu
    activeTagLinks.forEach(tagLink => {
      // usuń klasę active
      tagLink.classList.remove('active');
    });
    // ZAKOŃCZ PĘTLĘ: dla każdego aktywnego linku tagu
    // Znajdź wszystkie linki tagów z atrybutem "href" równym stałej "href"
    const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    // ROZPOCZNIJ PĘTLĘ: dla każdego znalezionego linku tagu//
    sameTagLinks.forEach(tagLink => {
      // dodaj klasę active
      tagLink.classList.add('active');
    });
    // ZAKOŃCZ PĘTLĘ: dla każdego znalezionego linku tagu//

    // wykonaj funkcję "generateTitleLinks" z selektorem artykułu jako argumentem
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function calculateTagsParams(count, params) {
    // Oblicz znormalizowaną liczbę wystąpień
    const normalizedCount = count - params.min;

    // Oblicz szerokość zakresu
    const normalizedMax = params.max - params.min;

    // Oblicz procentową wartość
    const percentage = normalizedCount / normalizedMax;

    // Oblicz numer klasy
    const optCloudClassCount = 5; // Liczba klas dla chmurki tagów
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    // Zwróć obiekt z parametrami
    return {
      classNumber: classNumber,
      classSize: `tag-size-${classNumber}`
    };
  }

  // Przykład użycia funkcji
  const params = {
    min: 2,
    max: 8
  };

  const countExample = 6; // Przykładowa liczba wystąpień
  const result = calculateTagsParams(countExample, params);

  console.log(result);

  function generateTags() {
    // stwórz nową zmienną allTags z pustym obiektem //
    let allTags = {};

    // znajdź wszystkie artykuły
    const articles = document.querySelectorAll('.post');

    // ROZPOCZNIJ PĘTLĘ: dla każdego artykułu:
    articles.forEach(article => {
      // znajdź opakowanie tagów
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      // utwórz zmienną html z pustym ciągiem //
      let html = '';

      // pobierz tagi z atrybutu data-tags //
      const articleTags = article.getAttribute('data-tags');

      // podziel tagi na tablicę //
      const articleTagsArray = articleTags.split(' ');

      // ROZPOCZNIJ PĘTLĘ: dla każdego tagu
      for (let tag of articleTagsArray) {
        // wygeneruj HTML linka
        const tagHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

        // [NOWE] sprawdź, czy ten link NIE jest już w allTags //
        if (!allTags[tag]) {
          // [NOWE] dodaj tag do obiektu allTags //
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        // dodaj wygenerowany kod do zmiennej html
        html += tagHTML;
      }
      // ZAKOŃCZ PĘTLĘ: dla każdego tagu

      // wstaw HTML wszystkich linków do opakowania tagów
      tagsWrapper.innerHTML = html;
    });
    // ZAKOŃCZ PĘTLĘ: dla każdego artykułu

    // znajdź listę tagów w prawej kolumnie //
    const tagList = document.querySelector(optTagsListSelector);

    // dodaj HTML z allTags do tagList //
    tagList.innerHTML = Object.keys(allTags).join(' ');
  }

  // znajdź wszystkie linki do tagów
  function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('.post-tags a');

    // ROZPOCZNIJ PĘTLĘ: dla każdego linku
    tagLinks.forEach(tag => {
      // dodaj tagClickHandler jako nasłuchiwacz zdarzeń dla tego linku
      tag.addEventListener('click', tagClickHandler);
    });
    // ZAKOŃCZ PĘTLĘ: dla każdego linku
  }

  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);

    articles.forEach(article => {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      const authorLink = document.createElement('a');
      const author = ''; // Pobierz informacje o autorze z artykułu

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

    console.log("Generowanie autorów...");
  }

  // Funkcja dodająca nasłuchiwacze do linków autora
  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + ' a');

    authorLinks.forEach(author => {
      author.addEventListener('click', authorClickHandler);
    });
  }

  function authorClickHandler(event) {
    event.preventDefault();

    // Zidentyfikuj kliknięty link autora
    const clickedElement = this;
    // Wyodrębnij identyfikator autora z atrybutu href klikniętego linku autora
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');

    // Wygeneruj linki tytułów na podstawie atrybutu autora i wyświetl je
    generateTitleLinks(`[data-author="${author}"]`);
  }

  generateTags();
  addClickListenersToTags();
  // calculateTagClass(); // Ta funkcja nie jest zdefiniowana w Twoim kodzie
  clearTitleList();
  // titleClickHandler(); // Nie trzeba wywoływać tej funkcji tutaj
  generateTitleLinks();
  generateAuthors();
  addClickListenersToAuthors();
});
