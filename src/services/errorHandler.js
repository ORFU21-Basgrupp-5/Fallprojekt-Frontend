export const defaultRender = function(msg) {
    const errorDiv = document.getElementById('errorDiv')
    const childErrorDiv = document.createElement('div')
    childErrorDiv.insertAdjacentText('beforeend', msg)
    errorDiv.appendChild (childErrorDiv)
    setTimeout(function () {
      errorDiv.removeChild(errorDiv.lastChild);
    }, 4000)
  }

 