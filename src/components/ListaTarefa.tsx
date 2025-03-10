import { useEffect, useState } from "react";
import { listarTarefa, eliminarTarefa } from "../services/taskService";
import "../styles/Tarefa.css";
import TarefaDetalhe from "./TarefaDetalhe";
import EditarTarefa from "./EditarTarefa";
import Toast from "./Toast";
import {Eye, Edit,Trash2 } from "lucide-react";
interface Tarefa {
    task_id: number;
    titulo: string;
    descricao: string;
    status: string;
    data_criacao: string;
}
const ListaTarefa: React.FC = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);
    const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
    const statusCores: { [key: string]: string } = {
        "pendente": "#e57373",   
        "em andamento": "#ffb74d", 
        "concluído": "#81c784"    
    };
    
    const fetchTarefas = async () => {
        try {
            const response = await listarTarefa();
            setTarefas(response);
            setToast({ message: "Tarefas listadas com sucesso", type: "success" });
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            setToast({ message: "Erro ao buscar tarefas: " + error, type: "error" });
        }
    };

    useEffect(() => {
        fetchTarefas(); 
    }, []);

    const handleRemoverTarefa = async (taskId: number) => {
        setToast({ message: "Atenção: Vai eliminar tarefa", type: "warning" });
        const confirmacao = window.confirm("Tem certeza que deseja eliminar esta tarefa?");
        if (!confirmacao) return;

        try {
            await eliminarTarefa(taskId);
            fetchTarefas(); 
            setToast({ message: "Tarefa apagada com sucesso, arquivos associados também", type: "success" });
        } catch (error) {
            console.error("Erro ao eliminar tarefa:", error);
            setToast({ message: "Erro ao eliminar tarefa!", type: "error" });
        }
    };

    return (
        <div className="tarefa-container">
            <h1 className="title-lista-tarefas">Lista de Tarefas</h1>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            {tarefaSelecionada ? (
                <TarefaDetalhe 
                    tarefa={tarefaSelecionada} 
                    onClose={() => setTarefaSelecionada(null)} 
                />
                
            ) : tarefaEditando ? (
                <EditarTarefa 
                    tarefa={tarefaEditando} 
                    onClose={() => setTarefaEditando(null)} 
                    onUpdate={() => {
                        fetchTarefas(); 
                        setTarefaEditando(null);
                        setToast({ message: "Tarefa editada com sucesso!", type: "success" });
                    }} 
                />
            ) : (
                <ul className="tarefa-list">
                    {tarefas.map((tarefa) => (
                        <li className="tarefa-item" key={tarefa.task_id} style={{ backgroundColor: statusCores[tarefa.status.toLowerCase()] || "white" }}>
                            <h3 className="titulo">{tarefa.titulo}</h3>
                            <button 
                                className="btn-abrir-tarefa"
                                onClick={() => setTarefaSelecionada(tarefa)}
                            >
                                <Eye size={16} />
                            </button>
                            <button 
                                className="btn-editar-tarefa"
                                onClick={() => setTarefaEditando(tarefa)}
                            >
                                <Edit size={16}/>
                            </button>
                            <button 
                                className="btn-eliminar-tarefa"
                                onClick={() => handleRemoverTarefa(tarefa.task_id)}
                            >
                                <Trash2 size={16}/>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaTarefa;
