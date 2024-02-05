# Type It!

This is a starter project for building a standalone Web Component using Stencil.

Stencil is also great for building entire apps. For that, use the [stencil-app-starter](https://github.com/ionic-team/stencil-app-starter) instead.

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
| loop | 'Infinite' | 'Once' | 'Infinite' | Should it iterate through strings once or Infinite number of times |


## Methods

All methods need to be subscribed to to perform follow-up action

| Name | Params | Description |
| --- | --- | --- |
| start | - | Start the typewriter effect. |
| stop | - | Stop the typewriter effect. It stops upon completing one sentence cycle |