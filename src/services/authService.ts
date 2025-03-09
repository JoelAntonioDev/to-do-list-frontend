// Definição do tipo da resposta esperada
interface LoginResponse {
    message: string;
    token: string;
    email: string;
}

export const loginRequest = async (
    email: string,
    senha: string
): Promise<LoginResponse> => {
    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Erro ao fazer login"); 
        }

        return data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};
