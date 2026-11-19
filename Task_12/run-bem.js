/*
 * ДЕМОНСТРАЦИЯ: BEMJSON → HTML
 * Парсер: bem-json-to-html (общедоступный npm-пакет)
 * Сценарий для записи экрана:
 * 1. Показать BEMJSON (вход)
 * 2. Запустить этот скрипт
 * 3. Показать сгенерированный HTML (выход)
 * 4. Открыть output.html в браузере
 */

const BEMJSON = require('bem-json-to-html');
const fs = require('fs');
const bemjson = require('./lambda-bemjson.js');

console.log('  БЭМ-ДЕМОНСТРАЦИЯ: вход → парсер → выход');

// -- 1. ВХОД --
console.log('①  ВХОД — фрагмент BEMJSON-структуры:\n');
const example = {
  block: 'dish',
  mods: { special: true },
  content: [
    { elem: 'tag', content: 'Special' },
    {
      elem: 'head',
      content: [
        { elem: 'name', tag: 'span', content: 'Aubergine_Salad' },
        { elem: 'price', tag: 'span', content: '$5.50' }
      ]
    },
    { elem: 'descr', tag: 'p', content: 'Pureed eggplant, garlic...' }
  ]
};
console.log(JSON.stringify(example, null, 2));
console.log('\n');

// -- 2. ПАРСЕР --
console.log('②  ЗАПУСК ПАРСЕРА: bem-json-to-html');
console.log('   (модификаторы через "--" → block--mod)\n');

const serializer = new BEMJSON({
  modificatorSeparator: '--'   // важно: получаем btn--dark, dish--special
});

const htmlFragment = serializer.toHtml(bemjson);

// -- 3. ВЫХОД --
console.log('③  ВЫХОД — сгенерированный HTML (фрагмент с dish--special):\n');

const match = htmlFragment.match(/class="dish dish--special"[\s\S]*?<\/div>\s*<\/div>/);
if (match) {
  // красиво форматируем для демонстрации
  let pretty = match[0]
    .replace(/></g, '>\n  <')
    .replace(/<\/div>/g, '</div>')
    .substring(0, 550);
  console.log(pretty + '\n  ...');
} else {
  console.log(htmlFragment.substring(htmlFragment.indexOf('dish'), htmlFragment.indexOf('dish') + 400));
}

console.log('\n');

// -- 4. СОХРАНЕНИЕ --
const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lambda — результат BEMJSON → HTML (БЭМ)</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${htmlFragment}
</body>
</html>`;

fs.writeFileSync('output.html', fullHtml);

console.log('④  Полный результат сохранён: output.html');
console.log('   Классы соответствуют методологии БЭМ:');
console.log('   • block          → .header, .dish, .btn');
console.log('   • block__elem    → .dish__name, .promo__title');
console.log('   • block--mod     → .btn--dark, .dish--special, .title--gold');
console.log('   • block__elem--mod → .nav__link--active');
console.log('  Демонстрация завершена успешно\n');

