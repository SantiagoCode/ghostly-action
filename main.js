import './public/style.css'

let position = 0

const getPosition = () => {
  // Obtener el elemento div
  const divElement = position == 1 ? document.querySelector('.block.blue') : document.querySelector('.block.red')

  // Obtener las dimensiones del elemento div
  const divWidth = divElement.offsetWidth;
  const divHeight = divElement.offsetHeight;

  // Calcular la posición del div con respecto a la pantalla
  const divPosX = window.screenX + (window.outerWidth / 2) - (divWidth / 2);
  const divPosY = window.screenY + (window.outerHeight / 2) - (divHeight / 2);

  return { divPosX, divPosY }
}

const setLocalStorage = () => {
  const { divPosX, divPosY } = getPosition()

  localStorage.setItem(position == 1 ? 'A' : 'B', JSON.stringify({
    id: position,
    windowX: divPosX,
    windowY: divPosY
  }))

  setTimeout(() => setLocalStorage(), 1000)
}

const setStyles = ({ el, data }) => {
  const { windowX, windowY } = JSON.parse(data)

  // Obtener las dimensiones del elemento div
  const divWidth = el.offsetWidth;
  const divHeight = el.offsetHeight;

  el.style.top = `${Number(windowY - (window.outerHeight/2) + (divHeight / 2))}px`
  el.style.left = `${Number(windowX - (window.outerWidth/2) + (divWidth / 2))}px`
}

const updateElement = () => {
  if(position == 1) {
    const el = document.querySelector('#secondary')
    const data = localStorage.getItem('B')

    setStyles({ el, data })
  } else {
    const el = document.querySelector('#principal')
    const data = localStorage.getItem('A')
    
    setStyles({ el, data })
  }
}

const startGame = () => {
  localStorage.setItem("init", true)

  document.querySelector('#app').innerHTML = `<div id="${position == 1 ? 'principal' : 'secondary'}" class="block ${position == 1 ? 'blue' : 'red'}"></div>`
  document.querySelector('#app').innerHTML += `<div id="${position == 0 ? 'principal' : 'secondary'}" class="block ${position == 0 ? 'blue' : 'red'}"></div>`

  if (position == 1) {
    document.querySelector('#principal').classList.add('fixed')
  } else {
    document.querySelector('#secondary').classList.add('fixed')
  }

  setLocalStorage()
  setInterval(() => updateElement(), 1000)
}

// PROGRAM INITIALIZATION
if(localStorage.getItem("init")) {
  startGame()
} else {
  document.querySelector('#openNewWindow').addEventListener('click', () => {
    position = 1
    startGame()
    openNewWindow()

    window.addEventListener('storage', () => updateElement())
  })
}

// OPEN NEW WINDOW
const openNewWindow = () => {
  const currentUrl = window.location.href
  window.open(currentUrl, '_blank')
}