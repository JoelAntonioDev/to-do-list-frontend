import { useEffect, useState } from "react";
import { listarArquivosTarefa, baixarEExibirArquivo, eliminarArquivo, uploadArquivo } from "../services/taskService";
import "../styles/Tarefa.css";
import Toast from "./Toast";
import {Trash2 } from "lucide-react";
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
const formatosPermitidos = ["pdf", "png", "jpg", "jpeg", "docx"];

const TarefaDetalhe: React.FC<TarefaDetalheProps> = ({ tarefa, onClose }) => {
    const [arquivos, setArquivos] = useState<Arquivo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string, type: "success" | "warning" | "error" } | null>();
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

    const handleDeleteArquivo = async (taskId: number, fileId: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este arquivo?");
        if (!confirmacao) return;

        try {
            await eliminarArquivo(taskId, fileId);
            setArquivos(arquivos.filter(arquivo => arquivo.file_id !== fileId));
            setToast({ message: "Arquivo removido com sucesso", type: "success" });
        } catch (err) {
            setToast({ message: "Erro ao remover arquivo", type: "error" });
        }
    };

    const handleUploadArquivo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;

        const file = event.target.files[0];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (!fileExtension || !formatosPermitidos.includes(fileExtension)) {
            alert("Formato de arquivo não permitido. Escolha um arquivo PDF, PNG, JPG ou DOCX.");
            event.target.value = "";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("task_id", String(tarefa.task_id));

        try {
            await uploadArquivo(tarefa.task_id, formData);

            const filesAtualizados = await listarArquivosTarefa(tarefa.task_id);
            setArquivos(filesAtualizados);

            setToast({ message: "Arquivo adicionado com sucesso", type: "success" });
        } catch (err) {
            setToast({ message: "Erro ao enviar arquivo", type: "error" });
        }
    };


    return (
        <div className="tarefa-detalhe-container">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => { null }} />}
            <button onClick={onClose} className="btn-voltar">Voltar</button>
            <h1>{tarefa.titulo}</h1>
            <div>
                <p><strong>Descrição:</strong> {tarefa.descricao}</p>
                <p><strong>Status:</strong> {tarefa.status}</p>
                <p><strong>Data de Criação:</strong> {new Date(tarefa.data_criacao).toLocaleDateString()}</p>

            </div>
            <h2>Arquivos Associados</h2>
            {loading ? (
                <p>Carregando arquivos...</p>
            ) : error ? (
                <p className="erro">{error}</p>
            ) : arquivos.length > 0 ? (
                <ul className="arquivo-list">
                    {arquivos.map((arquivo) => (
                        <li key={arquivo.file_id} style={{display:"flex",gap:"5px"}}>
                            <button className="btn-arquivo" onClick={() => baixarEExibirArquivo(arquivo.file_id)}>
                                {arquivo.file_name}
                            </button>
                            <button className="btn-eliminar-arquivo" onClick={() => handleDeleteArquivo(tarefa.task_id, arquivo.file_id)}>
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Sem arquivos associados.</p>
            )}

            <div className="upload-container">
                <input type="file" accept=".pdf,.png,.jpg,.jpeg,.docx" className="upload-input" onChange={handleUploadArquivo} />
            </div>
        </div>
    );
};

export default TarefaDetalhe;
