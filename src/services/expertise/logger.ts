export const logError = (context: string, error: any) => {
  console.error(`${context} error:`, error);
  if (error.details || error.hint || error.code) {
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
  }
};

export const logSuccess = (context: string, data: any) => {
  console.log(`Successfully ${context}:`, data);
};

export const logOperation = (operation: string, details?: any) => {
  console.log(`${operation}${details ? ':' : ''}`, details || '');
};