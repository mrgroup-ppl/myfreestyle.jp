module.exports = ({ file, options, env }) => {
  plugins = {
    autoprefixer: {
      add: true,
    },
    cssnano: require('cssnano')({
      preset: ['default', {}],
    }),
    'postcss': [
      require('css-mqpacker')({
        sort: true,
      }),
    ]
  }

  return {
    plugins,
  }
}
