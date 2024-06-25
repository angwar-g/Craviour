import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'

// APP CONFIG
const app = express()
const port = 4000

//MIDDLEWARE
app.use(express.json())
app.use(cors())

// DB CONNECTION
connectDB()

// api endpoints
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)

// when we hit the '/' endpoint, we will get a response of 'API Working'
app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

// mongodb+srv://gangwaramishi:CXjiI4m5xj42clps@cluster0.yzgcltm.mongodb.net/?
