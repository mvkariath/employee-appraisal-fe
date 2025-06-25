import { EndpointBuilder } from "@reduxjs/toolkit/query";
import baseApi from "../api";

// 1. Define the type for the data you send TO the server
export interface ChatbotRequestPayload {
  session_id: string;
  role: "developer" | "lead" | "hr";
  message: string;
}

// 2. Define the types for the data you receive FROM the server
interface ProjectState {
  delivery: string;
  accomplishments: string;
  approach: string;
  improvement: string;
  timeframe: string;
}

interface ConversationHistoryItem {
  role: "user" | "assistant";
  content: string;
}

interface FastAPIStateObject {
  messages: string;
  project: ProjectState;
  missing: string[];
  followup: string;
  conversation_history: ConversationHistoryItem[];
  state: string;
  role: string;
  intent: string;
}

export interface ChatbotResponse {
  final: FastAPIStateObject;
}

// 3. Inject the endpoint into your API
export const chatbotApi = baseApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    sendMessage: builder.mutation<ChatbotResponse, ChatbotRequestPayload>({
      // THE FIX: The 'payload' parameter is now explicitly typed.
      query: (payload: ChatbotRequestPayload) => ({
        url: "/chat",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

// 4. Export the auto-generated hook for use in your components
export const { useSendMessageMutation } = chatbotApi;
