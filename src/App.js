import React, { useEffect, useState } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    var repository = {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    };

    api.post('repositories', repository)
      .then(response => {
        if (response.status === 200) {
          setRepositories([...repositories, response.data]);
        }
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(response => {
        if (response.status === 204) {
          const repoIndex = repositories.findIndex(repo => repo.id === id);

          repositories.splice(repoIndex, 1);

          setRepositories([...repositories]);
        }
      });
  }

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map
          (repo =>
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          )}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
