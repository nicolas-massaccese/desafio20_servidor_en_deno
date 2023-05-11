import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { mongoUri } from "../config/environment.ts";
import { MongoClient } from "../deps.ts";
import { Product, ProductToAdd } from "../types/products.ts";

const client = new MongoClient();

try {
  await client.connect(mongoUri);
  console.log("Connected to Mongo");
} catch (err) {
  console.error(err);
}

const db = client.database();
const productsCollection = db.collection<Product>("products");

export const listProductsController = async () => {
  const products = await productsCollection.find({}).toArray();
  return products;
};

export const addProductController = async (product: ProductToAdd) => {
  const _id = await productsCollection.insertOne(product)

  return {
    ...product,
    _id,
  };
};

export const findProductController = (productId: string) => {
  const result = productsCollection.findOne({ _id: new ObjectId(productId) });
  return result;
};

export const updateProductController = async (productId, newParams) => {

  const productToUpdate = {_id: new ObjectId(productId)};
  const update = {$set:{ name: newParams.name , description: newParams.description, price: newParams.price, photo: newParams.photo, stock: newParams.stock} };
  
  const updateData = await productsCollection.updateOne(productToUpdate, update);


  if( updateData.matchedCount == 1 && updateData.modifiedCount == 1 ){
    return {msg: `El producto ${productId} fue actualizado` };
  }else{
    return {error: `El producto ${productId} no fue actualizado` };
  }
};


export const deleteProductController = async (id) => {
  const productToDelete = await productsCollection.deleteOne({_id: new ObjectId(id) });
  if( productToDelete ){
    return {msg: `El producto ${id} fue eliminado` };
  }else{
    return {error: `El producto no fue eliminado` };
  }
};