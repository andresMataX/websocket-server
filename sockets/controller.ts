import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export const socketController = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on('disconnect', () => {})

  socket.on('enviar-mensaje', (payload, callback) => {
    const id = 1234562

    callback({ id, fecha: new Date().getTime() })

    socket.broadcast.emit('enviar-mensaje', payload)
  })
}
