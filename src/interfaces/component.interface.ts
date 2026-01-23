export interface Component {
  connect(): void;
  healthCheck(): Promise<boolean>;
  get component(): any;
}