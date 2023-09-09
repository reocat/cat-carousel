"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../styles/fonts.css'
import '../styles/index.css'

export default function Home() {
  const [selectedValue, setSelectedValue] = useState('');
  const [colorValue, setColorValue] = useState('');

  useEffect(() => {
    const apiVal = Cookies.get('api_val');
    setSelectedValue(apiVal || '');

    const savedColor = Cookies.get('color');
    setColorValue(savedColor || '');
    document.body.style.backgroundColor = savedColor || ''; // Apply background color
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
    alert('Settings saved, nya~!\nCurrent settings: \n'  + 'API: ' + Cookies.get('api_val') + '\n' + 'Color: ' + Cookies.get('color'));
    document.location.href="/";
  };

  return (
    <div>
      <h1>Page Configurator</h1>
      <label htmlFor="apiSelect">Select API:</label>
      <br /> 
      <select id="apiSelect" value={selectedValue} onChange={handleSelectChange}>
        <option value="">-- Select --</option>
        <option value="catapi">The Cat API</option>
        <option value="shibe">Shibe API</option>
        <option value="animality">Animality API</option>
      </select>
      <br /> 
      <label htmlFor="colorPicker">Select Color:</label>
      <br /> 
      <input
        type="color"
        id="colorPicker"
        value={colorValue}
        onChange={handleColorChange}
      />
      <br /> 
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};



