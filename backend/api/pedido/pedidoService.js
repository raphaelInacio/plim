const Pedido = require('./pedido')

Pedido.methods(['get', 'post', 'put', 'delete'])

Pedido.updateOptions({
  new: true,
  runValidators: true
})

module.exports = Pedido