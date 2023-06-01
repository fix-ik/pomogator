const {absoluteUrl} = require('@11ty/eleventy-plugin-rss');

module.exports = {
  absolute_url: absoluteUrl,
  color: require('./color.js'),
  contrast_with: require('./contrast-with.js'),
  date_with_time_zone: require('./date-with-time-zone.js'),
  excludes: require('./excludes.js'),
  filterTagList: require('./filterTagList.js'),
  hostname: require('./hostname.js'),
  head: require('./head.js'),
  htmlDateString: require('./htmlDateString.js'),
  includes: require('./includes.js'),
  markdown: require('./markdown.js'),
  percentage_of: require('./percentage-of.js'),
  readableDate: require('./readableDate.js'),
  sum: require('./sum.js'),
  template_content_to_feed_html: require('./template-content-to-feed-html.js'),
};
