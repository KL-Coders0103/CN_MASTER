import api from './api';

export const chatAIAPI =
  async (
    prompt: string
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
              prompt,
            }),
        }
      );

    return response.json();
  };