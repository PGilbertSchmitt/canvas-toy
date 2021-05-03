const path = require("path");
const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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
    ]
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
  node: {
    __dirname: false,
  }
};