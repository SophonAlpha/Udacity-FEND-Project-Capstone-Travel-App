// Import required packages.
const path = require('path')
const app = require(path.resolve(__dirname, 'app'))

// Set up and start our server.
const port = 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
