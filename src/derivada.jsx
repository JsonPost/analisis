import React, { useState } from "react";
import { derivative, evaluate } from "mathjs"; // Para derivadas simbólicas y evaluaciones dinámicas

const DerivativeCalculator = () => {
  const [func, setFunc] = useState("x^4"); // Función matemática
  const [xValue, setXValue] = useState(0); // Punto donde calcular
  const [hValue, setHValue] = useState(0.01); // Incremento h
  const [order, setOrder] = useState(1); // Orden de la derivada
  const [result, setResult] = useState(null);

  const calculateDerivative = () => {
    const x = parseFloat(xValue);
    const h = parseFloat(hValue);
    const n = parseInt(order);

    // Función evaluadora
    const f = (val) => evaluate(func, { x: val });

    // Construcción dinámica de la derivada numérica
    let derivativeResult = 0;
    for (let i = 0; i <= n; i++) {
      // Coeficiente del término (se basa en el binomio generalizado)
      const coefficient = Math.pow(-1, i) * binomial(n, i);
      derivativeResult += coefficient * f(x + i * h);
    }

    derivativeResult /= Math.pow(h, n); // Dividir entre h^n
    setResult(derivativeResult);
  };

  // Función para calcular coeficientes binomiales
  const binomial = (n, k) => {
    if (k === 0 || k === n) return 1;
    return binomial(n - 1, k - 1) + binomial(n - 1, k);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Cálculo de Derivadas Numéricas</h2>
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
          Punto \(x\):{" "}
          <input
            type="number"
            value={xValue}
            onChange={(e) => setXValue(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Incremento \(h\):{" "}
          <input
            type="number"
            value={hValue}
            onChange={(e) => setHValue(e.target.value)}
            step="0.001"
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Orden de la derivada (\(n\)):{" "}
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <button onClick={calculateDerivative}>Calcular Derivada</button>
      {result !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultado</h3>
          <p>
            La derivada de orden {order} en \(x = {xValue}\) es aproximadamente: {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default DerivativeCalculator;
