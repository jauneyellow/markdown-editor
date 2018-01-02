const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/app/render.jsx"
  },
  target: "electron-main",
  output: {
    path: __dirname + "/build/",
    publicPath: "/build/",
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2017"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "./build"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css"]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devtool: "inline-source-map"
};
