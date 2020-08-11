
const express = require('express')
const server = express()
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')


// configuring nunjucks -- Use for edit HTML arquives
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache:true,
})

// Change position statics files (CSS, scripts, images)
server
.use(express.static('public'))

// Configuração para receber o request.body
.use(express.urlencoded({ extended: true }))

// Configuring routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-Classes", saveClasses)

.listen(5500)