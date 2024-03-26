import './public/style.css'

let instance = 0

const getPosition = () => {
  // GET THE NEW ELEMENT
  const divElement = instance == 1 ? document.querySelector('.block.blue') : document.querySelector('.block.red')

  const x = window.screenLeft + (window.innerWidth / 2) - (divElement.offsetWidth / 2);
  const y = window.screenTop + (window.innerHeight / 2) - (divElement.offsetHeight / 2);

  return { x, y }
}

const setLocalStorage = () => {
  const { x, y } = getPosition()

  localStorage.setItem(instance == 1 ? 'A' : 'B', JSON.stringify({
    id: instance,
    windowX: x,
    windowY: y
  }))

  setTimeout(setLocalStorage, 500)
}

const setStyles = ({ el, data }) => {
  const { windowX, windowY } = JSON.parse(data)

  el.style.top = `${windowY - window.screenTop + (el.offsetHeight / 2)}px`
  el.style.left = `${windowX - window.screenLeft + (el.offsetWidth / 2)}px`
}

const updateXY = () => {
  if(instance == 1) {
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

  document.querySelector('#app').innerHTML = `
    <div id="principal" class="block blue"></div> 
    <div id="secondary" class="block red"></div>
  `

  if (instance == 1) {
    document.querySelector('#principal').classList.add('fixed')
  } else {
    document.querySelector('#secondary').classList.add('fixed')
  }

  setLocalStorage()
  setInterval(updateXY, 500)
}

// PROGRAM INITIALIZATION
if(localStorage.getItem("init")) {
  start()
} else {
  document.querySelector('#openNewWindow').addEventListener('click', () => {
    instance = 1
    start()
    openNewInstance()

    window.addEventListener('storage', updateXY)
  })
}

// OPEN NEW WINDOW
const openNewInstance = () => {
  const currentUrl = window.location.href
  window.open(currentUrl, '_blank')
}