import { Component, Host, Method, Prop, State, Watch, h } from '@stencil/core';

export enum Loop {
  Once = 'Once',
  Infinite = 'Infinite',
}

@Component({
  tag: 'type-it',
  styleUrl: 'type-it.css',
  scoped: true,
})
export class MyComponent {
  @Prop() sentences?: string[];
  @Prop() loop: Loop = Loop.Infinite;

  @State() exitAnimation = false;

  @Method()
  public stop() {
    this.killAnimation();
  }

  @Method()
  public start() {
    this.exitAnimation = false;
    this.initializeAnimation();
  }

  @Watch('sentences')
  reloadAnimation() {
    this.killAnimation();

    setTimeout(() => {
      this.initializeAnimation();
    });
  }

  private hostReference: HTMLElement;
  private index = 0;

  get shouldRenderAnimation() {
    return this.sentences && this.sentences.length;
  }

  componentDidLoad() {
    if (this.shouldRenderAnimation) {
      this.initializeAnimation();
    }
  }

  private killAnimation() {
    this.exitAnimation = true;
  }

  private async initializeAnimation() {
    let sentences = [...(this.sentences || [])];
    sentences[-1] = this.hostReference.innerText;
    const length = sentences.length;

    for (; ; this.index++) {
      let currentText = sentences[(this.index - 1) % length] || '';
      let nextText = sentences[this.index % length];
      let matchingIndex = this.findMatchingIndex(currentText, nextText);

      await this.animate(currentText, nextText, matchingIndex);

      if (this.shouldExitAnimation()) {
        break;
      }
    }
  }

  private async animate(currentText: string, nextText: string, matchingIndex: number) {
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
        if (index === text.length || this.exitAnimation) {
          clearInterval(interval);
          setTimeout(() => {
            resolve();
          }, 500);
        } else {
          const newText = text.slice(0, index + 1);
          this.hostReference.innerText = newText;
          index += 1;
        }
      }, 150);
    });
  }

  private async deleteAnimation(text: string, matchingIndex: number) {
    return new Promise<void>(resolve => {
      let index = text.length;
      let interval = setInterval(() => {
        if (index === matchingIndex || this.exitAnimation) {
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

  private shouldExitAnimation() {
    return this.exitAnimation || (this.loop === Loop.Once && this.index % length === length - 1);
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
      <Host ref={el => (this.hostReference = el)}>
        <slot></slot>
      </Host>
    );
  }
}
