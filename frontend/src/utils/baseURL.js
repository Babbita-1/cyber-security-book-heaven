const getBaseUrl = () => {
    if (import.meta.env.MODE === 'development') {
        return "http://localhost:5000";
    }
    return "https://book-store-backend-iota-sandy.vercel.app";
}

export default getBaseUrl;