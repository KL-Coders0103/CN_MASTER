import * as SecureStore
  from 'expo-secure-store';

const AI_CHAT_KEY =
  'cnmaster_ai_chat';

export const saveAIChat =
  async (
    messages: any[]
  ) => {
    await SecureStore.setItemAsync(
      AI_CHAT_KEY,
      JSON.stringify(
        messages
      )
    );
  };

export const getAIChat =
  async () => {
    const data =
      await SecureStore.getItemAsync(
        AI_CHAT_KEY
      );

    return data
      ? JSON.parse(
          data
        )
      : [];
  };

export const clearAIChat =
  async () => {
    await SecureStore.deleteItemAsync(
      AI_CHAT_KEY
    );
  };