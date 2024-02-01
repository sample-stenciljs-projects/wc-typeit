import { Component, Prop, Watch, h } from '@stencil/core';

export enum Loop {
  Once = 'Once',
  Infinite = 'Infinite',
}

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  scoped: true,
})
export class MyComponent {
  @Prop() sentences: string[];
  @Prop() loop: Loop = Loop.Infinite;

  private hostReference: HTMLDivElement;

  get modifiedSentences() {
    let sentences = [...this.sentences];
    sentences[-1] = this.hostReference.innerText;

    return sentences;
  }

  componentWillLoad() {
    this.initializeAnimation();
  }

  @Watch('sentences')
  @Watch('loop')
  private initializeAnimation() {}

  private findMatchingIndex(currentText: string, nextText: string) {
    let index = 0;

    while (
      index < currentText.length &&
      index < nextText.length &&
      currentText[index] === nextText[index]
    ) {
      index += 1;
    }
    return index;
  }

  render() {
    return (
      <div ref={el => (this.hostReference = el)}>
        <slot></slot>
      </div>
    );
  }
}
