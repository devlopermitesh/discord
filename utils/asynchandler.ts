import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from './apierror'

/**
 * Type for async route handler function
 */
type AsyncRouteHandler = (
  req: NextRequest,
  context?: { params: Record<string, string> }
) => Promise<NextResponse | Response>

/**
 * Wraps async route handlers with error handling
 *
 * @param fn - The async route handler function
 * @returns A wrapped handler with automatic error handling
 *
 * @example
 * export const GET = asyncHandler(async (req) => {
 *   const data = await fetchData();
 *   return NextResponse.json({ data });
 * });
 */
export const asyncHandler = (fn: AsyncRouteHandler) => {
  return async (
    req: NextRequest,
    context: { params: Promise<Record<string, string>> }
  ): Promise<NextResponse> => {
    try {
      const resolvedContext = {
        params: await context.params,
      }
      return (await fn(req, resolvedContext)) as NextResponse
    } catch (error) {
      console.error('Route handler error:', error)

      // Handle different error types
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
            ...(process.env.NODE_ENV === 'development' && {
              stack: error.stack,
            }),
          },
          { status: 500 }
        )
      }

      // Unknown error type
      return NextResponse.json(
        {
          success: false,
          error: 'An unexpected error occurred',
        },
        { status: 500 }
      )
    }
  }
}
