const form = document.getElementById("opinionForm");
const list = document.getElementById("opinionsList");
const messageBox = document.getElementById("formMessage");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7V-1NF6LjL03Iys9hpyssOfBpVprt27tgU0r3475P4oU21aeMM_408jaNwT7lsi8YZg/exec";

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
      <p><b>E-mail:</b> ${item.email || "Não informado"}</p>
      <p><b>Tema:</b> ${item.tema}</p>
      <p>${item.opiniao}</p>
      <small>${item.data}</small>
    `;
    list.appendChild(card);
  });
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const tema = document.getElementById("tema").value.trim();
  const opiniao = document.getElementById("opiniao").value.trim();

  if (!nome || !tema || !opiniao) {
    messageBox.innerText = "Preencha todos os campos obrigatórios.";
    messageBox.className = "form-message error";
    return;
  }

  const novaOpiniao = {
    nome,
    email,
    tema,
    opiniao,
    data: new Date().toLocaleString("pt-BR")
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(novaOpiniao)
    });

    savedOpinions.push(novaOpiniao);
    localStorage.setItem("opinionsMeuConcretoo", JSON.stringify(savedOpinions));

    renderOpinions();
    form.reset();

    messageBox.innerText = "Dados enviados com sucesso!";
    messageBox.className = "form-message success";

    setTimeout(() => {
      messageBox.innerText = "";
      messageBox.className = "form-message";
    }, 3000);

  } catch (error) {
    messageBox.innerText = "Erro ao enviar. Tente novamente.";
    messageBox.className = "form-message error";
  }
});

renderOpinions();
