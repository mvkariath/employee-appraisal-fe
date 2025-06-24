import baseApi from "../api";

export interface ChatbotRequestPayload {
  session_id: string;
  role: "employee" | "lead" | "hr";
  message: string;
}

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

export const chatbotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatbotResponse, ChatbotRequestPayload>({
      query: (payload) => ({
        url: "/chat",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendMessageMutation } = chatbotApi;
