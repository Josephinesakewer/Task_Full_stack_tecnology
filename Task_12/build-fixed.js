const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { HtmlValidate } = require('html-validate');

const FILE = process.argv[2] || 'output-full.html';
const dir = path.dirname(path.resolve(FILE));
const html = fs.readFileSync(FILE, 'utf8');
const errors = [], warns = [];

// 0. Файл не оборван
if (!/<\/html>\s*$/i.test(html)) errors.push('Файл не заканчивается </html>');

const $ = cheerio.load(html);

// 1. БЭМ-нейминг и вложенность
const NAME = '[a-z][a-z0-9]*(?:-[a-z0-9]+)*';
const RE = new RegExp(`^(${NAME})(?:__(${NAME}))?(?:--(${NAME}))?$`);
const used = new Set();

$('body [class]').each((_, el) => {
  const $el = $(el);
  $el.attr('class').split(/\s+/).filter(Boolean).forEach(cls => {
    used.add(cls);
    const m = cls.match(RE);
    if (!m) return errors.push(`Класс не по БЭМ: "${cls}"`);
    const [, block, elem] = m;
    if (elem && !$el.closest('.' + block).length)
      errors.push(`Элемент "${cls}" вне блока "${block}"`);
  });
});

// 2. Блок dish
const dishes = $('.dish');
dishes.each((i, el) => {
  const d = $(el), n = `dish #${i + 1}`;
  ['dish__head', 'dish__descr'].forEach(c => {
    if (d.children('.' + c).length !== 1) errors.push(`${n}: нужен ровно один .${c}`);
  });
  if (!d.find('.dish__name').text().trim()) errors.push(`${n}: пустое название`);
  if (!/^\$\d+\.\d{2}$/.test(d.find('.dish__price').text().trim()))
    errors.push(`${n}: странная цена`);
});
console.log(`Блоков .dish: ${dishes.length}`);

// 3. Локальные файлы (картинки, css) существуют
$('[src],[href]').each((_, el) => {
  const ref = $(el).attr('src') || $(el).attr('href');
  if (!ref || /^(https?:|\/\/|#|mailto:|tel:|data:)/.test(ref)) return;
  if (!fs.existsSync(path.join(dir, ref.split(/[?#]/)[0])))
    warns.push(`Нет файла: ${ref}`);
});

// 4. Классы из HTML, которых нет в CSS (inline + локальные css)
let css = $('style').text();
$('link[rel=stylesheet]').each((_, el) => {
  const p = path.join(dir, $(el).attr('href'));
  if (fs.existsSync(p)) css += fs.readFileSync(p, 'utf8');
});
if (css) {
  const defined = new Set([...css.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(m => m[1]));
  const missing = [...used].filter(c => !defined.has(c));
  if (missing.length) warns.push('Нет в CSS: ' + missing.join(', '));
} else warns.push('CSS не найден: стили проверить нельзя');

// 5. Валидность HTML
new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: { 'void-style': 'off' }   // <br> и <br/> оба допустимы
}).validateString(html).then(r => {
  r.results.forEach(f => f.messages.forEach(m =>
    (m.severity === 2 ? errors : warns).push(`HTML: ${m.message} (стр. ${m.line}, ${m.ruleId})`)));
  if (warns.length) console.warn('Предупреждения:\n- ' + warns.join('\n- '));
  if (errors.length) { console.error('Ошибки:\n- ' + errors.join('\n- ')); process.exit(1); }
  console.log('OK: БЭМ-структура и HTML корректны');
});