"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const [selectedValue, setSelectedValue] = useState('');
  const [colorValue, setColorValue] = useState('');

  useEffect(() => {
    const apiVal = Cookies.get('api_val');
    setSelectedValue(apiVal || '');

    const savedColor = Cookies.get('color');
    setColorValue(savedColor || '');
  }, []);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleColorChange = (event) => {
    setColorValue(event.target.value);
  };

  const handleSaveSettings = () => {
    Cookies.set('api_val', selectedValue);
    Cookies.set('color', colorValue);
    alert('Settings saved, nya~!');
    document.location.href="/";
  };

  return (
    <div>
      <h1>Page Configurator</h1>
      <label htmlFor="apiSelect">Select API:</label>
      <select id="apiSelect" value={selectedValue} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="catapi">The Cat API</option>
        <option value="shibe">Shibe API</option>
      </select>

      <label htmlFor="colorPicker">Select Color:</label>
      <input
        type="color"
        id="colorPicker"
        value={colorValue}
        onChange={handleColorChange}
      />

      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

