import { v4 } from "uuid";

export class Client {

  public id: string;
  public name: string;
  public email: string;
  
  constructor(props: Omit<Client, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}