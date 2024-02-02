import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './wc-typeit';

describe('wc-typeit', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: '<wc-typeit></wc-typeit>',
    });
    expect(root).toEqualHtml(`
      <wc-typeit>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </wc-typeit>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: `<wc-typeit first="Stencil" last="'Don't call me a framework' JS"></wc-typeit>`,
    });
    expect(root).toEqualHtml(`
      <wc-typeit first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </wc-typeit>
    `);
  });
});
