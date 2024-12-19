export interface DataProcessor {
  process(data: any, ...args: any[]): any;
}