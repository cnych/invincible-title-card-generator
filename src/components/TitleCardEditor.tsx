import React, { useRef, useState } from "react";
import type { EditorState } from "../types";
import { Preview } from "./Preview";
import { Toolbar } from "./Toolbar";
import { useRandomSound } from "../utils";

export default function TitleCardEditor() {
  useRandomSound(0.001); // Set random sound trigger probability

  const [state, setState] = useState<EditorState>({
    text: "Invincible",
    color: "#ebed00",
    showCredits: true,
    showWatermark: true,
    background: "url('/backgrounds/blue.jpg') no-repeat center center / cover",
    fontSize: 24,
    outline: 2,
    outlineColor: "black",
    effect: null,
    generating: false,
    smallSubtitle: "BASED ON THE COMIC BOOK BY",
    subtitle: "Robert Kirkman, Cory Walker, & Ryan Ottley",
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex md:flex-row flex-col min-h-[50vh] md:min-h-[70vh] md:h-[calc(100vh-140px)] p-2 md:p-6 gap-6">
      <Preview canvasRef={canvasRef} state={state} />
      <Toolbar canvasRef={canvasRef} state={state} setState={setState} />
    </div>
  );
}