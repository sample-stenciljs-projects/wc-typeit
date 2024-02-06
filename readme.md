# TypeIt typewriter effect!

![](demo.gif)

A very intelligent typewriter efect web component which can loop through an array of sentences to render them as typewriter effect. It is smart enough to delete only necessessary characters instead of deleting all before rendering the next sentence.

## Installation

### Package manager

```shell

# with npm
npm i wc-typeit

# with yarn
yarn add wc-typeit

```

### CDN

```html
<script type="module" src="https://unpkg.com/wc-typeit@1.0.9/dist/wc-typeit/wc-typeit.esm.js"></script>
<script nomodule src="https://unpkg.com/wc-typeit@1.0.9/dist/wc-typeit/wc-typeit.js"></script>
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

## Events

| Event              | Type                | Description                                                |
| ------------------ | ------------------- | ---------------------------------------------------------- |
| `animationLoopEnd` | `CustomEvent<void>` | An event which is emitted once an animation loop completes |

## Slottable

This web component is slottable which means you can inject a starter text which should always be displayed on load and just once. It is totally optional.

## Usage

Just intall the package and start uning it as a custom web component

### Integration

```javascript
import { Loop } from 'wc-typeit';

const sentences = ['This is wc-typeit', 'It is EASY to USE!', 'It is EASY to INTEGRATE!', 'It is EASY to STYLE!'];

<wc-typeit sentences={sentences} loop={Loop.Once}>
    Default text which shows up during loading...
</wc-typeit>
```

### Methods

One can get reference to the `wc-typeit` element and call start and stop methods on it

```javascript
private ref: HTMLWcTypeitElement;

private async startAnimation() {
    this.ref.start().then(() => {
        // your custom logic
    }).catch(() => {
        console.error('Cannot start animation as it is already running');
    });
}

private async stopAnimation() {
    this.ref.stop().then(() => {
        // your custom logic
    }).catch(() => {
        console.error('Cannot stop animation as it is already stopped');
    });
}

<wc-typeit sentences={this.sentences} loop={Loop.Once} ref={elem => this.ref = elem}>
    Default text which shows up during loading...
</wc-typeit>
```

### Listeners

You can listen to `animationLoopEnd` method which fires whenever an animation loop showing all the sentences ends

```javascript
private handleAnimationLoopEnd() {
    // your custom logic
}

<wc-typeit sentences={sentences} loop={Loop.Once} animationLoopEnd={this.handleAnimationLoopEnd}>
    Default text which shows up during loading...
</wc-typeit>
```

## Styling

This web component has no nested elements except the text node itself which makes styling it as east as styling any other element.

```css
wc-typeit {
  color: maroon;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2rem;
  width: 300px;
}
```

One can change the cursor color by applying the following styles

```css
wc-typeit {
  --cursor-color: green !important;
}
```
