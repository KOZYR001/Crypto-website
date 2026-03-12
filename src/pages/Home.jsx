import { useEffect, useState } from "react";
import { fetchCryptos } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";

export const Home = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode ] = useState("grid");

    useEffect(() => {
        fetchCryptoData();
    }, []);

    const fetchCryptoData = async () => {
        try {
            const data = await fetchCryptos();
            setCryptoList(data);
        } catch (err) {
            console.error("Error feyching crypto: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">

            <div className="controls">
                <div className="filter-group">
                    <label>SOrt by:</label>
                    <select>
                        <option value="market_cap_rank">Rank</option>
                        <option value="name">Name</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                        <option value="change">24h Change</option>
                        <option value="market_cap">Market Cap</option>
                    </select>
                </div>
                <div className="view-toggle">
                    <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>Grid</button>
                    <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>List</button>
                </div>
            </div>

            {isLoading ? (
                <div className="loading">
                    <div className="spinner"/>
                    <p>Loading crypto data...</p>
                </div>
            ) : (
                <div className={`crypto-container ${viewMode}`}>
                    {cryptoList.map((crypto, key) => (
                        <CryptoCard crypto={crypto} key={key} />
                    ))}
                </div>
            )}
        </div>
    );
};