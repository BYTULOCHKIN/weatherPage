document.addEventListener('DOMContentLoaded', () => {
  const temoZone = document.querySelector('.location-timezone');
  const tempIcon = document.querySelector('.location-icon');
  const tempDeg = document.querySelector('.temp__deg');
  const tempDescr = document.querySelector('.temp-descr');
  const inputLocation = document.querySelector('[data-input]');
  const submitBtn = document.querySelector('.submit');
  const tempType = document.querySelector('.temp__type');
  const modalError = document.querySelector('.modal-error');
  const modalClose = document.querySelector('.modal-close');
  const modalContent = modalError.querySelector('.modal-content');

  // addEventListener
  submitBtn.addEventListener('click', () => {
    renderPage();
  });
  inputLocation.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      renderPage();
    }
  });
  modalError.addEventListener('click', e => {
    e = e.target;
    if (e === modalError || e === modalClose) {
      modalError.classList.remove('modal-error_active');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modalError.classList.remove('modal-error_active');
    }
  });

  //
  function renderPage() {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation.value}&appid=bc4a02864bd2af1e6eb3e22d45783b10`;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let tempK = data.main.temp;
        let tempC = tempK - 272.15;
        let i = 0;
        tempDeg.textContent = Math.floor(tempC);
        tempType.textContent = 'C';
        tempDeg.parentNode.addEventListener('click', () => {
          if (i === 0) {
            tempType.textContent = 'K';
            tempDeg.textContent = Math.floor(tempK);
            i++;
          } else if (i === 1) {
            tempType.textContent = 'C';
            tempDeg.textContent = Math.floor(tempC);
            i--;
          }
        });

        temoZone.textContent = data.name;
        tempIcon.style.background = `no-repeat url(http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png)`;
        tempIcon.textContent = '';
        tempDescr.textContent = data.weather[0].description;
        tempDeg.parentNode.classList.remove('hide');
      })
      .catch(err => {
        modalError.classList.add('modal-error_active');
        console.error('Wrong name of city', err);
      })
      .finally(() => {
        inputLocation.value = '';
      });
  }
});
