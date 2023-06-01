const markdown = require('../libraries/markdown.js');

module.exports = function (data, noticeType, ) {
  if (!noticeType) {
    noticeType = '';
  }
  let noticeMarkup = markdown.renderInline(data);
  return `<div class="notice ${noticeType}">${noticeMarkup}</div>`;
};
