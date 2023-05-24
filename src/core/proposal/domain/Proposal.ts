import { v4 } from "uuid";
import { Client } from "../../client/domain/Client";
import { Product } from "../../product/domain/Product";

export class Proposal {

  public id: string;
  public client: Client;
  public products: Product[];
  public createAt: Date;

  constructor(props: Omit<Proposal, "id" | "total" | "emailRecipientText">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = v4();
    }
  }

  get total() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  emailRecipientText(): string {
    const string = `Olá ${this.client.name}, tudo bem?
    Você fez um pedido no dia ${this.createAt.toLocaleDateString()} 
    no valor de R$${this.total.toFixed(2)} e os produtos foram:
    ${this.products.map(product => `1 - ${product.name} R$${product.price}`).join("\n")}`
    return string.replace(/^[ \t]+/gm, "");
  }
    
}