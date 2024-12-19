import { AuditLog } from '../../types/security';
import { v4 as uuidv4 } from 'uuid';

export class AuditLogger {
  private static instance: AuditLogger;
  private logs: AuditLog[] = [];

  private constructor() {}

  static getInstance(): AuditLogger {
    if (!this.instance) {
      this.instance = new AuditLogger();
    }
    return this.instance;
  }

  logAction(userId: string, action: string, details: Record<string, any>): void {
    const log: AuditLog = {
      id: uuidv4(),
      userId,
      action,
      timestamp: new Date(),
      details,
      ipAddress: window.location.hostname
    };
    this.logs.push(log);
    console.log('Audit Log:', log);
  }

  getLogs(userId?: string): AuditLog[] {
    return userId 
      ? this.logs.filter(log => log.userId === userId)
      : this.logs;
  }
}