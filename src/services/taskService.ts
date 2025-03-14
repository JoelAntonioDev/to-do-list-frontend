import { obterCookie } from "../utils/Cookies";

interface taskResponse {
    task_id: number;
    titulo: string;
    descricao: string;
    status: string;
    data_criacao: string;
}
interface Arquivo {
    file_id: number;
    file_path: string;
    file_name: string,
    file_extension: string,
    data_criacao: string,
    task_id: number,    
    file_url: string;
}

interface NovaTarefa {
    titulo: string;
    descricao: string;
    status: string
}

// Função para listar as tarefas
export const listarTarefa = async (): Promise<taskResponse[]> => {
    try {
        const token = obterCookie("auth_token");

        const response = await fetch("http://localhost:3000/tasks/", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",

                ...(token && { "Authorization": token })
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao buscar tarefas");
        }
        return data.map((taskResponse: any) => ({
            task_id: taskResponse.task_id,
            titulo: taskResponse.titulo,
            descricao: taskResponse.descricao,
            status: taskResponse.status,
            data_criacao: taskResponse.data_criacao || "", 
        }));
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

export const listarArquivosTarefa = async (taskId: number): Promise<Arquivo[]> => {
    try {
        const token = obterCookie("auth_token");

        const response = await fetch(`http://localhost:3000/tasks/${taskId}/files`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                ...(token && { "Authorization": token })
            },
        });

        const data = await response.json();
        console.log(taskId);
        if (!response.ok) {
            throw new Error(data.error || "Erro ao buscar arquivos da tarefa");
        }

        return data.files;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};


export const baixarEExibirArquivo = async (fileId: number) => {
    try {
        const token = obterCookie("auth_token");

        const response = await fetch(`http://localhost:3000/tasks/files/${fileId}`, {
            method: "GET",
            headers:{
                "Content-Type": "Application/json",
                ...(token && { "Authorization": token })
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao baixar o arquivo");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        window.open(url, "_blank");


        setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (error) {
        console.error("Erro ao abrir arquivo:", error);
    }
};

export const eliminarArquivo = async (taskId: number, fileId: number) => {
    try {
        const token = obterCookie("auth_token");

        const response = await fetch(`http://localhost:3000/tasks/${taskId}/files/${fileId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                ...(token && { "Authorization": token })
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao eliminar o arquivo");
        }
    } catch (error) {
        console.error("Erro ao eliminar o arquivo:", error);
        throw error;
    }
};

export const eliminarTarefa = async (taskId: number) => {
    try {
        const token = obterCookie("auth_token");

        const arquivos = await listarArquivosTarefa(taskId);

        for (const arquivo of arquivos) {
            await eliminarArquivo(taskId, arquivo.file_id);
        }

        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                ...(token && { "Authorization": token })
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao eliminar a tarefa");
        }
    } catch (error) {
        console.error("Erro ao eliminar a tarefa:", error);
        throw error;
    }
};

export const adicionarTarefa = async (tarefa: NovaTarefa) => {
    const token = obterCookie("auth_token");

    try {
        const response = await fetch("http://localhost:3000/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": token }),
            },
            body: JSON.stringify(tarefa),
        });

        const data = await response.json(); // Lê o JSON da resposta

        if (!response.ok) {
            throw new Error(data.error || "Erro ao adicionar tarefa");
        }

        return data; // Retorna a resposta da API
    } catch (error) {
        return { error:"Erro desconhecido ao adicionar tarefa" };
    }
};

export const atualizarTarefa = async (taskId: number, tarefa: Partial<NovaTarefa>) => {
    const token = obterCookie("auth_token");

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": token }),
        },
        body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar tarefa");
    }

    return response.json();
};

export const uploadArquivo = async (taskId: number, formData: FormData) => {
    const token = obterCookie("auth_token");

    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}/upload`, {
            method: "POST",
            headers: {
                ...(token && { "Authorization": token }), 
            },
            body: formData, 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao enviar arquivo");
        }

        return data; 
    } catch (error) {
        console.error("Erro no upload do arquivo:", error);
        throw error;
    }
};

