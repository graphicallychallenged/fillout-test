import { render } from '@testing-library/react';
import { Icon, ICONS, type IconName } from '../Icons';

describe('ICONS list', () => {
  it('should be an array of icon names', () => {
    expect(Array.isArray(ICONS)).toBe(true);
    expect(ICONS.length).toBeGreaterThan(0);
  });

  it('should include some expected icon names', () => {
    expect(ICONS).toContain('info');
    expect(ICONS).toContain('plus');
    expect(ICONS).toContain('trash');
  });

  it('should contain only valid IconName entries', () => {
    ICONS.forEach(name => {
      // @ts-expect-error if name isn't a valid IconName, TS will complain here
      const _n: IconName = name;
    });
  });
});

describe('Icon component', () => {
  it('renders an SVG for every icon name', () => {
    ICONS.forEach(name => {
      const { container } = render(
        <Icon name={name as IconName} data-testid={`icon-${name}`} />
      );
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      // basic sanity: viewBox should be "0 0 24 24"
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  it('applies className down to the <svg> element', () => {
    const { getByTestId } = render(
      <Icon name="info" className="my-fun-class" data-testid="icon-info" />
    );
    const svg = getByTestId('icon-info');
    expect(svg).toHaveClass('my-fun-class');
  });
});
