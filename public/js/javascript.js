const date = new Date();
const day = date.getDate()
const month = date.getMonth() + 1 //ele considera janeiro zero, começa a contar do zero
const year = date.getFullYear()
const currentDate = document.querySelector('.currentDate')
currentDate.innerHTML = `Novos pedidos foram realizados desde o último acesso ao sistema. Hoje é <strong>${day}/${month}/${year}</strong>.`