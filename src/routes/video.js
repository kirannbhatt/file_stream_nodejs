import express from 'express'
import fs from 'fs'
const videoRouter = express.Router()

videoRouter.route('/')
  .get((req, res) => {
    const v_path = (__dirname + '/videos/sample.mp4')
    const stat = fs.statSync(v_path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1

      const chunkSize = (end - start) + 1
      const file = fs.createReadStream(v_path, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(v_path).pipe(res)

    }
  })

export default videoRouter;