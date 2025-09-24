import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import App from '../App';
import { expect, test, describe, afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('Integration Tests - Duck Encyclopedia', () => {
  test('complete user flow: load ducks, view cards, and clear list', async () => {
    render(<App />);

    // 1. Verificar estado inicial
    expect(screen.getByText(/Enciclopedia de Patos/i)).toBeInTheDocument();
    expect(screen.getByText(/Haz clic en.*Cargar Patos/i)).toBeInTheDocument();
    expect(screen.queryByText(/Limpiar Lista/i)).not.toBeInTheDocument();

    // 2. Cargar patos
    const loadButton = screen.getByRole('button', { name: /Cargar Patos/i });
    fireEvent.click(loadButton);

    // 3. Verificar loading state
    expect(screen.getByText(/Buscando patos/i)).toBeInTheDocument();
    expect(loadButton).toBeDisabled();

    // 4. Esperar a que se carguen los patos
    await waitFor(
      () => {
        expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // 5. Verificar que se muestran múltiples patos
    expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
    expect(screen.getByText(/Pato Mandarín/i)).toBeInTheDocument();
    expect(screen.getByText(/Pato Real/i)).toBeInTheDocument();

    // 6. Verificar nombres científicos
    expect(screen.getByText(/Anas platyrhynchos/i)).toBeInTheDocument();
    expect(screen.getByText(/Aix galericulata/i)).toBeInTheDocument();

    // 7. Verificar que apareció el botón limpiar
    const clearButton = screen.getByText(/Limpiar Lista/i);
    expect(clearButton).toBeInTheDocument();

    // 8. Verificar que desaparece el mensaje de estado vacío
    expect(
      screen.queryByText(/Haz clic en.*Cargar Patos/i),
    ).not.toBeInTheDocument();

    // 9. Limpiar la lista
    fireEvent.click(clearButton);

    // 10. Verificar que vuelve al estado inicial
    expect(screen.queryByText(/Pato Mallard/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Limpiar Lista/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Haz clic en.*Cargar Patos/i)).toBeInTheDocument();
  });

  test('duck cards display complete information', async () => {
    render(<App />);

    // Cargar patos
    const loadButton = screen.getByRole('button', { name: /Cargar Patos/i });
    fireEvent.click(loadButton);

    // Esperar a que se carguen
    await waitFor(
      () => {
        expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Verificar que cada card tiene toda la información requerida
    const mallardCard = screen.getByText(/Pato Mallard/i).closest('.duck-card');
    expect(mallardCard).toBeInTheDocument();

    // Verificar elementos dentro de la card
    expect(screen.getByText(/Anas platyrhynchos/i)).toBeInTheDocument(); // Nombre científico
    expect(screen.getByText(/Lagos, estanques y ríos/i)).toBeInTheDocument(); // Hábitat
    expect(
      screen.getByText(/Es la especie de pato más común/i),
    ).toBeInTheDocument(); // Descripción

    // Verificar que hay imágenes
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('alt', 'Pato Mallard');
  });

  test('multiple load/clear cycles work correctly', async () => {
    render(<App />);

    // Primer ciclo
    fireEvent.click(screen.getByRole('button', { name: /Cargar Patos/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    fireEvent.click(screen.getByText(/Limpiar Lista/i));
    expect(screen.queryByText(/Pato Mallard/i)).not.toBeInTheDocument();

    // Segundo ciclo
    fireEvent.click(screen.getByRole('button', { name: /Cargar Patos/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Verificar que funciona correctamente
    expect(screen.getByText(/Limpiar Lista/i)).toBeInTheDocument();
  });

  test('loading state prevents multiple simultaneous requests', async () => {
    render(<App />);

    const loadButton = screen.getByRole('button', { name: /Cargar Patos/i });

    // Hacer click múltiples veces rápidamente
    fireEvent.click(loadButton);
    fireEvent.click(loadButton);
    fireEvent.click(loadButton);

    // El botón debe estar deshabilitado durante la carga
    expect(loadButton).toBeDisabled();
    expect(screen.getByText(/Buscando patos/i)).toBeInTheDocument();

    // Esperar a que termine la carga
    await waitFor(
      () => {
        expect(screen.getByText(/Pato Mallard/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // El botón debe volver a estar habilitado
    expect(loadButton).not.toBeDisabled();
  });
});
