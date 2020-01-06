const path = require("path");

module.exports = {
  entry: "./client/",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "build")
    publicPath: "/build/",
    proxy: {
<<<<<<< HEAD
      "/api": "http://localhost:3000"
    }
=======
      '/': 'http://localhost:3000',
    },
>>>>>>> 8035306accd4ea36b71e3b3057197aaa0c4fd38f
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
