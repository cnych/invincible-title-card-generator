import React, { useState, useEffect } from "react";
import type { EditorState } from "../types";
import { CheckBox } from "./CheckBox";
import { Slider } from "./Slider";
import ColorInput from "./ColorInput";
import ImageInput from "./UploadImage";
import html2canvas from "html2canvas-pro";
import domtoimage from "dom-to-image";
import { useDeviceInfo } from "../utils";
import { backgroundPresets, colorPresets, effectPresets, themePresets } from "../presets";

const Preset = (props: {
  selected: boolean;
  value: string | null;
  onChange: (value: string | null) => void;
  name: string;
}) => {
  return (
    <button
      className={`w-10 shrink-0 aspect-square rounded-xl cursor-pointer hover:-translate-y-1 transition-all border-2 flex items-center justify-center ${props.selected ? "border-white" : "border-white/20"}`}
      style={{
        background: props.value || "",
      }}
      onClick={() => props.onChange(props.value)}
      title={props.name}
    >
      {!props.value && <span className="text-xl">🚫</span>}
    </button>
  );
};

export function Toolbar(props: {
  state: EditorState;
  setState: (state: EditorState) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { state, setState, canvasRef } = props;
  const device = useDeviceInfo();
  
  // 移动端折叠状态，默认折叠
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // 当屏幕尺寸变化时，重置展开状态
  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const download = async () => {
    if (!canvasRef.current) return;
    setState({ ...state, generating: true });
    const dataURL = await new Promise<string>((resolve) => {
      setTimeout(async () => {
        if (device.os === "ios" || device.browser === "safari") {
          const canvas = await html2canvas(canvasRef.current!, {
            allowTaint: true,
            useCORS: true,
            height: canvasRef.current!.clientHeight,
            width: canvasRef.current!.clientWidth,
            scale: 1,
          });
          resolve(canvas.toDataURL("image/png"));
        } else {
          const canvas = await domtoimage.toPng(canvasRef.current!, {
            height: canvasRef.current!.clientHeight,
            width: canvasRef.current!.clientWidth,
          });
          resolve(canvas);
        }
      }, 500);
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "title-card.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setState({ ...state, generating: false });
  };

  // 计算主工具栏内容的样式
  const toolbarContentClasses = `overflow-y-auto transition-all duration-300 ease-in-out ${
    isMobile ? (isExpanded ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0 overflow-hidden') : 'h-full opacity-100'
  }`;

  return (
    <div className="md:w-1/3 w-full md:h-full flex flex-col mt-4 md:mt-0">
      <div className="rounded-xl p-2 md:p-4 flex-grow overflow-hidden">
        {/* 移动端工具栏顶部控制区 */}
        <div className="flex justify-between items-center mb-2">
          <button
            className="button px-4 py-2 bg-blue-500 text-yellow-200 font-bold hover:bg-blue-600 rounded-lg cursor-pointer md:hidden"
            onClick={download}
          >
            Download
          </button>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse toolbar" : "Expand toolbar"}
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span className="ml-2">{isExpanded ? "Hide Options" : "Show Options"}</span>
          </button>
        </div>
        
        {/* 工具栏内容，在移动端会根据展开状态显示/隐藏 */}
        <div className={toolbarContentClasses}>
          <div className="mb-1">Preset Themes</div>
          <div className="flex gap-2 flex-wrap">
            {themePresets.map((preset) => (
              <button
                className="px-4 py-1 rounded-lg woodblock text-xl cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setState({ ...state, ...preset });
                }}
                style={{
                  background: preset.background,
                  color: preset.color,
                }}
                key={preset.name}
              >
                {preset.name}
              </button>
            ))}
          </div>
          
          <br />
          <input
            type="text"
            value={state.text}
            onChange={(e) => setState({ ...state, text: e.target.value })}
            className="input w-full"
            placeholder="Enter title text"
          />
          <input
            type="text"
            value={state.smallSubtitle}
            onChange={(e) =>
              setState({ ...state, smallSubtitle: e.target.value })
            }
            className="input w-full mt-2"
            placeholder="Subtitle 1"
          />
          <input
            type="text"
            value={state.subtitle}
            onChange={(e) => setState({ ...state, subtitle: e.target.value })}
            className="input w-full mt-2"
            placeholder="Subtitle 2"
          />
          <br />
          <br />
          <Slider
            label="Font Size"
            min={10}
            max={40}
            value={state.fontSize}
            onChange={(value) => setState({ ...state, fontSize: value })}
          />
          <Slider
            label="Outline Width"
            min={0}
            max={10}
            value={state.outline}
            onChange={(value) => setState({ ...state, outline: value })}
          />
          
          <div className="mt-4 mb-1">Background</div>
          <div className="flex gap-2 flex-wrap">
            {backgroundPresets.map((preset) => (
              <Preset
                key={preset.name}
                value={preset.value}
                selected={preset.value === state.background}
                onChange={(value) =>
                  setState({ ...state, background: value || "" })
                }
                name={preset.name}
              />
            ))}
            <ColorInput
              value={state.background}
              onChange={(value) => setState({ ...state, background: value })}
            />
            <ImageInput
              value={state.background}
              onChange={(value) => setState({ ...state, background: value })}
            />
          </div>
          <div className="mt-4 mb-1">Text Color</div>
          <div className="flex gap-2 flex-wrap">
            {colorPresets.map((preset) => (
              <Preset
                key={preset.name}
                value={preset.value}
                selected={preset.value === state.color}
                onChange={(value) => setState({ ...state, color: value || "" })}
                name={preset.name}
              />
            ))}
            <ColorInput
              value={state.color}
              onChange={(value) => setState({ ...state, color: value })}
            />
          </div>
          <div className="mt-4 mb-1">Effects</div>
          <div className="flex gap-2 flex-wrap">
            {effectPresets.map((preset) => (
              <Preset
                key={preset.name}
                value={preset.value}
                selected={preset.value === state.effect}
                onChange={(value) => setState({ ...state, effect: value })}
                name={preset.name}
              />
            ))}
          </div>
          <br />
          <div className="flex gap-2">
            <CheckBox
              label="Show Subtitle"
              value={state.showCredits}
              onChange={(value) => setState({ ...state, showCredits: value })}
            />
            <CheckBox
              label={
                <div className="group">
                  Show Watermark
                  <span className="group-hover:inline hidden ml-2">
                    {state.showWatermark ? "🥹" : "😞"} 👉🏻👈🏻
                  </span>
                </div>
              }
              value={state.showWatermark}
              onChange={(value) => setState({ ...state, showWatermark: value })}
            />
          </div>
          
          {/* 桌面端下载按钮 */}
          <button
            className="button mt-4 px-4 py-2 bg-blue-500 text-yellow-200 font-bold hover:bg-blue-600 rounded-lg cursor-pointer w-full md:w-auto hidden md:block"
            onClick={download}
          >
            Download Title Card
          </button>
        </div>
      </div>
    </div>
  );
}