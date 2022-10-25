import React from 'react';
import { render } from '@testing-library/react';

import { AppRootComponent } from './app-root.component';

test('renders learn react link', () => {
    const { getByText } = render(<AppRootComponent />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
