import { useEffect, useState } from "react";
import { listarArquivosTarefa, baixarEExibirArquivo } from "../services/taskService";
import "../styles/Tarefa.css";
interface Tarefa {
    task_id: number;
    titulo: string;
    descricao: string;
    status: string;
    data_criacao: string;
}

interface Arquivo {
    file_id: number;
    file_name: string;
}

interface TarefaDetalheProps {
    tarefa: Tarefa;
    onClose: () => void;
}

const TarefaDetalhe: React.FC<TarefaDetalheProps> = ({ tarefa, onClose }) => {
    const [arquivos, setArquivos] = useState<Arquivo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArquivos = async () => {
            try {
                const files = await listarArquivosTarefa(tarefa.task_id);
                setArquivos(files);
            } catch (err) {
                setError("Erro ao buscar arquivos.");
            } finally {
                setLoading(false);
            }
        };

        fetchArquivos();
    }, [tarefa.task_id]);

    return (
        <div className="tarefa-detalhe-container">
            <button onClick={onClose} className="btn-voltar">Voltar</button>
            <h1>{tarefa.titulo}</h1>
            <p><strong>Descrição:</strong> {tarefa.descricao}</p>
            <p><strong>Status:</strong> {tarefa.status}</p>
            <p><strong>Data de Criação:</strong> {new Date(tarefa.data_criacao).toLocaleDateString()}</p>

            <h2>Arquivos Associados</h2>
            {loading ? (
                <p>Carregando arquivos...</p>
            ) : error ? (
                <p className="erro">{error}</p>
            ) : arquivos.length > 0 ? (
                <ul className="arquivo-list">
                    {arquivos.map((arquivo) => (
                        <li key={arquivo.file_id}>
                            <button className="btn-arquivo" onClick={() => baixarEExibirArquivo(arquivo.file_id)}>
                                {arquivo.file_name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Sem arquivos associados.</p>
            )}
        </div>
    );
};

export default TarefaDetalhe;
