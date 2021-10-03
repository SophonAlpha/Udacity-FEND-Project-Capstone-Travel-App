module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFiles: ['dotenv/config'],
  testEnvironment: 'jsdom'
}
