import "../styles/Principal.css";

const Principal: React.FC = () => {
    return (
        <div className="welcome-container">
            <h1>Bem-vindo à To-Do List</h1>
            <h2>Organize suas tarefas de forma simples e eficiente.</h2>
            
            <div className="content-flex">
                <div className="content-box">✨ <strong>Organize sua vida, simplifique seu dia</strong><br/>Um To-Do List não é apenas uma lista de tarefas. É uma ferramenta poderosa para aumentar a produtividade, reduzir o estresse e manter o foco.</div>
                <div className="content-box">⏳ <strong>A importância da gestão de tempo</strong><br/>Anotar tarefas aumenta a chance de realizá-las. Métodos como Pomodoro e Matriz de Eisenhower ajudam a priorizar melhor.</div>
                <div className="content-box">🎯 <strong>Benefícios de um To-Do List bem organizado</strong><br/>✔ Evita sobrecarga mental<br/>✔ Ajuda a definir prioridades<br/>✔ Dá uma sensação de realização<br/>✔ Melhora a disciplina diária</div>
            </div>
            
            <div className="content-flex">
                <div className="content-box">🚀 <strong>Dicas para um To-Do List eficiente</strong><br/>🔹 Mantenha realismo<br/>🔹 Defina prioridades<br/>🔹 Divida grandes tarefas<br/>🔹 Revise diariamente</div>
                <div className="content-box">💡 <strong>Acredite no processo</strong><br/>Cada pequena tarefa concluída é um passo para um dia mais produtivo e equilibrado!</div>
            </div>
        </div>
    );
};

export default Principal;