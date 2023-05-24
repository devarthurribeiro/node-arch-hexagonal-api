import { v4 } from "uuid";

export class Product {

  public id: string;
  public name: string;
  public price: number;
  public image?: string;
  
  constructor(props: Omit<Product, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }
}