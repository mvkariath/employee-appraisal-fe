// file: components/ChatBot.tsx

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BotIcon } from "lucide-react";
import ChatUI from "./ChatUi"; // Corrected casing from ChatUi to ChatUI

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      {/* Using additional state to track z-index */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-black hover:bg-gray-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <BotIcon className="w-7 h-7" />
        </button>
      )}
      {/* Chat Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          // --- FIX & IMPROVEMENTS ---
          // 1. Added `flex flex-col` to make the dialog a vertical flex container.
          // 2. Set height to a more responsive value.
          // 3. Removed inline styles for cleaner TailwindCSS practice.
          className="flex bottom-6 flex-col h-[70vh]  w-full max-w-md bg-white rounded-lg shadow-lg"
        >
          {/* Use DialogHeader for better structure and accessibility */}
          <DialogHeader className="p-4 ">
            <DialogTitle className="flex items-center gap-2">
              <BotIcon className="w-5 h-5" />
              <span>AI Assistant</span>
            </DialogTitle>
          </DialogHeader>
          {/* This wrapper div will now correctly expand to fill the remaining space */}
          <div className="flex-10 ">
            <ChatUI />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
