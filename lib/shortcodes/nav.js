// generate navigation 
const
  listType      = 'ul',
  itemType      = 'li',
  elementActive = 'strong',
  classActive   = 'active',
  classOpen     = 'open';

// pass in collections.all | eleventyNavigation, (current) page, and maximum depth level
module.exports  = (navData, page, maxLevel = 999) => {

  function navRecurse(entry, level = 1) {

    let children = '';

    if (level < maxLevel) {
      for (let child of entry.children) {
        children += navRecurse(child, level++);
      }
    }

    let
      active = (entry.url === page.url),
      classList = [];

    if ((active && children) || children.includes(`<${ elementActive }>`)) classList.push(classOpen);
    if (active) classList.push(classActive);

    return (
      `<${ itemType }` +
      (classList.length ? ` class="${ classList.join(' ') }"` : '') +
      '>' +
      (active ? `<${ elementActive }>` : `<a href="${ entry.url }">`) +
      entry.title +
      (active ? `</${ elementActive }>` : '</a>') +
      (children ? `<${ listType }>${ children }</${ listType }>` : '') +
      `</${ itemType }`
    );

  }

  let items = '';
  for (let entry of navData) {
    items += navRecurse(entry);
  }

  return `<nav><${ listType }>${ items }</${ listType }></nav>`;
};
