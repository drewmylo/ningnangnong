import React, { useEffect, useRef } from 'react';
import Seo from '../../components/seo';

const SDPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let drawing = false;

    const drawInitialY = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      context.lineWidth = 1;
      context.lineCap = 'round';
      context.strokeStyle = 'black';

      context.beginPath();
      context.moveTo(centerX, centerY + 100);
      context.lineTo(centerX, centerY);
      context.moveTo(centerX - 50, centerY - 50);
      context.lineTo(centerX, centerY);
      context.moveTo(centerX + 50, centerY - 50);
      context.lineTo(centerX, centerY);
      context.moveTo(centerX - 50, centerY - 50);
      context.lineTo(centerX, centerY - 75);
      context.moveTo(centerX + 50, centerY - 50);
      context.lineTo(centerX, centerY - 75);
      context.stroke();
      context.closePath();
    };

    drawInitialY();

    const startDrawing = (e) => {
      context.beginPath();

      drawing = true;
      draw(e);
    };

    const endDrawing = () => {
      drawing = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!drawing) return;
      context.lineWidth = 1;
      context.lineCap = 'round';
      context.strokeStyle = 'black';

      context.lineTo(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop
      );
      context.stroke();
      context.beginPath();
      context.moveTo(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop
      );
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mousemove', draw);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export const Head = () => <Seo title="Learn To Draw" />;

export default SDPage;
