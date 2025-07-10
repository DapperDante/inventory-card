export abstract class Role {
  protected permissions: string[];
  protected name: RoleType;
  constructor(permissions: string[], name: RoleType){
    this.permissions = permissions;
    this.name = name;
  }
  getPermissions(): string[]{
    return this.permissions;
  }
  isSameRole(role: string): boolean{
    return role === this.name;
  }
}

export type RoleType = 'admin' | 'user' | 'guest' | 'auth';