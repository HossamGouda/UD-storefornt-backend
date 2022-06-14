import Product from './products.types';

type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: string;
  productId: string;
  products?: Product[];
};

export default OrderProduct;
