/**
 * Simple BEMJSON → HTML serializer
 * Supports: block, elem, mods, elemMods, tag, attrs, content, mix, cls
 * Naming: block__elem  block--mod  block__elem--mod
 * Compatible with classic BEM and the structure used in Lambda page.
 */

function buildClass(json) {
  if (!json || typeof json !== 'object') return '';
  const classes = [];

  const blockName = json.block || (json.context && json.context.block);

  // If this is an element, produce block__elem (+ elemMods or mods). Do NOT add plain block class.
  if (json.elem && blockName) {
    classes.push(`${blockName}__${json.elem}`);
    const mods = json.elemMods || json.mods; // accept both for convenience
    if (mods) {
      Object.keys(mods).forEach(modName => {
        const modVal = mods[modName];
        if (modVal === true || modVal === '') {
          classes.push(`${blockName}__${json.elem}--${modName}`);
        } else if (modVal) {
          classes.push(`${blockName}__${json.elem}--${modName}_${modVal}`);
        }
      });
    }
  } else if (json.block) {
    // pure block
    classes.push(json.block);
    if (json.mods) {
      Object.keys(json.mods).forEach(modName => {
        const modVal = json.mods[modName];
        if (modVal === true || modVal === '') {
          classes.push(`${json.block}--${modName}`);
        } else if (modVal) {
          // support both --mod_val and --mod-val styles; original CSS uses --mod
          classes.push(`${json.block}--${modName}`);
          if (modVal !== true) {
            // also add value form if needed; for boolean-like we already did
            // but for title--gold we treat as boolean mod
          }
        }
      });
    }
  }

  // mix
  if (json.mix) {
    const mixes = Array.isArray(json.mix) ? json.mix : [json.mix];
    mixes.forEach(m => {
      if (m.block) {
        classes.push(m.block);
        if (m.mods) {
          Object.keys(m.mods).forEach(modName => {
            const modVal = m.mods[modName];
            if (modVal === true || modVal === '') classes.push(`${m.block}--${modName}`);
            else if (modVal) classes.push(`${m.block}--${modName}`);
          });
        }
      }
      if (m.elem && m.block) {
        classes.push(`${m.block}__${m.elem}`);
      }
    });
  }

  if (json.cls) {
    classes.push(json.cls);
  }

  return classes.filter(Boolean).join(' ');
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function toHtml(node, context = {}) {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(n => toHtml(n, context)).join('');
  }
  if (typeof node !== 'object') return '';

  // plain HTML node without block/elem
  if (node.html) {
    return node.html;
  }

  // resolve context: current block for descendants
  const currentBlock = node.block || context.block || null;
  const currentContext = { block: currentBlock };

  // for pure elements we need to know the parent block
  const effectiveNode = Object.assign({}, node);
  if (node.elem && !node.block && currentBlock) {
    effectiveNode.block = currentBlock; // so buildClass can form block__elem
  }

  const tag = node.tag || (node.block || node.elem ? 'div' : null);
  if (!tag && !node.content) return '';

  let html = '';
  if (tag) {
    html += `<${tag}`;

    // class
    const className = buildClass(Object.assign({}, effectiveNode, { context: currentContext }));
    if (className) {
      html += ` class="${escapeAttr(className)}"`;
    }

    // attrs
    if (node.attrs) {
      Object.keys(node.attrs).forEach(key => {
        if (key === 'class') return; // already handled
        const val = node.attrs[key];
        if (val === true || val === '') {
          html += ` ${key}`;
        } else if (val != null) {
          html += ` ${key}="${escapeAttr(val)}"`;
        }
      });
    }

    // void elements
    const voidTags = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);
    if (voidTags.has(tag)) {
      html += '>';
      return html;
    }

    html += '>';
  }

  // content – pass the current block as context
  if (node.content != null) {
    html += toHtml(node.content, currentContext);
  }

  if (tag) {
    html += `</${tag}>`;
  }

  return html;
}

module.exports = { toHtml, buildClass };

// CLI usage
if (require.main === module) {
  const bemjson = require('./bemjson-page.js');
  const html = '<!DOCTYPE html>\n' + toHtml(bemjson);
  require('fs').writeFileSync('generated.html', html, 'utf8');
  console.log('Generated generated.html');
  console.log('First 800 chars:\n');
  console.log(html.substring(0, 800));
  console.log('\n...\nTotal length:', html.length);
}
