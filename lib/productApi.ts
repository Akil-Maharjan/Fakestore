import { Product } from "@/types/prodcutTypes";

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
};