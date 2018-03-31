import { readFileSync } from 'fs'
import glob from 'glob'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

console.log('Finding...', ...glob.sync('*.styl', {cwd: 'src/styles'}).map(e => ({[`/css/${e}`]: `./src/styles/${e}`})))

export default env => {
  const entry = {
    // 'index.html': ['./src/pages/index.pug', './styles/test.css'],
    // '.tmp': ['./src/styles/test.styl'],
    'js/main.js': ['./src/sum'],
    // ...glob.sync('src/pages/**/*.pug').map(page => {
    //   return new HtmlWebpackPlugin({
    //     template: `${page}`,
    //     filename: page.replace('src/pages/', '').replace('.pug', '.html'),
    //   })
    // },
    // 'css/lump.css': ['./src/styles/test.styl']
  }

  // entry['.tmp'] = entry['.tmp'].concat(['./src/pages/index.pug', './src/pages/tester.pug'])
  // Object.assign(entry, {'.tmp': glob.sync('src/pages/**/*.pug').concat(glob.sync('src/styles/*.styl'))})


  // Object.assign(entry, {
  //   '.tmp': glob.sync('./src/styles/*.styl').concat(glob.sync('./src/pages/**/*.pug'))
  // })

  // Object.assign(entry, ...glob.sync('./src/styles/*.styl'))

  const output = {
    path: `${__dirname}/dist`,
    filename: '[name]',
  }

  const rules = [{
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'eslint-loader',
      options: Object.assign({
        fix: true,
      }, JSON.parse(readFileSync('./.eslintrc').toString()))
    }],
  }, {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            targets: {
              browsers: [
                '> 1%',
                'last 2 major versions',
                'since 2013',
                'IE 11',
              ],
            },
          }],
        ],
      },
    }],
  }, {
    test: /\.pug$/,
    exclude: /node_modules/,
    use: [
      // {
      //   loader: 'file-loader',
      //   options: {
      //     // outputPath: (x) => `${x}yyy`,
      //     outputPath: e => e.replace('src/pages/',''),
      //     // regExp: /src\/pages\/([a-zA-Z0-9\/]+)\.pug$/,
      //     name: '[path][name].html',
      //   }
      // },
      // 'extract-loader',
      // 'html-loader',
      'raw-loader',
      {
        loader: 'pug-html-loader',
        options: {
          // exports: false,
        },
      },
    ],
  }, {
    // test: /\.styl$/,
    // exclude: /node_modules/,
    // use: [
    //   {
    //     loader: 'file-loader',
    //     options: {
    //       outputPath: 'css',
    //       name: '[name].css',
    //     }
    //   },
    //   // 'raw-loader',
    //   // 'css-loader',
    //   'stylus-loader',
    // ],
  // }, {
    test: /\.styl$/,
    use: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader',
      // use: ['css-loader'],
      use: ['css-loader', 'stylus-loader'],
      publicPath: 'testCSS',
    }),


  // }, {
  //   test: /\.html$/,
  //   use: ['html-loader']
  }]

  const plugins = [
    new CleanWebpackPlugin(['dist']),
    ...glob.sync('src/pages/**/*.pug').map(page => {
      return new HtmlWebpackPlugin({
        template: `${page}`,
        filename: page.replace('src/pages/', '').replace('.pug', '.html'),
      })
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    // new MyPlugin({options: 'stuff'}),
  ]



  const stats = {}

  const devServer = env.development
  ? {
    historyApiFallback: true,
    inline: true,
    open: false,
    overlay: true,
    host: '0.0.0.0',
    watchOptions: {
      ignored: /node_modules/,
    },
  }
  : {}

  return {
    entry,
    output,
    plugins,
    module: { rules },
    stats,
    devtool: 'source-map',
    devServer,
    mode: env.production ? 'production' : 'development',
  }
}
