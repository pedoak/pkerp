// Retry configuration
const RETRY_COUNT = 3;
const RETRY_DELAY = 1000; // 1 second

export class APIError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'APIError';
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = RETRY_COUNT,
  delay = RETRY_DELAY
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
}

export const handleError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  
  if (error instanceof APIError) {
    throw error;
  }
  
  throw new APIError(
    'Ocorreu um erro ao conectar com o servidor. Por favor, tente novamente.',
    error
  );
};