export interface CRUD {
  create(data: any): Promise<any>;
  find(data: any): Promise<any>;
  update(data: any): Promise<any>;
  delete(data: any): Promise<any>;
}