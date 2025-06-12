export interface CRUD {
  create(data: any): Promise<any>;
  find(id: number): Promise<any>;
  update(id: number, data: Partial<any>): Promise<any | null>;
  delete(id: number): Promise<void>;
}