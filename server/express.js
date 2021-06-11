import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

//Import Model and Route BackEnd
import models from './models/index';
import routes from './routes/IndexRoute';

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json'

// 1. client-side 
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'
import Template from './../template'

//comment script dibawah before building for production
import devBundle from './devBundle'
// client-side : gunakan ketika development only

const app = express()

devBundle.compile(app)
// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());


const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use("/minipro/api/v1/test", (req, res) => {
    res.send("Hello MiniProject-Fullstack JS")
});

// #middleware
app.use(async (req, res, next) => {
    req.context = {models};
    next();
});

app.use('/api/users', routes.UsersRoute);
app.use('/api/tours_comments', routes.Tours_CommentsRoute);
app.use('/api/tours', routes.ToursRoute);
app.use('/api/tours_cart', routes.Tours_CartRoute);
app.use('/api/tours_images', routes.Tours_ImagesRoute);
app.use('/api/orders', routes.OrdersRoute);
app.use('/api/updown', routes.UploadDownloadRoute);
app.use('/api/line_items', routes.Line_ItemsRoute);

//api SWAGEER
app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use('/tr/swagger/:filename', (req,res)=>{
    res.sendFile(process.cwd() + "/server/swagger/" + req.params.filename)
})

// 2. Client-Side : ReactDOMServer.
app.get('/tr/*', (req, res) => {

    const context = {}
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <MainRouter />
      </StaticRouter>
    );
    if (context.url) {
      return res.redirect(303, context.url)
    }
  
    res.status(200).send(Template())
  });


// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app