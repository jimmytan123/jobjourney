import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChartsContainer from '../../src/components/ChartsContainer';
import styles from '../../src/components/ChartsContainer.module.css';

const data = [{ date: 'Jan 24', count: 3 }, { date: 'Feb 24', count: 5 }];
const activeClass = styles.active;
if (!activeClass) throw new Error('Missing active chart class');

describe('monthly application charts', () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const width = this.id === 'recharts_measurement_span' ? 40 : 800;
      const height = this.classList.contains('recharts-legend-wrapper')
        ? 20 : this.id === 'recharts_measurement_span' ? 16 : 350;
      return new DOMRect(0, 0, width, height);
    });
    vi.stubGlobal('ResizeObserver', class implements ResizeObserver {
      private readonly callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) { this.callback = callback; }
      observe(target: Element) {
        const size = [{ inlineSize: 800, blockSize: 350 }];
        this.callback([{
          target,
          contentRect: new DOMRect(0, 0, 800, 350),
          borderBoxSize: size,
          contentBoxSize: size,
          devicePixelContentBoxSize: size,
        }], this);
      }
      unobserve() {}
      disconnect() {}
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders application data in a bar chart and switches to an area chart', async () => {
    const { container } = render(<ChartsContainer data={data} />);
    await waitFor(() => expect(container.querySelectorAll('.recharts-bar-rectangle')).toHaveLength(2));
    expect(screen.getByText('Jan 24')).toBeInTheDocument();
    expect(screen.getByText('Feb 24')).toBeInTheDocument();

    await userEvent.setup().click(screen.getByRole('button', { name: 'Area Chart' }));
    await waitFor(() => expect(container.querySelector('.recharts-area')).toBeInTheDocument());
    expect(container.querySelector('.recharts-bar')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Area Chart' })).toHaveClass(activeClass);
  });
});
