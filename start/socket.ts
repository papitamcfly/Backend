
import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

const io = new Server(AdonisServer.instance!)

io.on('connection', (socket) => {
  console.log('A user connected', socket.id)

  socket.on('message', (data) => {
    console.log('Message received:', data)
    socket.broadcast.emit('message', data) // Emitir el mensaje a todos los clientes
  })

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id)
  })
})

export default io
