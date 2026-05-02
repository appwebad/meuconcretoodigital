const form = document.getElementById("opinionForm");
const list = document.getElementById("opinionsList");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7V-1NF6LjL03Iys9hpyssOfBpVprt27tgU0r3475P4oU21aeMM_408jaNwT7lsi8YZg/exec";
const savedOpinions = JSON.parse(localStorage.getItem("opinionsMeuConcretoo")) || [];
const email = document.getElementById("email").value || "";

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

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const tema = document.getElementById("tema").value.trim();
  const opiniao = document.getElementById("opiniao").value.trim();

  if (!nome || !tema || !opiniao) {
    alert("Preencha todos os campos.");
    return;
  }

  const novaOpiniao = {
    nome,
    tema,
    opiniao,
    data: new Date().toLocaleString("pt-BR")
  };

  savedOpinions.push(novaOpiniao);
  localStorage.setItem("opinionsMeuConcretoo", JSON.stringify(savedOpinions));
  renderOpinions();
  form.reset();

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(novaOpiniao)
    });

   const msg = document.createElement("div");
msg.innerText = "Dados enviados com sucesso!";
msg.style.background = "#16a34a";
msg.style.color = "#fff";
msg.style.padding = "12px";
msg.style.borderRadius = "10px";
msg.style.marginTop = "10px";
msg.style.textAlign = "center";

form.appendChild(msg);

setTimeout(() => {
  msg.remove();
}, 3000);

  } catch (error) {
   
    alert("Dados recebidos no site, mas houve uma falha no envio. Tente novamente.");
  }
});

renderOpinions();
