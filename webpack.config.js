module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/react-sortable.js',
    sourceMapFilename: './dist/react-sortable.map',
    library: 'ReactSortable',
    libraryTarget: 'umd'
  },
  externals: {
    'react/addons': 'React'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
