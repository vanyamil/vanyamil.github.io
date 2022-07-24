const path = require('path');

let mix = require('laravel-mix');

mix.alias({
   '@': path.join(__dirname, 'src'),
   'node': path.join(__dirname, 'node_modules'),
});

mix.ts('src/react/App.tsx', 'res/js/app.js')
   .react()
   .extract();

mix.sass('src/sass/app.scss', 'res/css/app.css');