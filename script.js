'use sctrict';

const modalWinner = document.querySelector('.modal.winner');
const modalLoser = document.querySelector('.modal.loser');
const modalAllWinner = document.querySelector('.modal.allwinner');
const overlay = document.querySelector('.overlay');
const roundSpan = document.querySelector('.round');

let playing = false;
let difficulty = 1;
let round = 1;
let currentImages = 3;
const images = [
  'assets/images/cartridge.png',
  'assets/images/cassette.png',
  'assets/images/gameboy.png',
  'assets/images/skateboard.png',
  'assets/images/soda.png',
  'assets/images/tv.png',
];
let winnerImage;
let imageToSpawn = [];
let showingImages = [];

//3 images to spawn + 1 /first round
//4 images to spawn + 1 /second round
//5 images to spawn + 1 /third round

const toggleModal = function (modal) {
  modal.classList.toggle('hidden');
};

const toggleOverlay = function () {
  overlay.classList.toggle('hidden');
};

const switchButtons = function () {
  toggleButton('.ready');
  toggleButton('.start');
};

const removeImages = function () {
  showingImages = document.querySelectorAll('.image');
  showingImages.forEach(e => {
    e.remove();
  });
};

//Random images to spawn
const chooseImages = function (imagesCount, winner) {
  let i = 0;
  let image;
  while (i < imagesCount) {
    image = Math.trunc(Math.random() * images.length);
    if (!imageToSpawn.includes(images[image])) {
      imageToSpawn.push(images[image]);
      i++;
    }
  }
  if (winner) {
    return (winnerImage = images[image]), imageToSpawn;
  } else {
    return imageToSpawn;
  }
};

const toggleButton = function (button) {
  document.querySelector(button).classList.toggle('hidden');
};

const addImage = function () {
  removeImages();
  showImages(chooseImages(difficulty, true), winnerImage);
  imageToSpawn.length = 0;
};

//Generate image elements on the web page
const showImages = function (src, winnerImage) {
  for (let i = 0; i < src.length; i++) {
    const img = document.createElement('img');
    img.className = `image ${src[i] === winnerImage ? 'winner' : 'loser'}`;
    img.src = src[i];
    img.style.position = 'absolute';
    img.style.top =
      document.querySelector('.imagebox').offsetHeight * Math.random() + 'px';
    img.style.left =
      document.querySelector('.imagebox').offsetWidth * Math.random() + 'px';

    document.querySelector('.imagebox').appendChild(img);

    img.addEventListener('click', function () {
      checkChoose(img.className);
    });
  }
};

const checkChoose = function (imageClass) {
  if (playing) {
    if (imageClass === 'image winner') {
      if (round === 3) {
        toggleModal(modalAllWinner);
        toggleOverlay();
      } else {
        toggleModal(modalWinner);
        toggleOverlay();
        round++;
        roundSpan.textContent = round;
        currentImages++;
        removeImages();
        switchButtons();
      }
    } else {
      toggleModal(modalLoser);
      toggleOverlay();
    }
  }
};

const resetGame = function (modal) {
  playing = false;
  round = 1;
  difficulty = 1;
  currentImages = 3;
  imageToSpawn = [];
  showingImages = [];
  roundSpan.textContent = round;
  if (modal) {
    toggleModal(modal);
    toggleOverlay();
  }
  removeImages();
  switchButtons();

  console.log(currentImages);
};

document.querySelector('.start').addEventListener('click', function () {
  showImages(chooseImages(currentImages));
  switchButtons();
  playing = false;
});

document.querySelector('.ready').addEventListener('click', function () {
  addImage();
  playing = true;
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});

modalWinner.addEventListener('click', function () {
  toggleModal(modalWinner);
  toggleOverlay();
});

modalLoser.addEventListener('click', function () {
  resetGame(modalLoser);
});

modalAllWinner.addEventListener('click', function () {
  resetGame(modalAllWinner);
});
