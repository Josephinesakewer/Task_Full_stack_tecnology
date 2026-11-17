(function () {
  "use strict";

  // ========== ОБЩАЯ ЛОГИКА КОНВЕРТАЦИИ ==========
  function nodeToJson(node) {
    var obj = {}, hasKeys = false, text = "", i, ch, key, val;
    if (node.attributes && node.attributes.length) {
      obj["@attributes"] = {};
      for (i = 0; i < node.attributes.length; i++) {
        obj["@attributes"][node.attributes[i].name] = node.attributes[i].value;
      }
      hasKeys = true;
    }
    for (i = 0; i < node.childNodes.length; i++) {
      ch = node.childNodes[i];
      if (ch.nodeType === 1) {
        key = ch.nodeName;
        val = nodeToJson(ch);
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
          obj[key].push(val);
        } else {
          obj[key] = val;
        }
        hasKeys = true;
      } else if (ch.nodeType === 3 || ch.nodeType === 4) {
        text += ch.nodeValue;
      }
    }
    text = text.trim();
    if (!hasKeys) return text === "" ? null : text;
    if (text !== "") obj["#text"] = text;
    return obj;
  }

  function xmlToJson(xmlString) {
    if (typeof xmlString !== "string" || !xmlString.trim()) {
      throw new Error("Пустая строка XML");
    }
    var doc = new DOMParser().parseFromString(xmlString, "application/xml");
    var errors = doc.getElementsByTagName("parsererror");
    if (errors.length) {
      throw new Error((errors[0].textContent || "Некорректный XML").trim().slice(0, 300));
    }
    var root = doc.documentElement;
    if (!root) throw new Error("Документ не содержит корневого элемента");
    var result = {};
    result[root.nodeName] = nodeToJson(root);
    return JSON.stringify(result, null, 2);
  }

  // timed once — для бенчмарка (возвращает разбивку по этапам)
  function onceTimed(xml) {
    var t0 = performance.now();
    var doc = new DOMParser().parseFromString(xml, "application/xml");
    var t1 = performance.now();
    if (doc.getElementsByTagName("parsererror").length) {
      throw new Error("XML содержит ошибки");
    }
    var root = doc.documentElement;
    var res = {};
    res[root.nodeName] = nodeToJson(root);
    var t2 = performance.now();
    var s = JSON.stringify(res, null, 2);
    var t3 = performance.now();
    return { p: t1 - t0, c: t2 - t1, s: t3 - t2, t: t3 - t0, len: s.length };
  }

  // ========== ВКЛАДКИ ==========
  document.addEventListener("DOMContentLoaded", function () {
    var $ = function (id) { return document.getElementById(id); };

    document.querySelectorAll(".tabs button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".tabs button").forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".panel-section").forEach(function (s) {
          s.classList.remove("active");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        $("sec-" + btn.dataset.tab).classList.add("active");
      });
    });

    // ---------- UI конвертера ----------
    var xmlArea = $("xml");
    var jsonArea = $("json");
    var status = $("status");

    function setStatus(el, text, type) {
      el.textContent = text || "";
      el.className = type || "";
    }

    function convert() {
      setStatus(status, "");
      try {
        var t0 = performance.now();
        var json = xmlToJson(xmlArea.value);
        var t1 = performance.now();
        jsonArea.value = json;
        setStatus(status,
          "Готово за " + (t1 - t0).toFixed(1).replace(".", ",") + " мс · " + json.length + " символов",
          "ok");
      } catch (e) {
        jsonArea.value = "";
        setStatus(status, "Ошибка: " + e.message, "err");
      }
    }

    $("convert").addEventListener("click", convert);
    $("example").addEventListener("click", function () {
      xmlArea.value =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        "<news>\n" +
        '  <item id="1" rubric="Наука">\n' +
        "    <title>Новый метод анализа данных</title>\n" +
        "    <date>2026-11-12</date>\n" +
        "    <author>Иванов Пётр</author>\n" +
        "    <text>Исследователи представили алгоритм, ускоряющий обработку XML.</text>\n" +
        "    <tags>\n" +
        "      <tag>данные</tag>\n" +
        "      <tag>xml</tag>\n" +
        "      <tag>json</tag>\n" +
        "    </tags>\n" +
        "  </item>\n" +
        '  <item id="2" rubric="Технологии">\n' +
        "    <title>Браузеры и производительность</title>\n" +
        "    <date>2026-11-10</date>\n" +
        "    <author>Сидорова Анна</author>\n" +
        "    <text>Сравнение скорости парсинга в современных движках.</text>\n" +
        "    <tags>\n" +
        "      <tag>браузер</tag>\n" +
        "      <tag>скорость</tag>\n" +
        "    </tags>\n" +
        "  </item>\n" +
        "</news>";
      setStatus(status, "Загружен пример. Нажмите «Конвертировать».", "");
    });
    $("copy").addEventListener("click", function () {
      if (!jsonArea.value) {
        setStatus(status, "Нечего копировать.", "err");
        return;
      }
      jsonArea.select();
      try {
        var ok = document.execCommand("copy");
        setStatus(status, ok ? "JSON скопирован в буфер обмена." : "Не удалось скопировать — выделите вручную.", ok ? "ok" : "err");
      } catch (e) {
        setStatus(status, "Не удалось скопировать.", "err");
      }
    });
    $("clear").addEventListener("click", function () {
      xmlArea.value = "";
      jsonArea.value = "";
      setStatus(status, "");
    });
    xmlArea.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        convert();
      }
    });

    // ---------- БЕНЧМАРК ----------
    var WORDS = ["система","данные","новости","город","завод","сеть","вода","тепло","износ","проект","журнал","таблица","сервер","браузер","скорость","запрос","ответ","страница","модель","поиск","текст","рубрика","авария","ремонт","контроль","анализ","результат","разработка","метод","оценка","время","размер","объект","элемент","документ","формат"];
    var RUBRICS = ["Экономика","Политика","Спорт","Наука","Культура","Общество"];
    var SIZES_KB = [10, 50, 100, 250, 500, 1000];
    var HEAD = ["Браузер","Версия","ОС","Данные","Размер, КБ","Повторов","Парсинг, мс","Конвертация, мс","stringify, мс","Итого (сред.), мс","Медиана, мс","Мин., мс","Макс., мс","Длина JSON"];
    var rows = [];
    var cache = {};
    var customSets = [];

    function detect() {
      var ua = navigator.userAgent, m, name = "Неизвестный", ver = "";
      if ((m = ua.match(/Edg(?:e|A|iOS)?\/([\d.]+)/))) { name = "Edge"; ver = m[1]; }
      else if ((m = ua.match(/OPR\/([\d.]+)/))) { name = "Opera"; ver = m[1]; }
      else if ((m = ua.match(/(?:Firefox|FxiOS)\/([\d.]+)/))) { name = "Firefox"; ver = m[1]; }
      else if ((m = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/))) { name = "Chrome"; ver = m[1]; }
      else if (/Safari/.test(ua) && (m = ua.match(/Version\/([\d.]+)/))) { name = "Safari"; ver = m[1]; }
      var os = /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" :
               /iPhone|iPad/.test(ua) ? "iOS" : /Mac OS X/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "—";
      $("bname").value = name;
      $("bver").value = ver;
      $("bos").value = os;
    }

    function mulberry32(a) {
      return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        var t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }

    function genXml(targetBytes) {
      var rnd = mulberry32(20261112), enc = new TextEncoder();
      var pick = function (arr) { return arr[Math.floor(rnd() * arr.length)]; };
      var words = function (n) {
        var w = [];
        for (var k = 0; k < n; k++) w.push(pick(WORDS));
        return w.join(" ");
      };
      var head = '<?xml version="1.0" encoding="UTF-8"?>\n<news>\n';
      var tail = "</news>\n";
      var parts = [head], size = enc.encode(head).length + tail.length, i = 1;
      while (size < targetBytes) {
        var item =
          '  <item id="' + i + '" rubric="' + pick(RUBRICS) + '">\n' +
          "    <title>" + words(6) + "</title>\n" +
          "    <date>2026-" + String(1 + Math.floor(rnd() * 12)).padStart(2, "0") + "-" +
            String(1 + Math.floor(rnd() * 28)).padStart(2, "0") + "</date>\n" +
          "    <author>" + words(2) + "</author>\n" +
          "    <text>" + words(60 + Math.floor(rnd() * 60)) + "</text>\n" +
          "    <tags><tag>" + pick(WORDS) + "</tag><tag>" + pick(WORDS) + "</tag><tag>" + pick(WORDS) + "</tag></tags>\n" +
          "  </item>\n";
        parts.push(item);
        size += enc.encode(item).length;
        i++;
      }
      parts.push(tail);
      return parts.join("");
    }

    function tick() {
      return new Promise(function (r) { setTimeout(r, 0); });
    }

    var avg = function (a) {
      return a.reduce(function (x, y) { return x + y; }, 0) / a.length;
    };
    var median = function (a) {
      var b = a.slice().sort(function (x, y) { return x - y; });
      var m = b.length >> 1;
      return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2;
    };
    function f(n) {
      return n.toFixed(2).replace(".", ",");
    }

    async function bench(label, xml, runs) {
      var i, r, P = [], C = [], S = [], T = [], len = 0;
      for (i = 0; i < 5; i++) {
        onceTimed(xml);
        await tick();
      }
      for (i = 0; i < runs; i++) {
        r = onceTimed(xml);
        P.push(r.p); C.push(r.c); S.push(r.s); T.push(r.t); len = r.len;
        await tick();
      }
      return [
        $("bname").value, $("bver").value, $("bos").value, label,
        (new TextEncoder().encode(xml).length / 1024).toFixed(1).replace(".", ","),
        String(runs),
        f(avg(P)), f(avg(C)), f(avg(S)), f(avg(T)),
        f(median(T)), f(Math.min.apply(null, T)), f(Math.max.apply(null, T)),
        String(len)
      ];
    }

    function buildSizes() {
      SIZES_KB.forEach(function (kb, idx) {
        var l = document.createElement("label");
        l.className = "chk";
        var c = document.createElement("input");
        c.type = "checkbox";
        c.value = kb;
        c.checked = idx < 5;
        l.appendChild(c);
        l.appendChild(document.createTextNode(" " + (kb >= 1000 ? "1 МБ" : kb + " КБ")));
        $("sizes").appendChild(l);
      });
    }

    function renderTable() {
      var t = $("tbl"), tr;
      t.textContent = "";
      tr = document.createElement("tr");
      HEAD.forEach(function (h) {
        var th = document.createElement("th");
        th.textContent = h;
        tr.appendChild(th);
      });
      t.appendChild(tr);
      rows.forEach(function (r) {
        tr = document.createElement("tr");
        r.forEach(function (v) {
          var td = document.createElement("td");
          td.textContent = v;
          tr.appendChild(td);
        });
        t.appendChild(tr);
      });
      $("tsv").value = rows.length
        ? [HEAD].concat(rows).map(function (r) { return r.join("\t"); }).join("\n")
        : "";
    }

    $("file").addEventListener("change", function () {
      var file = this.files[0];
      if (!file) return;
      var rd = new FileReader();
      rd.onload = function () {
        customSets.push({ label: "файл " + file.name, xml: String(rd.result) });
        var l = document.createElement("label");
        l.className = "chk";
        var c = document.createElement("input");
        c.type = "checkbox";
        c.checked = true;
        c.dataset.custom = customSets.length - 1;
        l.appendChild(c);
        l.appendChild(document.createTextNode(" " + file.name + " (" + (file.size / 1024).toFixed(1) + " КБ)"));
        $("custom").appendChild(l);
      };
      rd.readAsText(file, "UTF-8");
      this.value = "";
    });

    $("run").addEventListener("click", async function () {
      var runs = Math.max(5, Math.min(500, parseInt($("runs").value, 10) || 30));
      var jobs = [];
      document.querySelectorAll("#sizes input, #custom input").forEach(function (c) {
        if (!c.checked) return;
        if (c.dataset.custom !== undefined) {
          jobs.push(customSets[+c.dataset.custom]);
        } else {
          jobs.push({
            label: "генерация " + (c.value >= 1000 ? "1 МБ" : c.value + " КБ"),
            kb: +c.value
          });
        }
      });
      if (!jobs.length) {
        setStatus($("bench-status"), "Выберите хотя бы один набор данных.", "err");
        return;
      }
      $("run").disabled = true;
      $("prog").hidden = false;
      $("prog").max = jobs.length;
      $("prog").value = 0;
      try {
        for (var j = 0; j < jobs.length; j++) {
          var job = jobs[j], xml = job.xml;
          setStatus($("bench-status"), "Замер: " + job.label + " (" + (j + 1) + " из " + jobs.length + ")…", "");
          await tick();
          if (xml === undefined) {
            xml = cache[job.kb] || (cache[job.kb] = genXml(job.kb * 1024));
          }
          rows.push(await bench(job.label, xml, runs));
          renderTable();
          $("prog").value = j + 1;
        }
        setStatus($("bench-status"), "Готово.", "ok");
      } catch (e) {
        setStatus($("bench-status"), "Ошибка: " + e.message, "err");
      }
      $("run").disabled = false;
      $("prog").hidden = true;
    });

    $("copy-tbl").addEventListener("click", function () {
      var ta = $("tsv");
      if (!ta.value) {
        $("copystat").textContent = "Таблица пока пуста.";
        return;
      }
      ta.focus();
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      $("copystat").textContent = ok
        ? "Скопировано — вставьте в Excel."
        : "Не удалось скопировать: выделите текст ниже вручную.";
    });

    $("reset").addEventListener("click", function () {
      rows = [];
      renderTable();
      $("copystat").textContent = "";
    });

    detect();
    buildSizes();
    renderTable();
  });
})();