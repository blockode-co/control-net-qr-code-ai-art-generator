import React, { useState } from 'react';
import qrcode from 'qrcode';
import controlNetAI from 'control-net-qr-code-ai-art-generator';

function App() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [qrCodeArt, setQRCodeArt] = useState('');

  const generateQRCodeArt = async () => {
    try {
      const qrCodeBuffer = await qrcode.toBuffer(qrCodeData);
      const qrCodeBase64 = qrCodeBuffer.toString('base64');
      const generatedArt = await controlNetAI.generateArtFromImage(qrCodeBase64);
      setQRCodeArt(generatedArt);
    } catch (error) {
      console.error('Error generating QR code art:', error);
    }
  };

  return (
    <div>
      <h1>Control-Net QR Code AI Art Generator</h1>
      <div>
        <input
          type="text"
          value={qrCodeData}
          onChange={(e) => setQRCodeData(e.target.value)}
          placeholder="Enter QR code data"
        />
        <button onClick={generateQRCodeArt}>Generate Art</button>
      </div>
      {qrCodeArt && <img src={`data:image/png;base64,${qrCodeArt}`} alt="QR Code Art" />}
    </div>
  );
}

export default App;
