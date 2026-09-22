const repositoryList = document.querySelector("#repository-list");

const formatDate = (date) => new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
}).format(new Date(date));

const formatStars = (stars) => new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1
}).format(stars);

const renderRepositories = (repositories) => {
  repositoryList.replaceChildren(
    ...repositories.map((repository) => {
      const article = document.createElement("article");
      article.className = "repository";
      article.innerHTML = `
        <h2><a href="${repository.url}" target="_blank" rel="noreferrer">${repository.name}</a></h2>
        <p>${repository.description}</p>
        <div class="repository-meta">
          <span class="language">${repository.language}</span>
          <span class="stars">${formatStars(repository.stars)} stars</span>
          <span class="updated">Updated ${formatDate(repository.updated)}</span>
        </div>
      `;
      return article;
    })
  );
};

const loadRepositories = async () => {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories: ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = `<p class="status">${error.message}</p>`;
  }
};

loadRepositories();
