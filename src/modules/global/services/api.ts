export const makeApiCall = async (
   url: string,
   init?: RequestInit
) => {
    const response = await fetch(url, init);

    // Because of not having proper API :P
    if (init?.method === 'DELETE' || init?.method === 'PUT') {
        return null;
    }
    return response.json();
}
