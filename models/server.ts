import express, { Application } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as serverIo } from 'socket.io'
import { socketController } from '../sockets/controller'

class Server {
  private app: Application
  private port: string
  private server
  private io
  // private paths = {}

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8000'
    this.server = createServer(this.app)
    this.io = new serverIo(this.server)

    this.middlewares()
    this.routes()
    this.sockets()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Logs
    // this.app.use(morgan('dev'))

    // Carpeta pública
    this.app.use(express.static('public'))
  }

  routes() {
    // this.app.use(this.paths.usuarios, userRoutes)
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

export default Server
