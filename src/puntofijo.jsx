import React, { useState } from "react";

function MetodoPuntoFijo() {
  // Estados
  const [funciones, setFunciones] = useState([
    "(4x - 3) / (x^2 +2x)",      // Función original
    "3x + 2x^2 +3",            // Derivada de la función
    "- sqrt((4*x - 3) / (x + 2))",
    "(2x^2 +3)/ (4-x^2)",
  ]); // Lista de funciones
  const [xn, setXn] = useState(-3.5); // Valor inicial
  const [numIteraciones, setNumIteraciones] = useState(10); // Número de iteraciones
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(""); // Función elegida
  const [resultados, setResultados] = useState([]); // Resultados de las iteraciones
  const [error, setError] = useState(""); // Mensaje de error
  const [validas, setValidas] = useState([]); // Funciones que cumplen con el criterio
  const [a, setA] = useState(-4); // Valor de a para la validación
  const [b, setB] = useState(-3); // Valor de b para la validación

  // Función para traducir notación matemática a JavaScript
  const traducirFuncion = (expresion) => {
    return expresion
      .replace(/\^/g, "**") // Reemplazar potencias
      .replace(/sin\(/g, "Math.sin(") // Reemplazar sin por Math.sin
      .replace(/cos\(/g, "Math.cos(") // Reemplazar cos por Math.cos
      .replace(/tan\(/g, "Math.tan(") // Reemplazar tan por Math.tan
      .replace(/log\(/g, "Math.log(") // Reemplazar log por Math.log
      .replace(/sqrt\(/g, "Math.sqrt(") // Reemplazar sqrt por Math.sqrt
      .replace(/pi/g, "Math.PI") // Reemplazar pi por Math.PI
      .replace(/e/g, "Math.E"); // Reemplazar e por Math.E
  };

  // Función para evaluar una expresión matemática
  const evaluarFuncion = (expresion, x) => {
    try {
      const funcionTraducida = traducirFuncion(expresion);
      const radicando = (4 * x - 3) / (x + 2); // Calcular el radicando
  
      // Verificar si el denominador es cero o si el radicando es negativo
      if (x + 2 === 0) {
        setError("Error: División por cero en el denominador.");
        return NaN; // Retornar NaN si el denominador es cero
      }
      if (radicando < 0) {
        setError("Error: El radicando es negativo, no se puede calcular la raíz cuadrada.");
        return NaN; // Retornar NaN si el radicando es negativo
      }
  
      // Si la función es válida, devolver el resultado
      return new Function("x", `return ${funcionTraducida}`).call(null, x);
    } catch (err) {
      setError("Error: No se pudo evaluar la función.");
      return NaN; // En caso de que haya un error en la evaluación
    }
  };
  
  

  // Calcular el valor de la función en un punto x
  const calcularValor = (funcion, x) => {
    return evaluarFuncion(funcion, x);
  };

  // Validar funciones (Criterio: |g(b) - g(a)| / (b - a) < 1)
  const validarFunciones = () => {
    setError("");
    const validasTemp = funciones.filter((func) => {
      const g_a = calcularValor(func, a);
      const g_b = calcularValor(func, b);
      const cociente = Math.abs(g_b - g_a) / Math.abs(b - a);
      
      if (cociente >= 1) {
        return false; // No cumple el criterio de Lipschitz
      }
      return true; // Cumple el criterio de Lipschitz
    });

    setValidas(validasTemp);

    if (validasTemp.length === 0) {
      setError("Ninguna de las funciones ingresadas cumple con el criterio de convergencia.");
    }
  };

  // Método de punto fijo
  const ejecutarPuntoFijo = () => {
    if (!funcionSeleccionada) {
      setError("Debe seleccionar una función válida para continuar.");
      return;
    }

    setError("");
    const iteraciones = [];
    let x = parseFloat(xn);

    for (let i = 0; i < numIteraciones; i++) {
      const gx = evaluarFuncion(funcionSeleccionada, x);
      if (isNaN(gx)) {
        setError("Error: No se pudo evaluar la función durante las iteraciones.");
        return;
      }

      iteraciones.push({
        iteracion: i + 1,
        xn: x.toFixed(6),
        gx: gx.toFixed(6),
        error: Math.abs(gx - x).toFixed(6), // Cálculo del error
      });

      // Actualizar x para la siguiente iteración
      if (Math.abs(gx - x) < 1e-6) break; // Converge
      x = gx;
    }

    setResultados(iteraciones);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Método de Punto Fijo</h2>
      <div>
        <label>
          Funciones (separadas por coma):
          <input
            type="text"
            value={funciones.join(", ")}
            onChange={(e) => setFunciones(e.target.value.split(",").map((f) => f.trim()))}
            placeholder="Ej: cos(x), (x^2 + 4)/3"
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
          />
        </label>
        <button
          onClick={validarFunciones}
          style={{ marginLeft: "10px", padding: "10px 20px", cursor: "pointer" }}
        >
          Validar Funciones
        </button>
      </div>
      <div>
        <label>
          Valor de a:
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
        <label>
          Valor de b:
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          Valor inicial (x₀):
          <input
            type="number"
            value={xn}
            onChange={(e) => setXn(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
        <label>
          Número de Iteraciones:
          <input
            type="number"
            value={numIteraciones}
            onChange={(e) => setNumIteraciones(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
      </div>
      {validas.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Funciones Válidas</h3>
          <ul>
            {validas.map((func, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="funcion"
                    value={func}
                    onChange={(e) => setFuncionSeleccionada(e.target.value)}
                  />
                  {func}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={ejecutarPuntoFijo}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Ejecutar Punto Fijo
          </button>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      <div style={{ marginTop: "20px" }}>
        <h3>Resultados</h3>
        {resultados.length > 0 ? (
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>n</th>
                <th>xₙ</th>
                <th>g(xₙ)</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((iter, index) => (
                <tr key={index}>
                  <td>{iter.iteracion}</td>
                  <td>{iter.xn}</td>
                  <td>{iter.gx}</td>
                  <td>{iter.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay resultados aún.</p>
        )}
      </div>
    </div>
  );
}

export default MetodoPuntoFijo;
