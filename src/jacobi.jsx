import React, { useState } from 'react';

function Jacobi() {
  const [ecuaciones, setEcuaciones] = useState([
    "10x1 -1x2 +2x3 +0x4 = 11",
    "-1x1 + 11x2 -1x3 +3x4 = 27",
    "2x1 -1x2 +10x3 -1x4 = 20",
    "0x1 +3x2 -1x3 +8x4 = -1"
  ]);
  const [matrix, setMatrix] = useState([]);
  const [resultMatrix, setResultMatrix] = useState([]); // Columna de resultados
  const [result, setResult] = useState("");
  const [initialGuess, setInitialGuess] = useState(""); // Valores iniciales
  const [numIterations, setNumIterations] = useState(5); // Número de iteraciones
  const [iterations, setIterations] = useState([]); // Resultados de iteraciones

  // Agregar una nueva ecuación vacía
  const addEcuacion = () => {
    setEcuaciones([...ecuaciones, ""]);
  };

  // Eliminar una ecuación por su índice
  const removeEcuacion = (index) => {
    const nuevasEcuaciones = ecuaciones.filter((_, i) => i !== index);
    setEcuaciones(nuevasEcuaciones);
  };

  // Procesar las ecuaciones para construir la matriz de coeficientes y resultados
  const generarMatriz = () => {
    const matrizCoeficientes = [];
    const resultados = [];

    ecuaciones.forEach(ecuacion => {
      const coeficientes = [];
      const regexCoeficientes = /([+-]?\d+)x\d+/g;
      let match;

      // Extraer los coeficientes
      while ((match = regexCoeficientes.exec(ecuacion)) !== null) {
        coeficientes.push(parseFloat(match[1]));
      }
      matrizCoeficientes.push(coeficientes);

      // Extraer el resultado (lado derecho de la ecuación)
      const resultadoMatch = ecuacion.match(/= ([+-]?\d+)/);
      resultados.push(resultadoMatch ? parseFloat(resultadoMatch[1]) : 0);
    });

    setMatrix(matrizCoeficientes);
    setResultMatrix(resultados);
    setIterations([]); // Resetear iteraciones al generar nueva matriz
    setResult(""); // Resetear resultado
  };

  // Organizar la matriz para intentar hacerla diagonal dominante
  const organizarParaDiagonalDominante = () => {
    const nuevaMatriz = [...matrix];
    const nuevaResultMatrix = [...resultMatrix];

    // Intentar reorganizar las filas para maximizar la dominancia diagonal
    nuevaMatriz.sort((a, b) => {
      const indexA = nuevaMatriz.indexOf(a);
      const indexB = nuevaMatriz.indexOf(b);
      const diagA = Math.abs(a[indexA]);
      const diagB = Math.abs(b[indexB]);
      return diagB - diagA;
    });

    // Reorganizar también la columna de resultados en el mismo orden
    const sortedResults = nuevaMatriz.map((row) => {
      const index = nuevaMatriz.indexOf(row);
      return nuevaResultMatrix[index];
    });

    setMatrix(nuevaMatriz);
    setResultMatrix(sortedResults);
    setIterations([]); // Resetear iteraciones al reorganizar matriz
    setResult(""); // Resetear resultado
  };

  // Verificar si la matriz es estrictamente dominante en la diagonal
  const checkDiagonalDominance = () => {
    if (matrix.length === 0) {
      setResult("Por favor, genera la matriz primero.");
      return;
    }

    for (let i = 0; i < matrix.length; i++) {
      const diagonalElement = Math.abs(matrix[i][i]);
      const sumRow = matrix[i].reduce((sum, value, j) => (i !== j ? sum + Math.abs(value) : sum), 0);

      if (diagonalElement <= sumRow) {
        setResult("La matriz NO es estrictamente dominante en la diagonal.");
        return;
      }
    }
    setResult("La matriz ES estrictamente dominante en la diagonal.");
  };

  // Ejecutar el Método de Jacobi
  const ejecutarJacobi = () => {
    if (matrix.length === 0) {
      setResult("Por favor, genera la matriz primero.");
      return;
    }

    // Procesar los valores iniciales
    const iniciales = initialGuess.split(',').map(num => parseFloat(num.trim()));
    if (iniciales.length !== matrix.length) {
      setResult("El número de valores iniciales no coincide con la dimensión de la matriz.");
      return;
    }

    // Inicializar variables
    let xPrev = [...iniciales];
    const xNext = Array(matrix.length).fill(0);
    const iteraciones = [];

    for (let k = 1; k <= numIterations; k++) {
      for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrix.length; j++) {
          if (j !== i) {
            sum += matrix[i][j] * xPrev[j];
          }
        }
        if (matrix[i][i] === 0) {
          setResult(`Error: División por cero en la fila ${i + 1}.`);
          return;
        }
        xNext[i] = (resultMatrix[i] - sum) / matrix[i][i];
      }

      // Guardar la iteración
      iteraciones.push({ iter: k, valores: [...xNext] });

      // Preparar para la siguiente iteración
      xPrev = [...xNext];
    }

    setIterations(iteraciones);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Ingresar ecuaciones para verificar dominancia diagonal</h2>

      {ecuaciones.map((ecuacion, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={ecuacion}
            onChange={(e) => {
              const nuevasEcuaciones = [...ecuaciones];
              nuevasEcuaciones[index] = e.target.value;
              setEcuaciones(nuevasEcuaciones);
            }}
            placeholder="Ej: 6x1 -1x2 -4x3 = 6"
            style={{ width: "400px", marginRight: "10px", padding: "5px" }}
          />
          <button onClick={() => removeEcuacion(index)} style={{ padding: "5px 10px" }}>-</button>
        </div>
      ))}

      <button onClick={addEcuacion} style={{ marginTop: "10px", marginBottom: "10px", padding: "5px 10px" }}>
        Añadir Ecuación
      </button>

      <br />

      <button onClick={generarMatriz} style={{ marginTop: "10px", marginRight: "10px", padding: "5px 10px" }}>
        Generar Matriz
      </button>

      <button onClick={organizarParaDiagonalDominante} style={{ marginTop: "10px", marginRight: "10px", padding: "5px 10px" }}>
        Organizar para Diagonal Dominante
      </button>

      <button onClick={checkDiagonalDominance} style={{ marginTop: "10px", padding: "5px 10px" }}>
        Verificar Dominancia Diagonal
      </button>

      <div style={{ marginTop: "30px" }}>
        <h3>Matriz de Coeficientes con Resultados</h3>
        {matrix.length > 0 ? (
          <div>
            {matrix.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                {row.map((value, j) => (
                  <input
                    key={`${i}-${j}`}
                    type="number"
                    value={value}
                    readOnly
                    style={{ width: "60px", textAlign: "center" }}
                  />
                ))}
                <span>=</span>
                <input
                  type="number"
                  value={resultMatrix[i]}
                  readOnly
                  style={{ width: "60px", textAlign: "center" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No se ha generado ninguna matriz.</p>
        )}
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Método de Jacobi</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Valores Iniciales (separados por comas):
          <input
            type="text"
            value={initialGuess}
            onChange={(e) => setInitialGuess(e.target.value)}
            placeholder="Ej: 0, 0, 0"
            style={{ width: "200px", marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Número de Iteraciones:
          <input
            type="number"
            value={numIterations}
            onChange={(e) => setNumIterations(parseInt(e.target.value) || 1)}
            min="1"
            style={{ width: "60px", marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      <button onClick={ejecutarJacobi} style={{ padding: "5px 10px", marginBottom: "20px" }}>
        Ejecutar Método de Jacobi
      </button>

      {iterations.length > 0 && (
        <div>
          <h3>Resultados de Iteraciones</h3>
          <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Iteración</th>
                {matrix.length > 0 && matrix[0].map((_, j) => (
                  <th key={j}>x{j + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {iterations.map((iter, index) => (
                <tr key={index}>
                  <td>{iter.iter}</td>
                  {iter.valores.map((val, j) => (
                    <td key={j}>{val.toFixed(4)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result && <p style={{ marginTop: "20px", fontWeight: "bold", color: "red" }}>{result}</p>}
    </div>
  );
}

export default Jacobi;
