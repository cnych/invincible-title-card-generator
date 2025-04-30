import React, { useRef } from 'react';

export default function ImageInput(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        props.onChange(`url('${result}') no-repeat center center / cover`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="w-10 h-10 shrink-0 rounded-xl cursor-pointer border-2 border-white/20 flex items-center justify-center"
      onClick={() => fileInputRef.current?.click()}
    >
      <i className="fas fa-image text-white" />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}