const firePixelsArray = [];
const fireWidth = 40;
const fireHeigth = 40;
const fireColorsPalette = [
    {"b":7,"g":7,"r":7},
    {"b":31,"g":7,"r":7},
    {"b":47,"g":15,"r":7},
    {"b":71,"g":15,"r":7},
    {"b":87,"g":23,"r":7},
    {"b":103,"g":31,"r":7},
    {"b":119,"g":31,"r":7},
    {"b":143,"g":39,"r":7},
    {"b":159,"g":47,"r":7},
    {"b":175,"g":63,"r":7},
    {"b":191,"g":71,"r":7},
    {"b":199,"g":71,"r":7},
    {"b":223,"g":79,"r":7},
    {"b":223,"g":87,"r":7},
    {"b":223,"g":87,"r":7},
    {"b":215,"g":95,"r":7},
    {"b":215,"g":95,"r":7},
    {"b":215,"g":103,"r":15},
    {"b":207,"g":111,"r":15},
    {"b":207,"g":119,"r":15},
    {"b":207,"g":127,"r":15},
    {"b":207,"g":135,"r":23},
    {"b":199,"g":135,"r":23},
    {"b":199,"g":143,"r":23},
    {"b":199,"g":151,"r":31},
    {"b":191,"g":159,"r":31},
    {"b":191,"g":159,"r":31},
    {"b":191,"g":167,"r":39},
    {"b":191,"g":167,"r":39},
    {"b":191,"g":175,"r":47},
    {"b":183,"g":175,"r":47},
    {"b":183,"g":183,"r":47},
    {"b":183,"g":183,"r":55},
    {"b":207,"g":207,"r":111},
    {"b":223,"g":223,"r":159},
    {"b":239,"g":239,"r":199},
    {"b":255,"g":255,"r":255}]


start = () => {
    createFireDataStructure();
    creatFireSource()
    setInterval(calculateFirePropagation, 10)

}
createFireDataStructure = () => {
    const numberOfPixels = fireWidth * fireHeigth
    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0;
    }
}
calculateFirePropagation = () => {
    for (let collumn =0; collumn < fireWidth; collumn++) {
        for (let row = 0; row < fireHeigth; row++) {
            const pixelIndex = collumn + ( fireWidth * row )
            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

updateFireIntensityPerPixel = (currentPixelIndex) => {
    const belowPixelIndex = currentPixelIndex + fireWidth
    if (belowPixelIndex >= fireWidth * fireHeigth) {
        return
    }
    const decay = Math.floor(Math.random() * 2)
    const belowPixelFireItensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity =
        belowPixelFireItensity - decay >= 0 ? belowPixelFireItensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity 
}


renderFire = () => {
    const debug = false

    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeigth; row ++) {
    html += '<tr>'

    for( let collumn = 0; collumn < fireWidth; collumn++) {
        const pixelIndex = collumn + (fireWidth * row)
        const fireIntensity = firePixelsArray[pixelIndex]

           if (debug === true) {
            html += '<td>'
            html += `<div class="pixel-index">${pixelIndex}</div>`
            html += fireIntensity
            html += '</td>'
           } else {
            const color = fireColorsPalette[fireIntensity]
            const colorString = `${color.r}, ${color.g}, ${color.b}`
            html += `<td style="background-color: rgb(${colorString})">`
            html += '</td>'
           }

    }
    html += '</tr>'
   }
  html += '</table>'
  document.querySelector('#fireCanvas').innerHTML =  html;
}

creatFireSource = () => {
    for (let collumn = 0; collumn <= fireWidth; collumn++) {
        const overflowPixelIndex = fireWidth * fireHeigth
        const pixelIndex = (overflowPixelIndex - fireWidth) + collumn
        firePixelsArray[pixelIndex] = 36
    }
}

start();
