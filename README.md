# node-red-contrib-bit2word

Node-RED node for converting an array of bits into a decimal word value.

The node reads `msg.payload` as an array where each position represents a bit.
Index `0` is treated as bit 0, index `1` as bit 1, and so on. Active bits are
summed using powers of two and the result is returned in `msg.payload`.

## Installation

From your Node-RED user directory, usually `~/.node-red`, install the package:

```bash
npm install node-red-contrib-bit2word
```

For local development from this repository:

```bash
cd ~/.node-red
npm install E:/dev/node-red-contrib-bit2word
```

Restart Node-RED after installation. The node appears in the `noobres`
category as `bit2word`.

## Input

Send an array in `msg.payload`.

Example:

```json
[true, false, true, false]
```

The array positions are interpreted as:

| Position | Bit | Value when active |
| --- | --- | --- |
| `0` | bit 0 | `1` |
| `1` | bit 1 | `2` |
| `2` | bit 2 | `4` |
| `3` | bit 3 | `8` |

For the input above, bits 0 and 2 are active, so the output is:

```json
5
```

## Output

The node sends the same message forward with:

- `msg.payload`: decimal value calculated from the active bits.
- `msg.topic.vBool`: input values converted with `Boolean(...)`.
- `msg.topic.vInt`: input values converted with `Number(...)`.

Example output for `[true, false, true, false]`:

```json
{
  "payload": 5,
  "topic": {
    "vBool": [true, false, true, false],
    "vInt": [1, 0, 1, 0]
  }
}
```

## Example Flow

Import this flow into Node-RED to test the node:

```json
[
  {
    "id": "inject-bit-array",
    "type": "inject",
    "z": "flow-bit2word",
    "name": "Bits 0 and 2 active",
    "props": [
      {
        "p": "payload"
      }
    ],
    "payload": "[true,false,true,false]",
    "payloadType": "json",
    "x": 180,
    "y": 120,
    "wires": [
      [
        "bit2word-node"
      ]
    ]
  },
  {
    "id": "bit2word-node",
    "type": "bit2word",
    "z": "flow-bit2word",
    "name": "bit2word",
    "x": 400,
    "y": 120,
    "wires": [
      [
        "debug-result"
      ]
    ]
  },
  {
    "id": "debug-result",
    "type": "debug",
    "z": "flow-bit2word",
    "name": "Resultado",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "targetType": "full",
    "x": 610,
    "y": 120,
    "wires": []
  }
]
```

## Behavior Notes

- The first item in the array is the least significant bit.
- The node currently uses JavaScript truthiness when calculating active bits.
  Values such as `true` and `1` are active; `false`, `0`, `null`, and empty
  strings are inactive.
- Prefer boolean or numeric arrays for predictable results.
- The package has no runtime dependencies.

## Package Structure

```text
bit2word.js    Runtime logic registered in Node-RED
bit2word.html  Node-RED editor UI and help text
package.json   Package metadata and Node-RED node mapping
README.md      Project documentation
```

## License

Apache-2.0
