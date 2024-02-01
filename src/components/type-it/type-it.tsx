import { Component, Prop, h } from '@stencil/core';

export enum Loop {
  Once = 'Once',
  Infinite = 'Infinite',
}

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() sentences: string[];
  @Prop() loop: Loop = Loop.Infinite;

  render() {
    return <div>Hello, World!</div>;
  }
}
