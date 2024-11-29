import React, { useState } from "react";
import { evaluate } from "mathjs"; // Para evaluaciones dinámicas
import { InlineMath } from "react-katex"; // Para renderizar ecuaciones

const IntegralCalculator = () => {
  const [func, setFunc] = useState("x^4"); // Función matemática
  const [aValue, setAValue] = useState(0); // Límite inferior de integración
  const [bValue, setBValue] = useState(1); // Límite superior de integración
  const [nValue, setNValue] = useState(100); // Número de subintervalos
  const [result, setResult] = useState(null);

  const calculateIntegral = () => {
    const a = parseFloat(aValue); // Límite inferior
    const b = parseFloat(bValue); // Límite superior
    const n = parseInt(nValue); // Número de subintervalos

    // Función evaluadora
    const f = (val) => evaluate(func, { x: val });

    // Método de los trapecios para la integración numérica
    const h = (b - a) / n; // Longitud de cada subintervalo
    let integralResult = 0;

    // Sumar los términos del trapecio
    for (let i = 1; i < n; i++) {
      integralResult += f(a + i * h);
    }

    // Añadir los extremos (a y b)
    integralResult += (f(a) + f(b)) / 2;

    // Multiplicar por h para obtener la integral total
    integralResult *= h;

    setResult(integralResult);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Cálculo de Integrales Numéricas</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Función \(f(x)\):{" "}
          <input
            type="text"
            value={func}
            onChange={(e) => setFunc(e.target.value)}
            placeholder="Escribe la función (ej: x^4)"
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Límite inferior \(a\):{" "}
          <input
            type="number"
            value={aValue}
            onChange={(e) => setAValue(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Límite superior \(b\):{" "}
          <input
            type="number"
            value={bValue}
            onChange={(e) => setBValue(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Número de subintervalos (\(n\)):{" "}
          <input
            type="number"
            value={nValue}
            onChange={(e) => setNValue(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <button onClick={calculateIntegral}>Calcular Integral</button>
      {result !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultado</h3>
          <p>
            La integral de{" "}
            <InlineMath math={`f(x)`} /> desde{" "}
            <InlineMath math={`a = ${aValue}`} /> hasta{" "}
            <InlineMath math={`b = ${bValue}`} /> es aproximadamente: {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default IntegralCalculator;
