import React, { useState } from "react";
import { TextField, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { InlineMath } from "react-katex";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ReglaFalsaSimple() {
  // Estados
  const [funcion, setFuncion] = useState("sin(x) + 1"); // Función a resolver
  const [xn, setXn] = useState(1.5); // Valor inicial de x
  const [numIteraciones, setNumIteraciones] = useState(10); // Número de iteraciones
  const [resultados, setResultados] = useState([]); // Resultados de las iteraciones
  const [error, setError] = useState(""); // Mensaje de error
  const [graficoData, setGraficoData] = useState({}); // Datos para el gráfico

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
    const puntosX = [];
    const puntosY = [];
    let x = parseFloat(xn); // Valor inicial de x

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

      // Guardar iteración
      iteraciones.push({
        iteracion: i + 1,
        xn: x.toFixed(6), // Redondear xₙ
        fxn: fxn.toFixed(6), // Redondear f(xₙ)
      });

      // Agregar puntos para el gráfico
      puntosX.push(x);
      puntosY.push(fxn);

      // Actualizar xn (nuevo valor se asigna al anterior xn)
      x = fxn; // En esta versión, el valor de la función pasa a ser el nuevo xₙ
    }

    setResultados(iteraciones); // Guardar resultados

    // Actualizar los datos del gráfico
    setGraficoData({
      labels: puntosX,
      datasets: [
        {
          label: "f(x)",
          data: puntosY,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
          tension: 0.1,
        },
      ],
    });
  };

  // Renderizar interfaz
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h4" gutterBottom>
        Método de Regla Falsa - Simple
      </Typography>
      
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Ecuación (f(x))"
          value={funcion}
          onChange={(e) => setFuncion(e.target.value)}
          placeholder="Ej: x^3 - x - 2"
          fullWidth
          variant="outlined"
          style={{ marginBottom: "20px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <TextField
          label="Valor inicial (x₀)"
          type="number"
          value={xn}
          onChange={(e) => setXn(e.target.value)}
          variant="outlined"
          style={{ width: "150px" }}
        />
        <TextField
          label="Número de Iteraciones"
          type="number"
          value={numIteraciones}
          onChange={(e) => setNumIteraciones(e.target.value)}
          variant="outlined"
          style={{ width: "150px" }}
        />
      </div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <InlineMath>{funcion}</InlineMath>
      </div>
      
      <Button
        onClick={ejecutarReglaFalsa}
        variant="contained"
        color="primary"
        style={{ padding: "10px 20px", marginBottom: "20px" }}
      >
        Ejecutar Regla Falsa
      </Button>

      {error && (
        <Typography color="error" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}

      {/* Mostrar el gráfico */}
      {graficoData.labels && graficoData.labels.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Gráfico de f(x)</Typography>
          <Line data={graficoData} />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Resultados</Typography>
        {resultados.length > 0 ? (
          <Table style={{ marginTop: "10px", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>n</strong></TableCell>
                <TableCell><strong>xₙ</strong></TableCell>
                <TableCell><strong>f(xₙ)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultados.map((iter, index) => (
                <TableRow key={index}>
                  <TableCell>{iter.iteracion}</TableCell>
                  <TableCell>{iter.xn}</TableCell>
                  <TableCell>{iter.fxn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No hay resultados aún.</Typography>
        )}
      </div>
    </div>
  );
}

export default ReglaFalsaSimple;
