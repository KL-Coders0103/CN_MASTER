import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error?.issues?.[0]?.message || 'Validation failed',
      });
    }
  };

export default validate;