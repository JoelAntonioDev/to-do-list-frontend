export const guardarCookie = (nome: string, value: string, maxAgeInSeconds: number): void => {
    document.cookie = `${nome}=${value}; path=/; max-age=${maxAgeInSeconds}; secure; samesite=strict`;
};


export const obterCookie = (nome: string): string | null => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split("=");
        if (cookieKey === nome) {
            return cookieValue;
        }
    }
    return null;
};

export const removerCookie = (nome: string): void => {
    document.cookie = `${nome}=; path=/; max-age=0`;
};
