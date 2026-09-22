import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the app with default values', () => {
  render(<App />);

  // Verifica que el título esté presente
  const titleElement = screen.getByText('Calculadora de Porcentajes');
  expect(titleElement).toBeInTheDocument();

  // Verifica que los campos de entrada y botones estén presentes
  const primerNumeroInput = screen.getByPlaceholderText('Primer Número');
  const segundoNumeroInput = screen.getByPlaceholderText('Segundo Número');
  const calcularButton = screen.getByTestId('btnCalcular');
  expect(primerNumeroInput).toBeInTheDocument();
  expect(segundoNumeroInput).toBeInTheDocument();
  expect(calcularButton).toBeInTheDocument();
});

test('calculates the result correctly', () => {
  render(<App />);

  // Ingresa valores en los campos de entrada
  const primerNumeroInput = screen.getByPlaceholderText('Primer Número');
  const segundoNumeroInput = screen.getByPlaceholderText('Segundo Número');
  const calcularButton = screen.getByTestId('btnCalcular');
  fireEvent.change(primerNumeroInput, { target: { value: '100' } });
  fireEvent.change(segundoNumeroInput, { target: { value: '20' } });
  fireEvent.click(calcularButton);

  // Verifica que el resultado se calcule correctamente
  const resultadoElement = screen.getByTestId('resultado');
  expect(resultadoElement).toHaveTextContent('Resultado: 20');

  // Verifica que la diferencia se calcule correctamente
  const diferenciaElement = screen.getByTestId('diferencia');
  expect(diferenciaElement).toHaveTextContent('Diferencia: 80');

  // Verifica que el porcentaje de cambio se calcule correctamente
  const porcentajeCambioElement = screen.getByTestId('porcentajeCambio');
  expect(porcentajeCambioElement).toHaveTextContent('Porcentaje de Cambio: 80');

});
