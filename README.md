# hyperswarm-capability

Produce a stream coupled capability for a key

```
npm install hyperswarm-capability
```

## Usage

``` js
const HyperswarmCapability = require('hyperswarm-capability')

const c = new HyperswarmCapability()
const key = Buffer.from('the key you want to use a shared secret')

const cap = c.generate(stream, key)

// send to other person

if (otherC.verify(stream, key, cap)) {
  // ok the stream has proven they know the key
}
```

## License

Apache-2.0
