module.exports = collection => {
  const items = collection.getFilteredByGlob('src/wave/article/*.md');

  for (const item of items) {
    item.data.duotoneCardImage = true;
  }

  return items.reverse();
};
