export default {
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true
      }
    },
    'cssnano': process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: {
          removeAll: true
        },
        normalizeWhitespace: true,
        colormin: true,
        reduceIdents: true
      }]
    } : false
  }
}; 