import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import App from './App';
import { expect, test, afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
<<<<<<< HEAD
=======

test('renders duck encyclopedia title', () => {
  render(<App />);
  expect(screen.getByText(/Enciclopedia de Patos/i)).toBeInTheDocument();
});

test('shows load ducks button', () => {
  render(<App />);
  expect(
    screen.getByRole('button', { name: /Cargar Patos/i }),
  ).toBeInTheDocument();
});

test('loads ducks when button is clicked', async () => {
  render(<App />);
  const loadButton = screen.getByRole('button', { name: /Cargar Patos/i });

  fireEvent.click(loadButton);

  // Verificar que aparece el loading
  expect(screen.getByText(/Buscando patos/i)).toBeInTheDocument();

  // Esperar a que se carguen los patos
  await waitFor(
    () => {
      expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
    },
    { timeout: 2000 },
  );

  // Verificar que apareció el botón limpiar
  expect(screen.getByText(/Limpiar Lista/i)).toBeInTheDocument();
});
>>>>>>> 5c0175c7f90efd28459c5a411280c02afe301962
