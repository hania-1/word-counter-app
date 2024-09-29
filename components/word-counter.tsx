"use client"; // Enables client-side rendering for this component
import React, { useState, useEffect, ChangeEvent } from "react"; // Import useState, useEffect, and ChangeEvent from React
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; // Import custom Card components
import { Textarea } from "@/components/ui/textarea"; // Import custom Textarea component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function WordCounter() {
  // State to manage the input text
  const [text, setText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const characterLimit = 500;

  // Load saved text from localStorage when the component mounts
  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // Function to handle text input changes and auto-save the text
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= characterLimit) {
      setText(newText);
      localStorage.setItem("savedText", newText); // Save the text in localStorage
    }
  };

  // Function to clear the input text and remove it from localStorage
  const clearText = () => {
    setText("");
    localStorage.removeItem("savedText"); // Remove saved text from localStorage
  };

  // Function to toggle dark and light modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Calculate word count
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;

  // Calculate character count
  const charCount = text.length;

  // Calculate sentence count
  const sentenceCount = text.split(/[.!?]/).filter((sentence) => sentence.trim().length > 0).length;

  // Calculate paragraph count
  const paragraphCount = text.split(/\n+/).filter((paragraph) => paragraph.trim().length > 0).length;

  // JSX return statement rendering the Word Counter UI
  return (
    <div className={`flex flex-col items-center justify-center h-screen gap-6 ${darkMode ? "bg-gray-900 text-white" : " text-black shadow-slate-700 bg-slate-500"}`}>
      <Card className="w-full max-w-md shadow-gray-500 bg-slate-300">
        <CardHeader className="text-center justify-center flex flex-col shadow-gray-500">
          <CardTitle>Text Analysis with Extra Features</CardTitle>
          <CardDescription className="border-t border-slate-200 pt-4">
            Enter text and see the word, character, sentence, and paragraph count. Your input will be automatically saved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4  border-t border-slate-200 pt-4">
          {/* Textarea for input text */}
          <Textarea
            id="text-input"
            placeholder="Enter your text here... (Max 500 characters)"
            className="h-32 resize-none border-zinc-900"
            value={text}
            onChange={handleTextChange}
          />
          {/* Display warning if character limit exceeded */}
          {charCount > characterLimit && (
            <div className="text-red-500 ">You have exceeded the 500 character limit!</div>
          )}
          {/* Display word, character, sentence, and paragraph count */}
          <div className="text-sm text-muted-foreground space-y-1">
            <div><span id="word-count">{wordCount}</span> words</div>
            <div><span id="char-count">{charCount}</span> characters</div>
            <div><span id="sentence-count">{sentenceCount}</span> sentences</div>
            <div><span id="paragraph-count">{paragraphCount}</span> paragraphs</div>
          </div>
          {/* Button to clear the input text */}
          <div className="flex items-center justify-between">
            <Button
              onClick={clearText}
              className="bg-red-500 hover:bg-red-700 text-white"
              style={{ transition: "background-color 0.3s ease" }}
            >
              Clear
            </Button>
            <Button
              onClick={toggleDarkMode}
              className="bg-blue-500 hover:bg-blue-700 text-white"
              style={{ transition: "background-color 0.3s ease" }}
            >
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
