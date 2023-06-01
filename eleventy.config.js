require('dotenv').config();
const process = require('node:process');
const copy = require('./lib/copy.js');
const aliases = require('./lib/aliases.js');
const collections = require('./lib/collections/index.js');
const filters = require('./lib/filters/index.js');
const shortcodes = require('./lib/shortcodes/index.js');
const shortcodesPaired = require('./lib/shortcodes/indexPaired.js');
const webmanifest = require('./src/app.json');

// Change this to match the actual path prefix.
const metadata = require('./src/_data/metadata.json');
const pathPrefix = process.env.PATH_PREFIX || metadata.pathPrefix;

module.exports = function (eleventy) {

  // [PassthroughCopy](https://www.11ty.dev/docs/copy/)
  if (Array.isArray(copy) && copy.length) {
    copy.forEach( pass => eleventy.addPassthroughCopy(pass) );
  }

  for (const [name, alias] of Object.entries(aliases)) {
    eleventy.addLayoutAlias(name, alias);
  }

  // Collections
  for (const [name, collection] of Object.entries(collections)) {
    eleventy.addCollection(name, collection);
  }

  // Paired Shortcodes
  for (const [name, pair] of Object.entries(shortcodesPaired)) {
    eleventy.addPairedShortcode(name, pair);
  }

  // Shortcodes
  for (const [name, shortcode] of Object.entries(shortcodes)) {
    eleventy.addShortcode(name, shortcode);
  }  

  // If the wave contains images, then add the Lightbox JS/CSS and render lightboxes for it.
  // Since it needs access to the `page` object, we can't use arrow notation here.
  const lightbox = require('./lib/shortcodes/lightboxref.js');
  eleventy.addShortcode('addLightBoxRefIfNecessary', function () { return lightbox(this.page); });

  // Extensions
  eleventy.addExtension('markdown', {key: 'md'});

  // Filters
  for (const [name, filter] of Object.entries(filters)) {
    eleventy.addFilter(name, filter);
  }

  // Slugify filter
  const slugifyFilter = eleventy.getFilter('slugify');
  eleventy.addFilter('slugify', string => slugifyFilter(string, {
    separator: '-',
  }));

  // Global data
  eleventy.addGlobalData('app', webmanifest);
  eleventy.addGlobalData('app.url', process.env.URL || '');

  // Plugins
  eleventy.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
  eleventy.addPlugin(require('@11tyrocks/eleventy-plugin-lightningcss'));

  // Folder data
  eleventy.setDataFileBaseName('_data');

  // Libraries
  eleventy.setLibrary('md', require('./lib/libraries/markdown.js'));
  eleventy.amendLibrary("md", mdLib => mdLib.enable('code'));


  // Liquid
  eleventy.setLiquidOptions({
    cache: true,
    dateFormat: '%Y-%m-%dT%H:%M:%S.%L%:z',
    globals: {
      app: webmanifest,
      dates: require('./src/_data/dates.js'),
      navigation: require('./src/_data/navigation.js'),
    },
  });

  // Config
  return {

    dir: {
      input: 'src',
      output: 'www',
      layouts: '_layouts',
      includes: '_includes',
    },
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      'html', 'css', 
      'liquid', 'md', 
      'njk', '11ty.js'
    ],
    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',
    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix` in metadata.json.
    // Don’t worry about leading and trailing slashes, we normalize these.
  
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/
  
    // You can also pass this in on the command line using `--pathprefix`
  
    // Optional (default is "/")
    pathPrefix: pathPrefix,
  };

};
