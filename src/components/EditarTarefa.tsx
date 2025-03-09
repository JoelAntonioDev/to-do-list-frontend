import { useState } from "react";
import { atualizarTarefa } from "../services/taskService";
import "../styles/EditarTarefa.css";
import Toast from "./Toast";

interface Tarefa {
    task_id: number;
    titulo: string;
    descricao: string;
    status: string;
}

interface EditarTarefaProps {
    tarefa: Tarefa;
    onClose: () => void;
    onUpdate: () => void;
}

const EditarTarefa: React.FC<EditarTarefaProps> = ({ tarefa, onClose, onUpdate }) => {
    const [titulo, setTitulo] = useState(tarefa.titulo);
    const [descricao, setDescricao] = useState(tarefa.descricao);
    const [status, setStatus] = useState(tarefa.status);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await atualizarTarefa(tarefa.task_id, { titulo, descricao, status });
            onUpdate(); // 🔹 Agora só chamamos onUpdate() sem passar a tarefa
        } catch (error) {
            console.error("Erro ao atualizar a tarefa:", error);
            setToast({ message: "Erro ao atualizar tarefa", type: "error" });
        }
    };
    

    return (
        <div className="editar-tarefa-container">
            <h2>Editar Tarefa</h2>
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
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pendente">Pendente</option>
                        <option value="em progresso">Em Progresso</option>
                        <option value="concluído">Concluído</option>
                    </select>
                </div>
                <button type="submit">Salvar Alterações</button>
                <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
            </form>
        </div>
    );
};

export default EditarTarefa;
