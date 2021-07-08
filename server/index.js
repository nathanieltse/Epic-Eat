const express = require('express')
const cors = require('cors')
const app = express()
const categoryRoute = require('./routes/categorys')

require('dotenv').config()

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/api',categoryRoute)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})