let mix = require('laravel-mix');

mix.ts('src/react/App.tsx', 'res/js/app.js')
   .react()
   .extract();

