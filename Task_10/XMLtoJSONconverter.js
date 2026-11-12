document.addEventListener("DOMContentLoaded", function () {
  var xmlEl = document.getElementById("xml");
  var jsonEl = document.getElementById("json");
  var statusEl = document.getElementById("status");

  function setStatus(msg, kind) {
    statusEl.textContent = msg || "";
    statusEl.className = kind || "";
  }

  // Рекурсивное преобразование узла DOM в объект JS.
  // Атрибуты -> "@attributes", текст -> "#text", одинаковые дочерние теги -> массив.
  function nodeToJson(node) {
    var obj = {};
    var hasKeys = false;
    var text = "";
    var i;

    if (node.attributes && node.attributes.length) {
      obj["@attributes"] = {};
      for (i = 0; i < node.attributes.length; i++) {
        obj["@attributes"][node.attributes[i].name] = node.attributes[i].value;
      }
      hasKeys = true;
    }

    for (i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType === 1) {
        var key = child.nodeName;
        var val = nodeToJson(child);
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
          obj[key].push(val);
        } else {
          obj[key] = val;
        }
        hasKeys = true;
      } else if (child.nodeType === 3 || child.nodeType === 4) { // текст и CDATA
        text += child.nodeValue;
      }
    }

    text = text.trim();
    if (!hasKeys) return text === "" ? null : text;
    if (text !== "") obj["#text"] = text;
    return obj;
  }

  function xmlToJson(xmlString) {
    var doc = new DOMParser().parseFromString(xmlString, "application/xml");
    var err = doc.getElementsByTagName("parsererror");
    if (err.length) {
      throw new Error(err[0].textContent.trim());
    }
    var root = doc.documentElement;
    var result = {};
    result[root.nodeName] = nodeToJson(root);
    return result;
  }

  document.getElementById("convert").addEventListener("click", function () {
    var src = xmlEl.value.trim();
    if (!src) {
      jsonEl.value = "";
      setStatus("Введите XML в левое поле.", "err");
      return;
    }
    try {
      jsonEl.value = JSON.stringify(xmlToJson(src), null, 2);
      setStatus("Готово: конвертация выполнена.", "ok");
    } catch (e) {
      jsonEl.value = "";
      setStatus("Ошибка разбора XML:\n" + e.message, "err");
    }
  });

  document.getElementById("example").addEventListener("click", function () {
    xmlEl.value =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<library city="Ухта">\n' +
      '  <!-- комментарий игнорируется -->\n' +
      '  <book id="1" lang="ru">\n' +
      '    <title>Война и мир</title>\n' +
      '    <author>Л. Н. Толстой</author>\n' +
      '    <year>1869</year>\n' +
      '  </book>\n' +
      '  <book id="2">\n' +
      '    <title><![CDATA[Тихий Дон <часть 1>]]></title>\n' +
      '    <author>М. А. Шолохов</author>\n' +
      '    <empty/>\n' +
      '  </book>\n' +
      '</library>';
    jsonEl.value = "";
    setStatus("");
  });

  document.getElementById("copy").addEventListener("click", function () {
    if (!jsonEl.value) { setStatus("Нечего копировать.", "err"); return; }
    jsonEl.select();
    try {
      document.execCommand("copy");
      setStatus("JSON скопирован.", "ok");
    } catch (e) {
      setStatus("Не удалось скопировать — выделите текст вручную.", "err");
    }
  });

  document.getElementById("clear").addEventListener("click", function () {
    xmlEl.value = "";
    jsonEl.value = "";
    setStatus("");
    xmlEl.focus();
  });
});