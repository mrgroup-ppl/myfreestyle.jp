import CleanWebpackPlugin from 'clean-webpack-plugin'
import glob from 'glob'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
export default env => {

  const entry = {
    'js/main.js': ['./src/sum'],
  }

  Object.assign(
    entry,
    ...glob.sync('**/*.styl', {cwd: 'src/styles'})
      .map(e => ({
        [`s/${e.replace('.styl', '')}`]: `./src/styles/${e}`
      }))
  )

  const output = {
    path: `${__dirname}/dist`,
    filename: '[name]',
    publicPath: '/',
  }

  const rules = [
    {
      enforce: 'pre',
      test: /\.js$/,
      include: /src/,
      use: [
        {
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
      ],
    },
    {
      test: /\.js$/,
      include: /src/,
      use: [
        {
          loader: 'babel-loader',
          // options: {}
        },
      ]
    },
    {
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
    },
    {
      test: /\.pug$/,
      include: /pages|src/,
      use: [
        {
          loader: 'pug-loader',
          options: {
            root: `${__dirname}/src`,
          },
        },
      ],
    },
    {
      test: /\.styl$/,
      include: /src/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'stylus-loader',
          options: {},
        },
      ],
    },
  ].concat(!env.production
    // Development
    ? []
    // Production
    : []
  )

  const plugins = [
    new CleanWebpackPlugin(['dist']),
    ...glob.sync('pages/**/*.pug').map(page => {
      return new HtmlWebpackPlugin({
        template: `${page}`,
        filename: page.replace('pages/', '').replace('.pug', '.html'),
      })
    }),
    new MiniCssExtractPlugin({
      filename: 'cs[name].css'
    }),
  ].concat(!env.production
    // Development
    ? []
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

  const devServer = {}

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
