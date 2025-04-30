import React from 'react';

export function CheckBox(props: {
  label: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <label className="ml-2 text-sm font-medium text-white">{props.label}</label>
    </div>
  );
}