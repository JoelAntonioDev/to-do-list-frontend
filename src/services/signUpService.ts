interface SignUpResponse{
    message: string
}

export const SignUpRequest = async(formData: FormData): Promise<SignUpResponse> =>{
    try {
        const response = await fetch("http://localhost:3000/users/",{
            method:"POST",
            headers: {
                "Content-Type":"Application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.error || "Erro ao fazer cadastradar"); 
        }
        return data;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
}