import ollama from 'ollama';

export const askAIService =
  async (
    messages: any[]
  ) => {
    return ollama.chat({
      model:
        'qwen2.5:3b',

      stream: true,

      keep_alive:
        '30m',

      options: {
        num_ctx: 1024,
        temperature: 0.6,
      },

      messages: [
        {
          role:
            'system',

          content:
            `
      You are CN Master AI Mentor.

      Teach Computer Networks
      clearly and simply.

      Use:
      - short explanations
      - practical examples
      - beginner friendly language
      `,
        },

        ...messages,
      ],
    });
  };