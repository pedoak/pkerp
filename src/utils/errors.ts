export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export const handleDatabaseError = (error: any): never => {
  console.error('Database error:', error);
  throw new DatabaseError('Erro ao acessar o banco de dados');
};