'use client'
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const ModeSelector = () => {
  const [mode, setMode] = useState('classic');

  const modes = [
    { value: 'classic', label: 'Clásico' },
    { value: 'rivalries', label: 'Rivalidades' },
    { value: 'worldcup', label: 'Mundial' },
  ];

  return (
      <div>
          <Label>Selecciona un modo de juego:</Label>
          <RadioGroup value={mode} onValueChange={setMode}>
              {modes.map((m) => (
                  <div key={m.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={m.value} id={m.value} />
                      <Label htmlFor={m.value}>{m.label}</Label>
                  </div>
              ))}
          </RadioGroup>
      </div>
  );
};