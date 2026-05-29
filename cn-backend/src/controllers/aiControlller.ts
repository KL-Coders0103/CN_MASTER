import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  askAIService,
} from '../services/aiService';

export const chatAI =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        prompt,
      } = req.body;

      const stream =
        await askAIService(
          prompt
        );

      res.setHeader(
        'Content-Type',
        'text/plain'
      );

      let fullResponse =
  '';

for await (
  const chunk of stream
) {
  fullResponse +=
    chunk.message
      ?.content || '';
}

return res
  .status(200)
  .json({
    success: true,
    answer:
      fullResponse,
  });
    } catch (
      error
    ) {
      next(error);
    }
  };