
module.exports = function (tags) {
    return (tags || []).filter(tag => ['all', 'nav', 'wave', 'waves'].indexOf(tag) === -1);
}
