import api from './api';

export const chatAIAPI =
  async (
    messages: any[]
  ) => {
    const response =
      await fetch(
        `${api.defaults.baseURL}/ai/chat`,
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body:
            JSON.stringify({
              messages,
            }),
        }
      );

    return response.json();
  };