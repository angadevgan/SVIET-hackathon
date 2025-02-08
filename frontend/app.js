import React, { useState } from 'react';

const CarbonAnalyzer = () => {
    const [url, setUrl] = useState('');
    const [carbonData, setCarbonData] = useState(null);
    const [optimized, setOptimized] = useState(false);

    const analyzeWebsite = async () => {
        const response = await fetch(`http://localhost:5000/analyze?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setCarbonData(data);
    };

    const optimizeWebsite = async () => {
        await fetch(`http://localhost:5000/optimize?url=${encodeURIComponent(url)}`);
        setOptimized(true);
    };

    return (
        <div className="p-4 max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold">CarbonLiteWeb Pro</h1>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL" className="border p-2 w-full my-2" />
            <button onClick={analyzeWebsite} className="bg-green-500 text-white p-2 rounded">Analyze</button>
            {carbonData && (
                <div className="text-left bg-gray-100 p-4 mt-4">
                    <pre>{JSON.stringify(carbonData, null, 2)}</pre>
                    <button onClick={optimizeWebsite} className="bg-blue-500 text-white p-2 rounded mt-2">Optimize</button>
                    {optimized && <p className="text-green-500 mt-2">Website optimized!</p>}
                </div>
            )}
        </div>
    );
};

export default CarbonAnalyzer;