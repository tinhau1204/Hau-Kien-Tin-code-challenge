
import { Currency } from "@/api/currency"

export const reduceDuplicates = (arr: Currency[]) => {
    const seenCurrencies = new Set<String>();
    return arr.filter((currency) => {
        if (seenCurrencies.has(currency.currency)) {
            return false;
        }
        seenCurrencies.add(currency.currency);
        return true;
    })
}