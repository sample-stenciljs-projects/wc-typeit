import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from '@stencil/core';

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
  @Prop() sentences: string[];
  @Prop() loop: Loop = Loop.Infinite;

  @State() exitAnimation = false;

  @Event() animationStop: EventEmitter<void>;
  @Event() animationLoopEnd: EventEmitter<void>;

  @Method()
  public start() {
    return new Promise<string>((resolve, reject) => {
      if (this.exitAnimation) {
        this.exitAnimation = false;
        this.startAnimation();
        resolve('Animation has begun');
      } else {
        reject('Animation is already running');
      }
    });
  }

  @Method()
  public stop() {
    return new Promise<string>((resolve, reject) => {
      if (this.exitAnimation) {
        reject('Animation is already stopped');
      }
      this.hostReference.addEventListener(
        'animationStop',
        () => {
          resolve('Animation has stopped');
        },
        { once: true },
      );
      this.killAnimation();
    });
  }

  private hostReference: HTMLElement;
  private index = 0;

  get shouldRenderAnimation() {
    return this.sentences && this.sentences.length && this.sentences.every(sentence => !!sentence);
  }

  get isEndOfLoop() {
    return !(this.index % this.sentences.length);
  }

  componentDidLoad() {
    this.startAnimation();
  }

  private killAnimation() {
    this.exitAnimation = true;
  }

  private async startAnimation() {
    if (this.shouldRenderAnimation) {
      while (true) {
        let currentText =
          this.sentences[(this.index - 1) % this.sentences.length] || this.hostReference.innerText;
        let nextText = this.sentences[this.index % this.sentences.length];
        let matchingIndex = this.findMatchingIndex(currentText, nextText);

        await this.animate(currentText, nextText, matchingIndex);

        this.index += 1;

        if (this.isEndOfLoop) {
          this.animationLoopEnd.emit();
        }

        if (this.shouldEndAnimation()) {
          this.animationStop.emit();
          break;
        }
      }
    } else {
      throw new Error('Cannot initiate typewriting effect as the sentences are in invalid format!');
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

  private shouldEndAnimation() {
    return this.exitAnimation || (this.loop === Loop.Once && this.isEndOfLoop);
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
