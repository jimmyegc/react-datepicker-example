import React, { useState } from "react";

const JsonConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const handleConvert = () => {
    try {
      setError(null); // Limpia errores previos
      const parsedInput = eval(`(${input})`); // Evalúa la entrada como objeto JavaScript
      setOutput(JSON.stringify(parsedInput, null, 2)); // Convierte a JSON y formatea
    } catch (err) {
      setError("La entrada no es válida. Por favor, revisa el formato.");
      setOutput("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Convertidor a JSON</h1>
      <textarea
        style={{
          width: "100%",
          height: "150px",
          marginBottom: "10px",
          fontFamily: "monospace",
        }}
        placeholder="Ingresa un objeto o texto aquí..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleConvert} style={{ marginBottom: "10px" }}>
        Convertir a JSON
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {output && (
        <div>
          <h2>Resultado:</h2>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsonConverter;
