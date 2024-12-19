export interface EncryptionConfig {
  algorithm: 'AES' | 'RSA';
  keySize: number;
  mode: 'CBC' | 'GCM';
}

export interface AccessControl {
  userId: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
  lastAccess: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  details: Record<string, any>;
  ipAddress: string;
}