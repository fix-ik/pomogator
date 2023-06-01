const markdown = require('markdown-it');

module.exports = (() => {
  const options = {
    html: true,
    breaks: true,
    typographer: true,
    linkify: false,
  };

  const plugins = [
    require('./cite.js'),
    // require('./map.js'),
    require('@paulrobertlloyd/markdown-it-rules'),
    require('markdown-it-abbr'),
    [require('markdown-it-anchor'), {
      tabIndex: false,
      permalink: false,
    }],
    [require('markdown-it-attribution'), {
      classNameContainer: false,
      classNameAttribution: false,
    }],
    require('markdown-it-attrs'),
    require('markdown-it-bracketed-spans'),
    require('markdown-it-deflist'),
    require('markdown-it-footnote'),
    require('markdown-it-handle'),
    [require('markdown-it-image-figures'), {
      async: true,
      lazy: true,
      figcaption: true,
    }],
  ];

  const parser = markdown(options);

  if (plugins) {
    for (const plugin of plugins) {
      if (Array.isArray(plugin)) {
        // Allow array of options to be passed.
        parser.use(...plugin);
      } else {
        parser.use(plugin);
      }
    }
  };

  const imageRenderer = require('./renderer/image.js');

  parser.renderer.rules.image = (tokens, idx, options, env, slf) => imageRenderer(tokens, idx, options, env, slf, parser);
  parser.renderer.rules.link_open = require('./renderer/links.js');  
  parser.renderer.rules.footnote_caption = require('./renderer/footnoteCaption.js');
  parser.renderer.rules.footnote_block_open = require('./renderer/footnoteBlockOpen.js');
  parser.renderer.rules.footnote_block_close = require('./renderer/footnoteBlockClose.js');

  return parser;
})();
