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

const updateAnotherDiv = () => {
  if(position == 1) {
    const el = document.querySelector('#secondary')
    const data = localStorage.getItem('B')

    const { windowX, windowY } = JSON.parse(data)

    el.style.top = `${Number( (window.outerHeight/2) + windowY )}px`
    el.style.left = `${Number( (window.outerWidth/2) + windowX )}px`

    console.log(windowX, windowY);
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
  setInterval(() => updateAnotherDiv(), 1000)
}

const setLocalStorage = () => {
  const { divPosX, divPosY } = getPosition()
  
  console.log(position);
  console.log('setLocalStorage... ', { divPosX, divPosY });

  localStorage.setItem(position == 1 ? 'A' : 'B', JSON.stringify({
    id: position,
    windowX: divPosX,
    windowY: divPosY
  }))

  setTimeout(() => setLocalStorage(), 1000)
}

if(localStorage.getItem("init")) {
  startGame()
} else {
  document.querySelector('#openNewWindow').addEventListener('click', () => {
    position = 1
    startGame()
    openSecondWindow()
  })
}

const openSecondWindow = () => {
  const currentUrl = window.location.href
  window.open(currentUrl, '_blank')
}