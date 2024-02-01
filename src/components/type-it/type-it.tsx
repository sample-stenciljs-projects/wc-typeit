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
  private initializeAnimation() {
    const length = this.sentences.length;

    for (let index = 0; ; index++) {
      let currentText = this.modifiedSentences[(index - 1) % length] || '';
      let nextText = this.modifiedSentences[index % length];
      let matchingIndex = this.findMatchingIndex(currentText, nextText);

      this.animate(currentText, nextText, matchingIndex);

      if (this.loop === Loop.Once && index % length === length - 1) {
        break;
      }
    }
  }

  private animate(currentText: string, nextText: string, matchingIndex: number) {
    return new Promise<void>(async resolve => {
      await this.deleteAnimation(currentText, matchingIndex);
      await this.addAnimation(nextText, matchingIndex);
      resolve();
    });
  }

  private async addAnimation(text: string, matchingIndex: number) {
    return new Promise<void>(resolve => {
      let index = matchingIndex;
      let interval = setInterval(() => {
        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            resolve();
          }, 500);
        } else {
          const newText = text.slice(0, index + 1);
          this.hostReference.innerText = newText;
          index += 1;
        }
      }, 100);
    });
  }

  private async deleteAnimation(text: string, matchingIndex: number) {
    return new Promise<void>(resolve => {
      let index = text.length;
      let interval = setInterval(() => {
        if (index === matchingIndex) {
          clearInterval(interval);
          setTimeout(() => {
            resolve();
          }, 200);
        } else {
          const newText = text.slice(0, index - 1);
          this.hostReference.innerText = newText;
          index -= 1;
        }
      }, 100);
    });
  }

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
