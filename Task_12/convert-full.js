/**
 * Демонстрация: BEMJSON → HTML
 * Парсер: bem-json-to-html (общедоступный npm-пакет)
 */

const BEMJSON = require('bem-json-to-html');
//const bemjson = require('./lambda-full.bemjson.js');
const fs = require('fs');
const bemjson = JSON.parse(fs.readFileSync('./lambda-full.bemjson.json', 'utf8'));
//const fs = require('fs');

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

const cheerio = require('cheerio');

const serializer = new BEMJSON({
  modificatorSeparator: '--'
});

let html = serializer.toHtml(bemjson);

console.log('=== 3. Выход: сгенерированный HTML (первый .dish из реального результата) ===\n');
const $ = cheerio.load(html, null, false);
console.log($.html($('.dish').first()).replace(/></g, '>\n<'));

// Сохраняем полный результат
let fullPage = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lambda — результат BEMJSON → HTML</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
${html}
</body>
</html>`;

// булевы атрибуты: required="true" / required='true' / required="" -> required
fullPage = fullPage.replace(
  /\s(required|disabled|checked|selected|multiple|readonly)=(["'])(?:true|\1)?\2/g,
  ' $1'
);

fs.writeFileSync('output-bem.html', fullPage);
console.log('\n\n=== 4. Полный HTML сохранён в output-bem.html ===');
