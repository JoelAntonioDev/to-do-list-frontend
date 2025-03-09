import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";
import Toast from "../components/Toast";
import { guardarCookie } from "../utils/Cookies";
import "../styles/global.css";
import "../styles/Login.css";
const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!isMounted) return;

        setLoading(true);

        try {
            console.log(email, senha);
            const data = await loginRequest(email, senha);
            console.log("Login bem-sucedido:", data);

            localStorage.setItem("token", data.token);

            guardarCookie("auth_token", data.token, 7 * 24 * 60 * 60);

            setToast({ message: data.message, type: "success" });

            setTimeout(() => navigate("/home"), 1000);

        } catch (err) {
            if (err instanceof Error) {
                setToast({ message: err.message, type: "error" });
            } else {
                setToast({ message: "Erro desconhecido", type: "error" });
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="out-container">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="out-image"></div>
            <div className="out-form">
                <div className="out-box">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

                        <button type="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>
                    <p> <button onClick={() => navigate("/signup")}>Criar conta</button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
