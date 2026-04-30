const form = document.getElementById("opinionForm");
const list = document.getElementById("opinionsList");

const savedOpinions = JSON.parse(localStorage.getItem("opinionsMeuConcretoo")) || [];

function renderOpinions() {
  list.innerHTML = "";

  if (savedOpinions.length === 0) {
    list.innerHTML = `<div class="opinion-card"><p>Ainda não há opiniões. Seja o primeiro a comentar.</p></div>`;
    return;
  }

  savedOpinions.slice().reverse().forEach((item) => {
    const card = document.createElement("div");
    card.className = "opinion-card";
    card.innerHTML = `
      <strong>${item.nome}</strong>
      <p><b>Tema:</b> ${item.tema}</p>
      <p>${item.opiniao}</p>
      <small>${item.data}</small>
    `;
    list.appendChild(card);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const tema = document.getElementById("tema").value.trim();
  const opiniao = document.getElementById("opiniao").value.trim();

  if (!nome || !tema || !opiniao) {
    alert("Preencha todos os campos.");
    return;
  }

  savedOpinions.push({
    nome,
    tema,
    opiniao,
    data: new Date().toLocaleString("pt-BR")
  });

  localStorage.setItem("opinionsMeuConcretoo", JSON.stringify(savedOpinions));
  form.reset();
  renderOpinions();
  alert("Opinião publicada com sucesso!");
});

renderOpinions();
