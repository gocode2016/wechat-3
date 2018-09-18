'use strict'

const parseString = require('xml2js').parseString

exports.parseXmlAsync = function (xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, {
      trim: true
    }, function (err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

exports.formatMessage = function (result) {
  let message = {}
  if (typeof result === 'object') {
    const keys = Object.keys(result)
    for (let i = 0; i < keys.length; i++) {
      let v = keys[i]
      let value = result[v]
      if (!(value instanceof Array) || value.length === 0) continue
      if (value.length === 1) {
        const val = value[0]
        if (typeof val === 'object') {
          message[v] = formatMessage(val)
        } else {
          message[v] = (val || '').trim()
        }
      } else {
        message[v] = []
        value.forEach(v1 => {
          message[v].push(formatMessage(v1))
        })
      }
    }
  }
  return message
}