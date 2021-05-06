const path = require("path");
const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin } = require("webpack");

var babelOptions = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/proposal-class-properties"
  ]
};

module.exports = {
  context: __dirname,
  target: "web",
  mode: "development",
  entry: "src/index.tsx",
  output: {
    path: path.resolve('docs'),
    filename: "bundle.js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    extensions: [".js", ".ts", ".tsx"],
    plugins: [
      new tsConfigPathsPlugin()
    ],
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "source-map-loader"
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: {
          loader: "eslint-loader",
          options: {
            cache: true,
            failOnError: true,
            failOnWarning: false
          }
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env.BASE_ROUTE': JSON.stringify(process.env.BASE_ROUTE)
    })
  ]
};