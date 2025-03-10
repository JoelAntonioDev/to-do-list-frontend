import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import AdicionaTarefa from "../components/AdicionaTarefa";
import ListaTarefa from "../components/ListaTarefa";
import Principal from "../components/Principal";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem("email") || "Usuário";
    const [activeComponent, setActiveComponent] = useState<string>("welcome");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/");
    };

    return (
        <div className="home-container">
            {/* NAVBAR */}
            <nav className="home-nav">
                <div className="nav-left">
                    <button onClick={() => setActiveComponent("add-task")}>Adicionar Tarefa</button>
                    <button onClick={() => setActiveComponent("tasks")}>Ver Tarefas</button>
                </div>
                <div className="nav-right">
                    <span className="email">{email}</span>
                    <button className="logout-btn" onClick={handleLogout}>Sair</button>
                </div>
            </nav>

            {/* BODY DINÂMICO */}
            <main className="home-body">
                {activeComponent === "add-task" && <AdicionaTarefa />}
                {activeComponent === "tasks" && <ListaTarefa />}
                {activeComponent === "welcome" && <Principal />}
            </main>

            {/* RODAPÉ */}
            <footer className="home-footer">
                <p>© 2025 Joel António Dev. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
