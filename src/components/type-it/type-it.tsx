import { Component, Host, Method, Prop, State, h } from '@stencil/core';

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

  // @Method()
  // public pause() {
  //   //this.killAnimation();
  // }

  // @Method()
  // public resume() {
  //   //this.killAnimation();
  // }

  @Method()
  public start() {
    if (this.exitAnimation) {
      this.exitAnimation = false;
      this.startAnimation();
    }
  }

  @Method()
  public stop() {
    this.killAnimation();
  }

  // @Watch('sentences')
  // reloadAnimation() {
  //   this.killAnimation();

  //   setTimeout(() => {
  //     this.startAnimation();
  //   });
  // }

  private hostReference: HTMLElement;
  private index = 0;

  get shouldRenderAnimation() {
    return this.sentences && this.sentences.length;
  }

  componentDidLoad() {
    if (this.shouldRenderAnimation) {
      this.startAnimation();
    }
  }

  private killAnimation() {
    this.exitAnimation = true;
  }

  private async startAnimation() {
    let sentences = [...(this.sentences || [])];
    sentences[-1] = this.hostReference.innerText;
    const length = sentences.length;

    for (; ; this.index++) {
      let currentText = sentences[(this.index - 1) % length] || '';
      let nextText = sentences[this.index % length];
      let matchingIndex = this.findMatchingIndex(currentText, nextText);

      await this.animate(currentText, nextText, matchingIndex);

      if (this.shouldExitAnimation()) {
        this.index += 1;
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
      }, 150);
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

  private shouldExitAnimation() {
    return (
      this.exitAnimation ||
      (this.loop === Loop.Once && this.index % length === this.sentences.length - 1)
    );
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
