import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/SignUp.css";
import { SignUpRequest } from "../services/signUpService";
import Toast from "../components/Toast";
// Definição do tipo FormData
interface FormData {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'warning' } | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isMounted) return;

        try {
            const response = await SignUpRequest(formData);
            console.log("Resposta do servidor:", response.message);
            setToast({ message: response.message, type: 'success' });
            setTimeout(()=>{
                setFormData({ nome: "", sobrenome: "", email: "", senha: "" });
            },1000);            
        } catch (err) {
            if (err instanceof Error) {
                setToast({ message: err.message, type: "error" });
            } else {
                setToast({ message: "Erro desconhecido", type: "error" });
            }
        }
    };

    return (
        <div className="out-container">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}            <div className="out-image"></div>
            <div className="out-form">
                <div className="out-box">
                    <h1>Criação de Conta</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                        <input type="text" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
                        <button type="submit">Criar Conta</button>
                    </form>
                    <p>Já tem uma conta? <button onClick={() => navigate("/")}>Faça login</button></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
