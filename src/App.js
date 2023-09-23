import React, { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({
    valorOriginal: "",
    segundoNumero: "",
    operacion: "porcentaje",
    resultado: "",
    diferencia: "",
    porcentajeCambio: "",
    idioma: "es",
  });

  const idiomas = {
    es: {
      primerNumeroPlaceholder: "Primer Número",
      segundoNumeroPlaceholder: "Segundo Número",
      porcentaje: "Porcentaje",
      aumentar: "Aumentar en %",
      disminuir: "Disminuir en %",
      calcular: "Calcular",
      resultado: "Resultado:",
      diferencia: "Diferencia:",
      porcentajeCambio: "Porcentaje de Cambio:",
      title: "Calculadora de Porcentajes"
    },
    en: {
      primerNumeroPlaceholder: "First Number",
      segundoNumeroPlaceholder: "Second Number",
      porcentaje: "Percentage",
      aumentar: "Increase by %",
      disminuir: "Decrease by %",
      calcular: "Calculate",
      resultado: "Result:",
      diferencia: "Difference:",
      porcentajeCambio: "Percentage Change:",
      title: "Percentage Calculator",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const calcularResultado = () => {
    const { valorOriginal, segundoNumero, operacion } = state;
    const original = parseFloat(valorOriginal);
    const num2 = parseFloat(segundoNumero);

    if (isNaN(original) || isNaN(num2)) {
      setState({
        ...state,
        resultado: "Error",
        diferencia: "Error",
        porcentajeCambio: "Error",
      });
      return;
    }

    let resultadoCalculado, diferenciaCalculada, porcentajeCalculado;

    switch (operacion) {
      case "porcentaje":
        resultadoCalculado = (original * num2) / 100;
        diferenciaCalculada = original - num2;
        porcentajeCalculado = ((original - num2) / original) * 100;
        break;
      case "aumentar":
        resultadoCalculado = original + (original * num2) / 100;
        diferenciaCalculada = original * (1 + num2 / 100) - original;
        porcentajeCalculado = num2;
        break;
      case "disminuir":
        resultadoCalculado = original - (original * num2) / 100;
        diferenciaCalculada = original * (1 - num2 / 100) - original;
        porcentajeCalculado = -num2;
        break;
      default:
        resultadoCalculado = "Error";
        diferenciaCalculada = "Error";
        porcentajeCalculado = "Error";
    }

    setState({
      ...state,
      resultado: resultadoCalculado.toFixed(2),
      diferencia: diferenciaCalculada.toFixed(2),
      porcentajeCambio: porcentajeCalculado.toFixed(2),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calcularResultado();
  };

  const { idioma, resultado, diferencia, porcentajeCambio } = state;
  const idiomaData = idiomas[idioma];

  return (
    <div className="container">
      <div className="header">
        <h1>{idiomaData.title}</h1>
        <div className="language-dropdown">
          <select name="idioma" onChange={handleChange} value={idioma}>
            {Object.keys(idiomas).map((lang) => (
              <option key={lang} value={lang}>
                {lang === "es" ? "Español" : "English"}
              </option>
            ))}
          </select>
          <span className="language-icon">{idioma === "es" ? "🇪🇸" : "🇬🇧"}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <input
            type="text"
            name="valorOriginal"
            placeholder={idiomaData.primerNumeroPlaceholder}
            value={state.valorOriginal}
            onChange={handleChange}
          />
          <select name="operacion" onChange={handleChange} value={state.operacion}>
            <option value="porcentaje">{idiomaData.porcentaje}</option>
            <option value="aumentar">{idiomaData.aumentar}</option>
            <option value="disminuir">{idiomaData.disminuir}</option>
          </select>
          <input
            type="text"
            name="segundoNumero"
            placeholder={idiomaData.segundoNumeroPlaceholder}
            value={state.segundoNumero}
            onChange={handleChange}
          />
          <button type="submit" data-testid="btnCalcular">
            {idiomaData.calcular}
          </button>
        </div>
      </form>
      <div className="result-container">
        <div className="result" data-testid="resultado">
          {idiomaData.resultado} {resultado}
        </div>
        <div className="result" data-testid="diferencia">
          {idiomaData.diferencia} {diferencia}
        </div>
        <div className="result" data-testid="porcentajeCambio">
          {idiomaData.porcentajeCambio} {porcentajeCambio}%
        </div>
      </div>
    </div>
  );
}

export default App;
