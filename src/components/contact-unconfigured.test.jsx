import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, it, vi } from 'vitest';
vi.mock('../services/messages', () => ({ isContactConfigured: false, sendMessage: vi.fn() }));
import Contact from './contact';

it('informa que no hay envío disponible sin Firebase y desactiva el botón', () => {
  render(<MemoryRouter><Contact /></MemoryRouter>);
  expect(screen.getByRole('status')).toHaveTextContent('no está disponible');
  expect(screen.getByRole('button', { name: 'Enviar mensaje' })).toBeDisabled();
});
