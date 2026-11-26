const form = document.querySelector('#formo-capsula')
const lista = document.querySelector('#lista')
const aviso = document.querySelector('#aviso')

let capsulas = [
    {
        id: 1,
        autor: 'Wilson',
        titulo: 'Para mim em 2030',
        mensagem: 'Espero ter ganhad na Mega Sena',
        abre_em: '2030-01-01T00:00:00Z'
    },
    {
        id: 2,
        autor: 'Professor',
        mensagem: 'Bem-vindos!',
        abre_em: '2020-01-01T00:00:00Z'
    }
]

function calcularContagem(dataFutura) {
    const diferenca = new Date(dataFutura) - new Date();
    if (diferenca <= 0) {
        return null;
    }
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diferenca / (1000 * 60 * 60) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60)
    return `${dias}d ${horas}h ${minutos}min`;
}

function desenhar() {
    lista.innerHTML = '';
    for (const c of capsulas) {
        const contagem = calcularContagem(c.abre_em);

        const artigo = document.createElement('article');
        artigo.className = contagem ? 'capsula trancada' : 'capsula aberta'

        const titulo = document.createElement('h3');
        titulo.textContent = (contagem ? '' : '') + c.titulo;

        const autor = document.createElement('small');
        autor.textContent = 'por' + c.autor;

        const corpo = document.createElement('p')
        if (contagem) {
            corpo.className = 'contagem';
            corpo.textContent = 'Abre em' + contagem;
        } else {
            corpo.textContent = c.mensagem;
        }
        artigo.append(titulo, autor, corpo);
        lista.append(artigo)
    }
}

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const abreEm = new Date(form.abre_em.value);
    if (abreEm <= new Date()) {
        aviso.textContent = 'Escolha uma data no futuro';
        return;
    }

    capsulas.unshift({
        id: Date.now(),
        autor: form.autor.value,
        titulo: form.titulo.value,
        mensagem: form.mensagem.value,
        abre_em: abreEm.toISOString()
    })
})