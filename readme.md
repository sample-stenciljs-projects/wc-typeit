# Type It!

![](demo.gif)

A very intelligent typewriter efect web component which can loop through an array of sentences to render them as typewriter effect. It is smart enough to delete only necessessary characters instead of deleting all before rendering the next sentence.

## Installation

```shell

# with npm
npm i wc-typeit

# with yarn
yarn add wc-typeit

```

## Options

| Name        | Type                           | Default value   | Description                                                        |
| ----------- | ------------------------------ | --------------- | ------------------------------------------------------------------ |
| `sentences` | String[]                       | null            | Strings you want to shuffle between                                |
| `loop`      | 'Loop.Infinite' or 'Loop.Once' | 'Loop.Infinite' | Should it iterate through strings once or Infinite number of times |

## Methods

All methods need to be subscribed to to perform follow-up action

| Name    | Params | Description                                                             |
| ------- | ------ | ----------------------------------------------------------------------- |
| `start` | -      | Start the typewriter effect.                                            |
| `stop`  | -      | Stop the typewriter effect. It stops upon completing one sentence cycle |

## Slottable

This web component is slottable which means you can inject a starter text which should always be displayed on load and just once. It is totally optional.

## Usage

Just intall the package and start uning it as a custom web component

### Integration

```shell
import { Loop } from 'wc-typeit';
.
.
const sentences = ['This is wc-typeit', 'It is EASY to USE!', 'It is EASY to INTEGRATE!', 'It is EASY to STYLE!'];
.
.
<wc-typeit sentences={sentences} loop={Loop.Once}>
    Default text which shows up during loading...
</wc-typeit>
```

### Methods

One can get reference to the `wc-typeit` element and call start and stop methods on it

```shell
private ref: HTMLWcTypeitElement;
.
.
private async startAnimation() {
    try {
        await this.ref.start();
    }
    catch {
        console.error('Cannot start animation as it is already running');
    }
}

private async stopAnimation() {
    stopAnimation() {
    this.ref.stop().then(() => {
        // do your stuff once that round of animation stops
    }).catch(() => {
        console.error('Cannot stop animation as it is already stopped')
    })
  }
}
.
.
<wc-typeit sentences={sentences} loop={Loop.Once} ref={elem => this.ref = elem}>
    Default text which shows up during loading...
</wc-typeit>

```
