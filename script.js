async function buscarCEP() {

    const cep = document.querySelector("#cep").value.replace(/\D/g, "");

    const mensagem = document.querySelector("#mensagem");
    const resultado = document.querySelector("#resultado");

    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "red";
        resultado.classList.remove("ativo");
        return;
    }

    mensagem.textContent = "Buscando endereço...";
    mensagem.style.color = "#2563eb";

    try {

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        const dados = await resposta.json();

        if (dados.erro) {
            mensagem.textContent = "CEP não encontrado!";
            mensagem.style.color = "red";
            resultado.classList.remove("ativo");
            return;
        }

        document.querySelector("#resultadoCep").value = dados.cep || "";
        document.querySelector("#logradouro").value = dados.logradouro || "";
        document.querySelector("#bairro").value = dados.bairro || "";
        document.querySelector("#cidade").value = dados.localidade || "";
        document.querySelector("#estado").value = dados.uf || "";
        document.querySelector("#ibge").value = dados.ibge || "";

        mensagem.textContent = "Endereço encontrado com sucesso!";
        mensagem.style.color = "green";

        resultado.classList.add("ativo");

    } catch (erro) {

        mensagem.textContent = "Erro ao consultar a API!";
        mensagem.style.color = "red";

        resultado.classList.remove("ativo");

        console.log(erro);
    }
}

