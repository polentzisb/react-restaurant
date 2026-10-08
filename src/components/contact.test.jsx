import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../services/messages', () => ({ isContactConfigured: true, sendMessage: vi.fn() }));
import { sendMessage } from '../services/messages';
import Contact from './contact';

async function completeForm(user) {
  await user.type(screen.getByLabelText('Tu nombre'), 'Ana');
  await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com');
  await user.type(screen.getByLabelText('Tu mensaje'), 'Hola, quisiera consultar por un bento.');
}

beforeEach(() => { sendMessage.mockReset(); });

describe('Contacto', () => {
  it('no envía campos vacíos ni correos inválidos', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Contact /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(sendMessage).not.toHaveBeenCalled();
    await completeForm(user);
    await user.clear(screen.getByLabelText('Correo electrónico'));
    await user.type(screen.getByLabelText('Correo electrónico'), 'correo-invalido');
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('rechaza campos compuestos solamente por espacios', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Contact /></MemoryRouter>);
    await completeForm(user);
    await user.clear(screen.getByLabelText('Tu nombre'));
    await user.type(screen.getByLabelText('Tu nombre'), '   ');
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Completa todos los campos');
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('evita envíos duplicados y limpia el formulario solo tras el éxito', async () => {
    let resolve;
    sendMessage.mockImplementation(() => new Promise((done) => { resolve = done; }));
    const user = userEvent.setup();
    render(<MemoryRouter><Contact /></MemoryRouter>);
    await completeForm(user);
    await user.dblClick(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Enviando…' })).toBeDisabled();
    expect(screen.getByLabelText('Tu nombre')).toBeDisabled();
    resolve();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('¡Mensaje enviado!'));
    expect(screen.getByLabelText('Tu nombre')).toHaveValue('');
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('');
    expect(screen.getByLabelText('Tu mensaje')).toHaveValue('');
  });

  it('conserva los datos y permite reintentar después de un fallo', async () => {
    sendMessage.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<MemoryRouter><Contact /></MemoryRouter>);
    await completeForm(user);
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('No pudimos enviar');
    expect(screen.getByLabelText('Tu nombre')).toHaveValue('Ana');
    expect(screen.getByRole('button', { name: 'Enviar mensaje' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    expect(await screen.findByRole('status')).toHaveTextContent('¡Mensaje enviado!');
    expect(sendMessage).toHaveBeenCalledTimes(2);
  });

  it('precarga la consulta por el plato seleccionado', () => {
    render(<MemoryRouter initialEntries={[{ pathname: '/contact', state: { dish: 'Bento House' } }]}><Contact /></MemoryRouter>);
    expect(screen.getByLabelText('Tu mensaje')).toHaveValue('Hola, me gustaría consultar por Bento House.');
  });
});
