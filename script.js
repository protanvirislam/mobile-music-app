// All DOM Selector
const bar = document.querySelector(".main-bar");
const swipe = document.querySelector(".swipe-bar");
const playPause = document.querySelector(".play-pause");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const shuffle = document.querySelector(".shuffle");
const playList = document.querySelector(".play-list");
const musicMeta = document.querySelector(".music-meta");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
const displayList = document.querySelector(".all-music-list");

let currentMusic;
let currentIndex = 0;
let shuffleState = "normal";
let isSwitchList = true;

const musicList = [
  {
    title: "indila love story",
    singer: "Indila @tanvir.com.ng",
    cover: "./img/images.jpeg",
    song: "./songs/Indila_-_Love_Story_Vistanaij.com.ng.mp3",
  },
  {
    title: "Ayla",
    singer: "Anirudh X AR Rahman",
    cover: "./img/artworks-000090728608-qjo200-t500x500.jpg",
    song: "./songs/Aiyla - I 128 Kbps.mp3",
  },
  {
    title: "Ennodu Nee",
    singer: "AR Rahman",
    cover: "./img/artworks-000107318729-t5amod-t500x500.jpg",
    song: "./songs/Ennodu Nee Irundhaal Bgm.mp3",
  },
  {
    title: "Issak Taari",
    singer: "Vikram",
    cover: "./img/hq720.jpg",
    song: "./songs/Issak Taari - I 128 Kbps.mp3",
  },
  {
    title: "The Beutiful Theme",
    singer: "Vikram X Amy J",
    cover: "./img/MV5BMTQyNDk3ODM1N15BMl5BanBnXkFtZTgwMTk1NjU5MzE@._V1_.jpg",
    song: "./songs/The Beautiful Land Bgm.mp3",
  },
  {
    title: "Ennodu Nee",
    singer: "AR Rahman",
    cover: "./img/artworks-000107318729-t5amod-t500x500.jpg",
    song: "./songs/Ennodu Nee Irundhaal Bgm.mp3",
  },
  {
    title: "Ennodu Nee",
    singer: "AR Rahman",
    cover: "./img/artworks-000107318729-t5amod-t500x500.jpg",
    song: "./songs/Ennodu Nee Irundhaal Bgm.mp3",
  },
];

function renderMusic(obj) {
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  musicMeta.innerHTML = "";

  let html = `<div class="title">${obj.title}</h4></div>
    <div class="singer"><span>${obj.singer}</span></div>
    <div class="attribute"><span>DeepField</span></div>
    <!-- Music Cover Image -->
    <div class="music-cover">
      <img src="${obj.cover}" />
    </div> `;
  musicMeta.insertAdjacentHTML("afterbegin", html);

  currentMusic = new Audio(obj.song);

  currentMusic.addEventListener("loadedmetadata", () => {
    endTime.innerHTML =
      `${Math.floor(currentMusic.duration / 60)}`.padStart(2, "0") +
      ":" +
      `${Math.floor(currentMusic.duration % 60)}`.padStart(2, "0");
  });
}

function swipeMusic(e) {
  const rect = this.getBoundingClientRect();
  let currentPoint = e.clientX - rect.left;

  let skipTime = (currentMusic.duration / rect.width) * currentPoint;
  currentMusic.currentTime = skipTime;

  let currentBarPosition =
    (rect.width / currentMusic.duration) *
    currentMusic.currentTime *
    (100 / rect.width);

  swipe.style.setProperty("--var-swipe", `${currentBarPosition}%`);
}

function playPauseMusic() {
  if (currentMusic.paused) {
    currentMusic.play();
    playPause.children[0].classList.remove("fa-circle-play");
    playPause.children[0].classList.add("fa-circle-pause");
  } else {
    currentMusic.pause();
    playPause.children[0].classList.remove("fa-circle-pause");
    playPause.children[0].classList.add("fa-circle-play");
  }
}

function nextMusic() {
  if (shuffleState === "normal") {
    if (currentIndex < musicList.length - 1) {
      currentIndex++;
      renderMusic(musicList[currentIndex]);
      playPauseMusic();
    } else {
      currentIndex = 0;
      renderMusic(musicList[currentIndex]);
      playPauseMusic();
    }
  } else if (shuffleState === "random") {
    currentIndex = Math.floor(Math.random() * musicList.length);
    renderMusic(musicList[currentIndex]);
    playPauseMusic();
  } else if (shuffleState === "repeat") {
    if (currentIndex < musicList.length - 1) {
      currentIndex++;
      renderMusic(musicList[currentIndex]);
      playPauseMusic();
    } else {
      currentIndex = 0;
      renderMusic(musicList[currentIndex]);
      playPauseMusic();
    }
  }

  renderPlayList();
}

function prevMusic() {
  if (shuffleState === "normal") {
    if (currentIndex > 0 && currentIndex < musicList.length) {
      currentIndex--;
      renderMusic(musicList[currentIndex]);

      playPauseMusic();
    } else {
      currentIndex = 0;
      renderMusic(musicList[currentIndex]);
    }
  } else if (shuffleState === "random") {
    currentIndex = Math.floor(Math.random() * musicList.length);
    renderMusic(musicList[currentIndex]);
    playPauseMusic();
  } else if (shuffleState === "repeat") {
    if (currentIndex > 0 && currentIndex < musicList.length) {
      currentIndex--;
      renderMusic(musicList[currentIndex]);

      playPauseMusic();
    } else {
      currentIndex = 0;
      renderMusic(musicList[currentIndex]);
    }
  }

  renderPlayList();
}

function shuffleMusic(e) {
  if (shuffleState === "normal") {
    e.target.classList.remove("fa-repeat");
    e.target.classList.add("fa-shuffle");
    shuffleState = "random";

    return;
  } else if (shuffleState === "random") {
    e.target.classList.remove("fa-shuffle");
    e.target.classList.add("fa-arrow-rotate-right");
    shuffleState = "repeat";

    return;
  } else {
    e.target.classList.remove("fa-arrow-rotate-right");
    e.target.classList.add("fa-repeat");
    shuffleState = "normal";

    return;
  }
}

function playListHandle() {
  if (isSwitchList) {
    displayList.style.height = "300px";
    renderPlayList();
    isSwitchList = !isSwitchList;
  } else {
    displayList.style.height = "0px";
    isSwitchList = !isSwitchList;
  }
}

function renderingTimerandBar() {
  let totalDuration = currentMusic.duration;
  let currentDuration = currentMusic.currentTime;
  let width = bar.clientWidth;
  let pixel = (width / totalDuration) * currentDuration;

  let percent = (100 / width) * pixel;
  swipe.style.setProperty("--var-swipe", `${percent}%`);

  startTime.innerHTML =
    `${Math.floor(currentDuration / 60)}`.padStart(2, "0") +
    ":" +
    `${Math.floor(currentDuration % 60)}`.padStart(2, "0");
  if (currentDuration === totalDuration) {
    //Music Running condition
    if (shuffleState === "repeat") {
      currentIndex = currentIndex;
      renderMusic(musicList[currentIndex]);
      playPauseMusic();
    } else if (shuffleState === "random") {
      currentIndex = Math.floor(Math.random() * musicList.length);
      renderMusic(musicList[currentIndex]);
      playPauseMusic();
    } else {
      nextMusic();
    }
  }
}

function playFromList(e) {

  let parent = e.target.parentNode.parentNode;

  currentIndex = +parent.getAttribute("data-set");

  renderMusic(musicList[currentIndex]);
  renderPlayList();
  playPauseMusic();
}

//Helper Function

function renderPlayList() {
  displayList.innerHTML = "";
  musicList.forEach((music, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-set", index);

    li.innerHTML = `
  
       <div class='cover-image'>
        <img src="${music.cover}"  title=${music.title}/>
       </div>
        <div class="box">
          <span class="list-title">${music.title}</span>
          <span class="list-singer">${music.singer}</span>
        </div>
        <span class="playing"> ${
          currentIndex === index
            ? '<i class="fa-solid fa-volume-high"></i>'
            : '<i class="fa-solid fa-play"></i>'
        } </i></span>
    
    `;

    if (currentIndex === index) {
      li.style.background = "rgba(0,0,0,0.9)";
    }

    displayList.appendChild(li);
  });
}

//Function Calling
renderMusic(musicList[currentIndex]);
currentMusic.addEventListener("loadedmetadata", () => {
  setInterval(() => {
    renderingTimerandBar();
  }, 1000);
});

// Event Handler

bar.addEventListener("click", swipeMusic);

playPause.addEventListener("click", playPauseMusic);

next.addEventListener("click", nextMusic);

prev.addEventListener("click", prevMusic);

playList.addEventListener("click", playListHandle);

displayList.addEventListener("click", playFromList);

shuffle.addEventListener("click", shuffleMusic);
