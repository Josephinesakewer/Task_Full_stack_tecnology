const fs = require('fs');
const { bemhtml } = require('bem-xjst');

// Шаблонов нет: движок рендерит BEMJSON по умолчанию.
// naming задаёт стиль block__elem--mod, xhtml:false убирает "/" в <br> и <img>.
const templates = bemhtml.compile(() => {}, {
  naming: { elem: '__', mod: { name: '--', val: '_' } },
  xhtml: false
});

const bemjson = JSON.parse(fs.readFileSync('./lambda-full.bemjson.json', 'utf8'));
const body = templates.apply(bemjson);

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lambda — BEMJSON → HTML (bem-xjst)</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync('output-xjst.html', page);
console.log('Готово: output-xjst.html');
