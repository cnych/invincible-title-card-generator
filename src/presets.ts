import type { EditorState } from "./types";

export const backgroundPresets = [
  {
    name: "default",
    value: "url('/backgrounds/blue.jpg') no-repeat center center / cover",
  },
  {
    name: "blue",
    value: "#169ee7",
  },
  {
    name: "yellow",
    value: "#eaed00",
  },
  {
    name: "red",
    value: "#e71616",
  },
  {
    name: "purple",
    value: "#a716e7",
  },
  {
    name: "black",
    value: "#000000",
  },
  {
    name: "white",
    value: "#ffffff",
  },
  {
    name: "orange",
    value: "#FFA500",
  },
  {
    name: "gray",
    value: "#808080",
  },
];

export const colorPresets = [
  {
    name: "default",
    value: "#eaed00",
  },
  {
    name: "blue",
    value: "#169ee7",
  },
  {
    name: "red",
    value: "#e71616",
  },
  {
    name: "purple",
    value: "#a716e7",
  },
  {
    name: "black",
    value: "#000000",
  },
  {
    name: "white",
    value: "#ffffff",
  },
  {
    name: "orange",
    value: "#FFA500",
  },
  {
    name: "gray",
    value: "#808080",
  },
];

export const effectPresets = [
  {
    name: "None",
    value: null,
  },
  {
    name: "Blood Splatter",
    value: "url('/effects/blood-splatter.png') no-repeat center center / cover",
  },
  {
    name: "Blood Splatter 2",
    value: "url('/effects/splatter-2.png') no-repeat center center / cover",
    opacity: 0.8,
  },
  {
    name: "Blood Splatter 3",
    value: "url('/effects/splatter-3.png') no-repeat center center / cover",
    opacity: 0.9,
  },
  {
    name: "????",
    value: "url('/effects/sus.png') no-repeat center center / cover",
    opacity: 0.8,
  },
];

export const themePresets: (Partial<EditorState> & { name: string })[] = [
  {
    name: "Invincible",
    background: "url('/backgrounds/blue.jpg') no-repeat center center / cover",
    color: "#eaed00",
  },
  {
    name: "Invinciboy",
    background: "url('/backgrounds/blue.jpg') no-repeat center center / cover",
    color: "#000000",
  },
  {
    name: "Atom Eve",
    background: "#eb607a",
    color: "#f3cad2",
  },
  {
    name: "Omni Man",
    background: "#e1ebed",
    color: "#ca4230",
  },
  {
    name: "Allen the Alien",
    background: "#3936ed",
    color: "#2bffe1",
  },
  {
    name: "Immortal",
    background: "#3c3d53",
    color: "#e8c856",
  },
  {
    name: "Oliver",
    background: "#9a004f",
    color: "#95b38e",
  },
];