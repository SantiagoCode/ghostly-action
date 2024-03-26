import './public/style.css'

let ventana = 0

const getPosition = () => {
  // Obtener el elemento div
  const divElement = ventana == 1 ? document.querySelector('.block.blue') : document.querySelector('.block.red')

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

  localStorage.setItem(ventana == 1 ? 'A' : 'B', JSON.stringify({
    id: ventana,
    windowX: divPosX,
    windowY: divPosY
  }))

  setTimeout(() => setLocalStorage(), 500)
}

const setStyles = ({ el, data }) => {
  const { windowX, windowY } = JSON.parse(data)

  // Obtener las dimensiones del elemento div
  const divWidth = el.offsetWidth;
  const divHeight = el.offsetHeight;

  el.style.top = `${Number(windowY - (window.outerHeight/2) - (divHeight / 2))}px`
  el.style.left = `${Number(windowX - (window.outerWidth/2) - (divWidth / 2))}px`

  console.log(window.outerWidth);
  console.log(window.outerHeight);
}

const updateXY = () => {
  if(ventana == 1) {
    const el = document.querySelector('#secondary')
    const data = localStorage.getItem('B')

    setStyles({ el, data })
  } else {
    const el = document.querySelector('#principal')
    const data = localStorage.getItem('A')
    
    setStyles({ el, data })
  }
}

const start = () => {
  localStorage.setItem("init", true)

  document.querySelector('#app').innerHTML = `<div id="principal" class="block blue"></div> <div id="secondary" class="block red"></div>`

  if (ventana == 1) {
    document.querySelector('#principal').classList.add('fixed')
  } else {
    document.querySelector('#secondary').classList.add('fixed')
  }

  setLocalStorage()
  setInterval(() => updateXY(), 500)
}

// PROGRAM INITIALIZATION
if(localStorage.getItem("init")) {
  start()
} else {
  document.querySelector('#openNewWindow').addEventListener('click', () => {
    ventana = 1
    start()
    openNewventana()

    window.addEventListener('storage', () => updateXY())
  })
}

// OPEN NEW ventana
const openNewventana = () => {
  const currentUrl = window.location.href
  window.open(currentUrl, '_blank')
}