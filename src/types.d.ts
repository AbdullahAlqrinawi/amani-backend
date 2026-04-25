declare namespace Express {
  export interface Request {
    admin?: {
      email: string;
      role: 'ADMIN';
    };
  }
}