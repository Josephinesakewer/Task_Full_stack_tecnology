// Вставить это в ЛЕВОЕ поле (Templates / BEMHTML) на https://bem.github.io/bem-xjst/

// Базовый тег для всего
block('*')({
  tag: 'div'
});

// Ссылки
block('logo')({ tag: 'a' });
block('btn')({ tag: 'a' });
block('nav').elem('link')({ tag: 'a' });

// Заголовки и текст
block('promo').elem('title')({ tag: 'h1' });
block('dish').elem('descr')({ tag: 'p' });

// Списки
block('nav').elem('list')({ tag: 'ul' });
block('nav').elem('item')({ tag: 'li' });

// Модификаторы автоматически превращаются в классы:
// dish + mods.special     →  class="dish dish--special"
// btn  + mods.dark        →  class="btn btn--dark"
// link + elemMods.active  →  class="nav__link nav__link--active"
