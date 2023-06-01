module.exports = [
    'src/robots.txt',
    { './src/app.json'           : '/app.webmanifest' },
    { './src/wave/static'        : '/static'          },
    { './src/_assets/js'         : '/static/js'       },
    { './src/_assets/css'        : '/static/css'      },
    { './src/_assets/fonts'      : '/static/fonts'    },
    { './src/_assets/icons'      : '/static/icons'    },
    { './src/_assets/vectors'    : '/static/vectors'  },
    { './src/_assets/.well-known': '/.well-known'     },
    
    // copy vendors files
    { 'node_modules/prism-themes/themes': '/static/vendor/prism/prism-themes/themes' },
    { 'node_modules/simpledotcss/simple.min.css': '/static/vendor/simpledotcss/simple.min.css' },
    { 'node_modules/simplelightbox/dist/simple-lightbox.min.css': '/static/vendor/simplelightbox/simple-lightbox.min.css' },
    { 'node_modules/simplelightbox/dist/simple-lightbox.min.js': '/static/vendor/simplelightbox/simple-lightbox.min.js' },
];
