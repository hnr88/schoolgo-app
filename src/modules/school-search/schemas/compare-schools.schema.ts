import { z } from 'zod';

const idRegex = /^[a-z0-9]{1,32}$/i;

export const compareSchoolsQuerySchema = z.object({
  ids: z.string().transform((s, ctx) => {
    const arr = s
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
    if (arr.length === 0 || arr.length > 4) {
      ctx.addIssue({ code: 'custom', message: 'ids must contain 1-4 values' });
      return z.NEVER;
    }
    for (const id of arr) {
      if (!idRegex.test(id)) {
        ctx.addIssue({ code: 'custom', message: `invalid id: ${id}` });
        return z.NEVER;
      }
    }
    return arr;
  }),
});
