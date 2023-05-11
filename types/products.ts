export type ProductToAdd = {
  name: string;
  description: string;
  price: number;
  photo: string;
  stock: number;
}

export type Product = ProductToAdd & {
  _id: { $oid: string },
};