import connectDB from "./db/index.db.js";
import app from './app.js'

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port,(req,res) => {
        console.log(port);
    })
}).catch((err) => console.log(err)
)

