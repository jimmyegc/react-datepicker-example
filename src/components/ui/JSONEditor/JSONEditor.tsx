import React, { useState } from 'react';

const JSONEditor = () => {
  // Estado para manejar el JSON ingresado y componentsMock
  const [jsonInput, setJsonInput] = useState('');
  const [componentsMock, setComponentsMock] = useState('');

  // Manejar el cambio del texto en el área de texto
  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  // Manejar la validación y asignación del JSON
  const handleUpdateMock = () => {
    try {
      const parsedJSON = JSON.parse(jsonInput);
      const formattedJSON = `export const componentsMock = ${JSON.stringify(parsedJSON, null, 2)}`;
      setComponentsMock(formattedJSON);
      alert('componentsMock actualizado correctamente.');
    } catch (error) {
      alert('El texto ingresado no es un JSON válido. Por favor, verifica el formato.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Editor de componentsMock</h2>
      <textarea
        style={{ width: '100%', height: '150px', marginBottom: '10px' }}
        placeholder="Pega aquí el JSON para reemplazar componentsMock"
        value={jsonInput}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={handleUpdateMock} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Actualizar componentsMock
      </button>
      <h3>Valor actual de componentsMock:</h3>
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
        {componentsMock}
      </pre>
    </div>
  );
};

export default JSONEditor;
