const express = require('express')
const app = express()
const port = 3000

const projectRoutes = require('./home')

app.use(express.static('public'))

app.use('/home', projectRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})