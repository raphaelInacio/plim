const Servico = require('./servico')

Servico.methods(['get', 'post'])

Servico.updateOptions({
  new: true,
  runValidators: true
})

module.exports = Servico