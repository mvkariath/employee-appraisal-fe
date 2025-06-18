"use client";

import { useState } from "react";
import { useChat, type UseChatOptions } from "@ai-sdk/react";

import { cn } from "@/lib/utils";
import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MODELS = [
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B" },
  { id: "deepseek-r1-distill-llama-70b", name: "Deepseek R1 70B" },
];

type ChatUIProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export default function ChatUI(props: ChatUIProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    status,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <Chat
          className="h-full"
          messages={messages}
          handleSubmit={handleSubmit}
          input={input}
          handleInputChange={handleInputChange}
          isGenerating={isLoading}
          stop={stop}
          append={append}
          setMessages={setMessages}
          suggestions={[
            "Summarize this week's employee feedback",
            "List top 3 performers this appraisal cycle",
            "Explain how appraisal scores are calculated",
          ]}
        />
      </div>
    </div>
  );
}
