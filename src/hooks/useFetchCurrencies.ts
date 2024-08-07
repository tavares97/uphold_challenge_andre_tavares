import upholdService, { Currency } from "../services/upholdService";
import { useEffect, useState } from "react";

const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currenciesData = await upholdService.getCurrencies();
        setCurrencies(currenciesData);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading };
};

export default useFetchCurrencies;
