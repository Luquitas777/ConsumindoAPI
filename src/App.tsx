import axios from "axios";
import { useState } from "react";
import './App.css';

type GithubData = {
  name: string;
  bio: string;
  avatar_url: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [avatar_url, setAvatarURL] = useState("Loading...");
  const [error, setError] = useState(""); 

  const handlePesquisa = async () => { 
    try {
      const response = await axios.get<GithubData>(`https://api.github.com/users/${username}`);
      setName(response.data.name);
      setBio(response.data.bio);
      setAvatarURL(response.data.avatar_url);
      setError(""); 
      

    } catch (err) {
      setError("Usuário não encontrado. Verifique o nome e tente novamente.");
      setName(""); 
      setBio(""); 
      setAvatarURL(""); 
    }
  };

  return (
    <div className="container-geral">

      <div className="container">

        <header>Projeto GitHubprowfile</header>
        <main>
          <div className="form">
            <h1>Consumindo API do Github</h1>
            <input
              type="text"
              placeholder="Digite o nome do usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handlePesquisa}>Consultar</button>
            {error && <p className="error">{error}</p>} {}

          </div>
          <div className="conteudo">
            <img src={avatar_url} />

            <h1>{name}</h1>

            <p>{bio}</p>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
