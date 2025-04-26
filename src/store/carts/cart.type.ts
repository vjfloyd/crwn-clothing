export enum CART_TYPES  {
    SET_CART_ITEMS = "cart/SET_CART_ITEMS",
    SET_CART_OPEN = "cart/SET_CART_OPEN",
}

export type CartItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}