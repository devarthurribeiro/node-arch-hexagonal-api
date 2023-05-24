import { Proposal } from "./Proposal";
import { Client } from "../../client/domain/Client";
import { Product } from "../../product/domain/Product";

describe("Proposal", () => {
  const client: Client = {
    id: "client_id",
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const products: Product[] = [
    {
      id: "product1",
      name: "Product 1",
      price: 10,
    },
    {
      id: "product2",
      name: "Product 2",
      price: 20,
    },
  ];

  const createAt = new Date();

  it("should create a Proposal instance", () => {
    const proposal = new Proposal({ client, products, createAt });

    expect(proposal).toBeInstanceOf(Proposal);
    expect(proposal.id).toBeTruthy();
    expect(proposal.client).toBe(client);
    expect(proposal.products).toBe(products);
    expect(proposal.createAt).toBe(createAt);
  });

  it("should calculate the total correctly", () => {
    const proposal = new Proposal({ client, products, createAt });

    expect(proposal.total).toBe(30);
  });

  it("should generate the email recipient text correctly", () => {
    const proposal = new Proposal({ client, products, createAt });

    const expectedText = `
    Olá John Doe, tudo bem?
    Você fez um pedido no dia 23/05/2023 
    no valor de R$30.00 e os produtos foram:
    Product 1
    Product 2
    `.replace(/^[ \t]+/gm, "").trim();

    expect(proposal.emailRecipientText()).toBe(expectedText);
  });
});
