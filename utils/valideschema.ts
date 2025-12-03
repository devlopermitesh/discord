import { ZodError, ZodType } from 'zod'

/**
 * Utility function to validate data against a Zod schema
 * @param schema - Zod schema to validate against
 * @param data - data to validate
 * @returns Parsed & validated data
 * @throws Error with formatted Zod validation issues
 */
function validateOrThrow<T>(schema: ZodType<T>, data: unknown): T {
  try {
    return schema.parse(data) // Will throw ZodError if invalid
  } catch (err) {
    if (err instanceof ZodError) {
      // Format errors nicely
      const formattedErrors = err.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      }))
      throw new Error(JSON.stringify(formattedErrors))
    }
    throw err // rethrow any unexpected errors
  }
}

export { validateOrThrow }
