export class User {
  email: string;
  key: string;

  constructor(attributes: { email?: string, key?: string }) {
    this.email = attributes.email;
    this.key = attributes.key;
  }
}