import { useEffect, useState } from "react";
import { listarTarefa, eliminarTarefa } from "../services/taskService";
import "../styles/Tarefa.css";
import TarefaDetalhe from "./TarefaDetalhe";
import Toast from "./Toast";

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
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const response = await listarTarefa();
                const tarefasFormatadas: Tarefa[] = response.map(tarefa => ({
                    task_id: tarefa.task_id,
                    titulo: tarefa.titulo,
                    descricao: tarefa.descricao,
                    status: tarefa.status,
                    data_criacao: tarefa.data_criacao
                }));
                
                setTarefas(tarefasFormatadas);
                setToast({message:"Tarefas listadas com sucesso",type:"success"});
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
                setToast({message:"Erro ao buscar tarefas:"+error,type:"error"});

            }
        };

        fetchTarefas();
    }, []);

    // Função para eliminar uma tarefa
    const handleDeleteTarefa = async (taskId: number) => {
        setToast({message:"Atenção: Vai eliminar tarefa",type:"warning"});
        const confirmacao = window.confirm("Tem certeza que deseja eliminar esta tarefa?");
        if (!confirmacao) return;

        try {
            await eliminarTarefa(taskId);
            setTarefas(tarefas.filter(tarefa => tarefa.task_id !== taskId));
            setToast({message:"Tarefa apagada com sucesso, arquivos associados também",type:"success"});
        } catch (error) {
            console.error("Erro ao eliminar tarefa:", error);
            alert("Erro ao eliminar tarefa!");
        }
    };

    return (
        <div className="tarefa-container">
            <h1>Lista de Tarefas</h1>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {tarefaSelecionada ? (
                <TarefaDetalhe 
                    tarefa={tarefaSelecionada} 
                    onClose={() => setTarefaSelecionada(null)} 
                />
            ) : (
                <ul className="tarefa-list">
                    {tarefas.map((tarefa) => (
                        <li className="tarefa-item" key={tarefa.task_id}>
                            <h3 className="titulo">{tarefa.titulo}</h3>
                            <button 
                                className="btn-abrir-tarefa"
                                onClick={() => setTarefaSelecionada(tarefa)}
                            >
                                Ver
                            </button>
                            <button 
                                className="btn-eliminar-tarefa"
                                onClick={() => handleDeleteTarefa(tarefa.task_id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaTarefa;
