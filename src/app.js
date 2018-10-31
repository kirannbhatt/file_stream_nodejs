import express from 'express'
import path from 'path'
import logger from 'morgan'
import createError from 'http-errors'
const app = express();

import router from './routes/apiRouter'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
console.log(__dirname)

app.use('/', router)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development'

  res.status(err.status || 500)
  res.render('error')
})


app.listen(3000, (err) => {
  if(err) console.log(err);
  console.log(`App running on localhost:${3000}`)
})
