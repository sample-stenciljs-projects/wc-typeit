# Type It!

[](demo.gif)

A very intelligent typewriter efect plug-in which can loop through an array of sentences to render them as typewriter effect. It is smart enough to delete only necessessary characters instead of deleting all before rendering the next sentence.

## Installation

```shell

# with npm
npm i wc-typeit

# with yarn
yarn add wc-typeit

```

## Options

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| sentences | String[] | null | Strings you want to shuffle between |
| loop | 'Infinite' or 'Once' | 'Infinite' | Should it iterate through strings once or Infinite number of times |


## Methods

All methods need to be subscribed to to perform follow-up action

| Name | Params | Description |
| --- | --- | --- |
| start | - | Start the typewriter effect. |
| stop | - | Stop the typewriter effect. It stops upon completing one sentence cycle |

## Slottable

This component is slottable which means you can inject a starter text which should always be displayed on load and just once. It is totally optional.