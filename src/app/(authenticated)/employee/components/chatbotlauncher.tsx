"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatBot from "./chatbot";

export default function ChatBotLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <Button
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg h-14 w-14 p-0 flex items-center justify-center"
        onClick={() => setOpen(true)}
        variant="secondary"
        style={{ borderRadius: "50%" }}
        aria-label="Open Chatbot"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>

      {/* Chatbot Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md fixed bottom-24 right-6 m-0 w-full max-w-xs"
          style={{ right: 24, bottom: 24, position: "fixed" }}
        >
          <ChatBot />
        </DialogContent>
      </Dialog>
    </>
  );
}