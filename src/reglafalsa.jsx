import React, { useState } from "react";

function ReglaFalsaSimple() {
  // Estados
  const [funcion, setFuncion] = useState("sin(x) +1"); // Función a resolver
  const [xn, setXn] = useState(1.5); // Valor inicial de x
  const [numIteraciones, setNumIteraciones] = useState(10); // Número de iteraciones
  const [resultados, setResultados] = useState([]); // Resultados de las iteraciones
  const [error, setError] = useState(""); // Mensaje de error

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

  // Función para evaluar la expresión matemática
  const evaluarFuncion = (expresion, x) => {
    try {
      const funcionTraducida = traducirFuncion(expresion);
      console.log(`return ${funcionTraducida}`)
      console.log(Function("x", `return ${funcionTraducida}`).call(null, x))
      return new Function("x", `return ${funcionTraducida}`).call(null, x);
    } catch (err) {
      setError("Error al evaluar la función");
      return NaN;
    }
  };

  // Método de Regla Falsa
  const ejecutarReglaFalsa = () => {
    setError(""); // Limpiar errores previos
    const iteraciones = [];
    let x = parseFloat(xn); // Valor inicial de x
    console.log(funcion)
    // Validar que el valor inicial sea válido
    const fx = evaluarFuncion(funcion, x);
    if (isNaN(fx)) {
      setError("Error: No se pudo evaluar la función en el valor inicial.");
      return;
    }

    // Realizar iteraciones del método de regla falsa
    for (let i = 0; i < numIteraciones; i++) {
      const fxn = evaluarFuncion(funcion, x);
      if (isNaN(fxn)) {
        setError("Error: Evaluación inválida durante las iteraciones.");
        return;
      }

      console.log({
        iteracion: i + 1,
        xn: x.toFixed(6), // Redondear xₙ
        fxn: fxn.toFixed(6), // Redondear f(xₙ)
      })
      // Guardar iteración
      iteraciones.push({
        iteracion: i + 1,
        xn: x.toFixed(6), // Redondear xₙ
        fxn: fxn.toFixed(6), // Redondear f(xₙ)
      });

      // Actualizar xn (nuevo valor se asigna al anterior xn)
      x = fxn; // En esta versión, el valor de la función pasa a ser el nuevo xₙ
    }

    setResultados(iteraciones); // Guardar resultados
  };

  // Renderizar interfaz
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Método de Regla Falsa - Simple</h2>
      <div>
        <label>
          Ecuación (f(x)):
          <input
            type="text"
            value={funcion}
            onChange={(e) => setFuncion(e.target.value)}
            placeholder="Ej: x^3 - x - 2"
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
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
        <button
          onClick={ejecutarReglaFalsa}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Ejecutar Regla Falsa
        </button>
      </div>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
      )}
      <div style={{ marginTop: "20px" }}>
        <h3>Resultados</h3>
        {resultados.length > 0 ? (
          <table
            border="1"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>n</th>
                <th>xₙ</th>
                <th>f(xₙ)</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((iter, index) => (
                <tr key={index}>
                  <td>{iter.iteracion}</td>
                  <td>{iter.xn}</td>
                  <td>{iter.fxn}</td>
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

export default ReglaFalsaSimple;
