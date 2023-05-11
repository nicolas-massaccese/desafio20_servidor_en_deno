import { addProductController, findProductController, listProductsController, updateProductController, deleteProductController } from "../controllers/products.ts";
import { Context, helpers } from "../deps.ts";

export const findProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const product = await findProductController(productId);

  if (!product) {
    ctx.response.status = 404;
    return;
  }

  ctx.response.body = product;
};

export const listProducts = async (ctx: Context) => {
  ctx.response.body = await listProductsController();
};

export const createProduct = async (ctx: Context) => {
  const { name, description, price, photo,  stock } = await ctx.request.body().value;
  const product = await addProductController({ name, description, price, photo, stock });
  ctx.response.body = product;
  ctx.response.status = 201;
};

export const updateProduct = async (ctx: Context) => {
  const { productId } = helpers.getQuery(ctx, { mergeParams: true });
  const productToUpdate = await findProductController(productId);

  if (!productToUpdate) {
    ctx.response.status = 404;
    return;
  }else {
    const { name, description, price, photo, stock } = await ctx.request.body().value;
    const updateData = {name:name, description:description, price:price, photo:photo, stock:stock };

    const updated = await updateProductController(productId, updateData);
    ctx.response.body = updated;
    ctx.response.status = 201;
  }
};  

export const deleteProduct = async (ctx: Context) => {
  const { _id } = await ctx.request.body().value;
  const deleted = await deleteProductController(_id);
  ctx.response.body = deleted;
  ctx.response.status = 201;
};