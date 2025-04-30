import React, { useState } from 'react';

export default function ColorInput(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [color, setColor] = useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <div className="w-10 h-10 shrink-0 rounded-xl cursor-pointer relative border-2 border-white/20 overflow-hidden">
      <input
        type="color"
        value={color}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
      />
      <div className="flex items-center justify-center h-full w-full">
        <i className="fas fa-palette text-white" />
      </div>
    </div>
  );
}