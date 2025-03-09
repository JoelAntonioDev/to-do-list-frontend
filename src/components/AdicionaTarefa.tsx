import { useState } from "react";
import { adicionarTarefa } from "../services/taskService";
import "../styles/AdicionaTarefa.css";
import Toast from "./Toast";

const AdicionaTarefa: React.FC = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!titulo.trim() || !descricao.trim()) {
            showToast("Preencha todos os campos obrigatórios.", "error");
            return;
        }
        const status = ""
        const response = await adicionarTarefa({ titulo, descricao, status });

        if (response.error) {
            showToast(response.error, "error");
        } else {
            showToast("Tarefa adicionada com sucesso!", "success");
            setTitulo("");
            setDescricao("");
        }
    };

    return (
        <div className="tarefa-form-container">
            <h1>Adicionar Nova Tarefa</h1>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                </div>

                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default AdicionaTarefa;
