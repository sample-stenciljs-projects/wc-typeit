import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './type-it';

describe('type-it', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: '<type-it></type-it>',
    });
    expect(root).toEqualHtml(`
      <type-it>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </type-it>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: `<type-it first="Stencil" last="'Don't call me a framework' JS"></type-it>`,
    });
    expect(root).toEqualHtml(`
      <type-it first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </type-it>
    `);
  });
});
