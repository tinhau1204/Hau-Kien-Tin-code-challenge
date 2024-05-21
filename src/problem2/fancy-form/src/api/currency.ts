import { reduceDuplicates } from "@/common";
import axios from "axios";

export type Currency = {
    currency: string;
    date: string;
    price: number;
}

export const fetchCurrency = async () => {
    return await axios.get<Currency[]>(`https://interview.switcheo.com/prices.json`).then((res) => {
        return reduceDuplicates(res.data);
    });
    
}