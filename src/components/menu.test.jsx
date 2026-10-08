import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Menu from './menu';

describe('Carta', () => {
  it('combina búsqueda y categoría, y permite recuperar la carta desde un resultado vacío', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Menu /></MemoryRouter>);
    expect(screen.getAllByRole('article')).toHaveLength(6);
    await user.click(screen.getByRole('button', { name: 'Bento boxes' }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
    await user.type(screen.getByRole('searchbox'), '  VEGGIE');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Bento Veggie' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Sushi rolls' }));
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Ver todos los platos' }));
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });
});
