import { readFileSync } from 'fs'
import glob from 'glob'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export default env => {
  const entry = {
    'js/main.js': ['./src/sum'],
  }

  if (env.development) {
    // Add in all style sheets found in the base 'src/styles' directory
    Object.assign(entry, ...glob.sync('*.styl', {cwd: 'src/styles'}).map(e => ({[`css/${e.replace('.styl', '')}`]: `./src/styles/${e}`})))
  } else {
    Object.assign(entry, {'.tmp': glob.sync('./src/styles/*.styl').concat(glob.sync('./pages/**/*.pug'))})
  }

  const output = {
    path: `${__dirname}/dist`,
    filename: '[name]',
    publicPath: '/',
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
    test: /\.(png)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: a => a.replace('assets/', ''),
        },
      },
    ],
  }, {
    test: /\.pug$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'pug-loader',
        options: {
          root: `${__dirname}/src`,
        }
      }
    ],
  }].concat(env.development
    // Development
    ? [{
      test: /\.styl$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }),
    }]
    // Production
    : [{
      test: /\.styl$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'css',
            name: '[name].css',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        'stylus-loader',
      ]
    }]
  )

  const plugins = [
    new CleanWebpackPlugin(['dist']),
    ...glob.sync('pages/**/*.pug').map(page => {
      return new HtmlWebpackPlugin({
        template: `${page}`,
        filename: page.replace('pages/', '').replace('.pug', '.html'),
      })
    }),
  ].concat(env.development
    // Development
    ? [new ExtractTextWebpackPlugin({ filename: '[name].css' })]
    // Production
    : []
  )

  const resolve = {
    extensions: ['.js', '.styl'],
    modules: ['node_modules', 'src'],
    alias: {
      assets: `${__dirname}/assets`,
    }
  }

  const stats = {}

  const devServer = {
    historyApiFallback: true,
    inline: true,
    open: false,
    overlay: true,
    host: '0.0.0.0',
    watchOptions: {
      ignored: /node_modules/,
    },
  }

  return {
    entry,
    output,
    plugins,
    module: { rules },
    stats,
    resolve,
    devtool: 'source-map',
    devServer,
    mode: env.production ? 'production' : 'development',
  }
}
