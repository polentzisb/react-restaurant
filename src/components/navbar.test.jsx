import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import NavbarMain from './navbar';

it('cierra la navegación móvil al cambiar de página y marca el enlace activo', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><NavbarMain /></MemoryRouter>);
  const toggle = screen.getByRole('button', { name: /Menú/ });
  await user.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await user.click(screen.getByRole('link', { name: 'Nuestro menú' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('link', { name: 'Nuestro menú' })).toHaveAttribute('aria-current', 'page');
});
