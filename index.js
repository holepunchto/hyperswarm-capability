const sodium = require('sodium-universal')
const crypto = require('hypercore-crypto')
const b4a = require('b4a')

const [NS] = crypto.namespace('hyperswarm-capability', 1)
const IS_INITIATOR = b4a.from([1])
const IS_RESPONDER = b4a.from([0])

module.exports = class HyperswarmCapability {
  constructor (ns = NS) {
    this.ns = ns
  }

  verify (stream, key, capability) {
    return b4a.equals(this.capability(!stream.isInitiator, key, stream.handshakeHash), capability)
  }

  generate (stream, key) {
    return this.capability(stream.isInitiator, key, stream.handshakeHash)
  }

  capability (isInitiator, key, handshakeHash) {
    if (!handshakeHash) throw new Error('Cannot generate a capability without a handshake hash')
    const out = b4a.allocUnsafe(32)
    sodium.crypto_generichash_batch(out, [this.ns, isInitiator ? IS_INITIATOR : IS_RESPONDER, key], handshakeHash)
    return out
  }
}
