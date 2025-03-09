import { useState, useEffect } from "react";
import { loginRequest } from "../services/authService";
import Toast from "../components/Toast";
import { guardarCookie, obterCookie, removerCookie } from "../utils/Cookies";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    
        if (!isMounted) return;
    
        setLoading(true);
    
        try {
            const data = await loginRequest(email, senha);
            console.log("Login bem-sucedido:", data);
    
            localStorage.setItem("token", data.token);
    
            guardarCookie("auth_token", data.token, 7 * 24 * 60 * 60);

            setToast({ message: data.message, type: "success" });
        } catch (err: any) {
            setToast({ message: err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login</h1>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
};

export default Login;
