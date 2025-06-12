export interface Role {
  getPermissions(): string[];
  isSameRole(role: string): boolean;
}

export type RoleType = 'admin' | 'user' | 'guest';