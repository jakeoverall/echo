let FooCache = require('memory-cache'),
  router = require('express').Router()

let EchoController = () => {
  return {
    get: (id) => {
      let foo = FooCache.get(id)
      return foo
    },
    post: (key, data) => {
      FooCache.put(key, data, 30000)
      return key
    }
  }
}
let echo = EchoController();
let baseUrl = `http://localhost:5000/api/echo/`

router.route('/:id?')
  .get((req, res) => {
    let code = echo.get(req.params.id)
    return res.send(code)
  })
  .post((req, res) => {
    console.log('req', req.body)
    echo.post(req.body.key, req.body.code)
    return res.send(baseUrl + req.body.key)
  })

module.exports = router;
