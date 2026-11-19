/**
 * Демонстрация: BEMJSON → HTML
 * Парсер: bem-json-to-html (общедоступный npm-пакет)
 */

const BEMJSON = require('bem-json-to-html');
const bemjson = require('./lambda-full.bemjson.js');
const fs = require('fs');

console.log('=== 1. Вход: BEMJSON-структура (фрагмент) ===\n');
console.log(JSON.stringify({
  block: 'dish',
  mods: { special: true },
  content: [
    { elem: 'tag', content: 'Special' },
    { elem: 'head', content: [
      { elem: 'name', content: 'Greek Salad' },
      { elem: 'price', content: '$5.50' }
    ]},
    { elem: 'descr', tag: 'p', content: '...' }
  ]
}, null, 2));

console.log('\n=== 2. Запуск парсера bem-json-to-html ===\n');

const serializer = new BEMJSON({
  modificatorSeparator: '--'   // block--mod / block__elem--mod
});

const html = serializer.toHtml(bemjson);

console.log('=== 3. Выход: сгенерированный HTML (фрагмент) ===\n');

// Показываем кусок с dish
const dishMatch = html.match(/<div class="dish[^"]*">[\s\S]*?<\/div><\/div>/);
if (dishMatch) {
  console.log(dishMatch[0].replace(/></g, '>\n<').substring(0, 600));
} else {
  console.log(html.substring(0, 800));
}

// Сохраняем полный результат
const fullPage = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lambda — результат BEMJSON → HTML</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Lato, Arial, sans-serif; color: #4c4c4c; }
    .page { max-width: 1200px; margin: 0 auto; }
    .header { background: #37312f; color: #fff; padding: 16px; }
    .header__inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #fff; text-decoration: none; }
    .nav__list { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
    .nav__link { color: rgba(255,255,255,.85); text-decoration: none; text-transform: uppercase; font-size: 14px; }
    .nav__link--active { color: #c89f2d; }
    .promo { background: #37312f; color: #fff; text-align: center; padding: 80px 20px; }
    .promo__title { font-size: 36px; margin-bottom: 20px; }
    .btn { display: inline-block; padding: 12px 24px; margin: 8px; text-decoration: none; text-transform: uppercase; font-weight: 700; border: 2px solid; }
    .btn--theme-dark { background: #37312f; color: #fff; border-color: #37312f; }
    .btn--theme-light { color: #fff; border-color: #fff; }
    .title--color-gold { color: #cc9900; text-align: center; }
    .divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 16px 0; }
    .divider__line { width: 60px; height: 1px; background: rgba(0,0,0,.2); }
    .dish { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #eee; }
    .dish--special { border: 1px solid #c89f2d; padding: 12px; background: rgba(200,159,45,.06); }
    .dish__head { display: flex; justify-content: space-between; }
    .dish__name { font-weight: bold; }
    .dish__price { color: #c89f2d; }
    .dish__tag { display: inline-block; background: #c89f2d; color: #fff; font-size: 11px; padding: 2px 8px; margin-bottom: 6px; }
    .footer { background: #191919; color: #ccc; padding: 40px 20px; }
    .footer__inner { display: flex; gap: 40px; flex-wrap: wrap; }
    .footer__title { color: #fff; }
  </style>
</head>
<body>
${html}
</body>
</html>`;

fs.writeFileSync('output-bem.html', fullPage);
console.log('\n\n=== 4. Полный HTML сохранён в output-bem.html ===');
console.log('Классы сгенерированы по БЭМ: block, block__elem, block--mod');
