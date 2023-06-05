module.exports = {
  devServer: {
    port: 8000, // B 端
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
