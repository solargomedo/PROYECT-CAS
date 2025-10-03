const path = require('path');
//const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const {
  NODE_ENV = 'production',
} = process.env;
module.exports = {
  entry: './server.js',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // new CopyPlugin([
    //   {
    //     from: './src/documents',
    //     to: './documents',
    //     ignore: ['*.js']
    //   }
    // ])
  ],
  externals: [ nodeExternals() ]
}
