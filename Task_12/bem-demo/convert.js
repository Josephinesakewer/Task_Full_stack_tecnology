/**
 * Конвертер BEMJSON → HTML
 * Использует пакет bem-json-to-html
 */

const BEMJSON = require('bem-json-to-html');
const bemjson = require('./lambda.bemjson.js');
const fs = require('fs');

// Создаём сериализатор (можно настроить naming)
const serializer = new BEMJSON({
  // Используем классический BEM naming: block__elem_mod_val
  // или современный -- 
  modificatorSeparator: '--'   // block__elem--mod
});

const html = serializer.toHtml(bemjson);

// Красивый вывод
const pretty = html
  .replace(/></g, '>\n<')
  .replace(/(<\/?[a-z]+)/g, '\n$1');

console.log('=== BEMJSON → HTML (результат парсера) ===\n');
console.log(html);

fs.writeFileSync('output.html', `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Lambda — BEMJSON → HTML</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.5; }
    .page { max-width: 900px; margin: 0 auto; }
    .header { background: #37312f; color: #fff; padding: 1rem; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav__list { display: flex; gap: 1rem; list-style: none; padding: 0; }
    .nav__link--active { color: #c89f2d; }
    .promo { background: #37312f; color: #fff; padding: 3rem 1rem; text-align: center; }
    .promo__title { font-size: 2rem; }
    .button { display: inline-block; padding: 0.75rem 1.5rem; margin: 0.5rem; border: 2px solid; text-decoration: none; }
    .button--theme-dark { background: #37312f; color: #fff; border-color: #37312f; }
    .button--theme-light { color: #fff; border-color: #fff; }
    .title--color-gold { color: #cc9900; }
    .dish--special { border: 1px solid #c89f2d; padding: 0.5rem; }
    .dish__tag { background: #c89f2d; color: #fff; font-size: 0.75rem; padding: 0.2rem 0.5rem; }
    .footer { background: #191919; color: #ccc; padding: 2rem 1rem; }
    .divider { display: flex; align-items: center; gap: 0.5rem; margin: 1rem 0; }
    .divider__line { flex: 1; height: 1px; background: rgba(0,0,0,0.2); }
  </style>
</head>
<body>
${html}
</body>
</html>`);

console.log('\n\n=== Файл output.html сохранён ===');
console.log('Классы сгенерированы по БЭМ: block, block__elem, block--mod, block__elem--mod');
