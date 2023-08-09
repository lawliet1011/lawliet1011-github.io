const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const header = $('header h2');
const cdThumb = $('.cd');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('.progress');
const timeMusic = $('.time-music');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const rdmBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const title = $('.title');

//Xử lý quay/ dừng CD
const cdRotate = cdThumb.animate([
    { transform: 'rotate(360deg)' }
], {
    duration: 15000,
    iterations: Infinity
});
cdRotate.pause();

const app = {
    currentIndex: 0,
    isRandom: false,

    song: [
    {
        name: 'Rapper vĩ đại',
        singer: 'ICD',
        path: '../music/Track 2. Rapper vĩ đại.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'LD 1331',
        singer: 'ICD',
        path: '../music/Track 3. LD 1331(ft Freaky Di).wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Mất cân bằng',
        singer: 'ICD',
        path: '../music/Track 4. Mất cân bằng(ft KADIOUS).wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Rebirth',
        singer: 'ICD',
        path: '../music/Track 5. Rebirth.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Chặng hành trình',
        singer: 'ICD',
        path: '../music/Track 6. Chặng hành trình.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Ngày dài',
        singer: 'ICD',
        path: '../music/Track 7. Ngày dài(ft Thanh Thanh).wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Shoot me babe',
        singer: 'ICD',
        path: '../music/Track 8. Shoot me babe(ft KADIOUS).wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Họ trông chờ gì ở tôi',
        singer: 'ICD',
        path: '../music/Track 9. Họ trông chờ gì ở tôi.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: '16',
        singer: 'ICD',
        path: '../music/Track 10. 16.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'My team',
        singer: 'ICD',
        path: '../music/Track 11. My team.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Buffet',
        singer: 'ICD',
        path: '../music/Track 12. Buffet(ft Freaky Di).wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Slender Man',
        singer: 'ICD',
        path: '../music/Track 13. Slender Man.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Kíp nổ',
        singer: 'ICD',
        path: '../music/Track 14. Kíp nổ.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Winner',
        singer: 'ICD',
        path: '../music/Track 15. Winner.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Dòng thời gian',
        singer: 'ICD',
        path: '../music/Track 16. Dòng thời gian.wav',
        image: '../img/icd2.jpg'
    },
    {
        name: 'Say',
        singer: 'ICD',
        path: '../music/Track 17. Say F(ft TOM).wav',
        image: '../img/icd2.jpg'
    }
    ],

    render: function (){
        const playListHTML = this.song.map(function(song, index){
            return `
                <div class="song song-${index}" onclick="app.playWhenClickSong(${index})">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });

        playlist.innerHTML = playListHTML.join('');
    },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.song[this.currentIndex];
            }
        });
    },

    handleFuction: function(){
        const cd = $('.cd');
        cdWidth = cd.offsetWidth;

        //Xử lý phóng to/ thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;



            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        //Xử lý khi click play
        playBtn.onclick = function(){
            if(audio.paused){
                audio.play();
                player.classList.add('playing');
                cdRotate.play();
            }else{
                audio.pause();
                player.classList.remove('playing');
                cdRotate.pause();
            }        
        };

        //Xử lý next
        nextBtn.onclick = function(){
            app.currentIndex++;
            if(app.currentIndex >= app.song.length){
                app.currentIndex = 0;
            }

            if(app.isRandom) {
                app.loadRandomSong();
            } else {
                app.loadCurrentSong();
            }

            app.activeSong();
            app.scrollToActiveSong();

            if(audio.paused){
                audio.play();
                player.classList.add('playing');
                cdRotate.play();
            }    
        }

        //Xử lý prev
        prevBtn.onclick = function(){
            app.currentIndex--;
            if(app.currentIndex < 0){
                app.currentIndex = app.song.length - 1;
            }

            if(app.isRandom) {
                app.loadRandomSong();
            } else {
                app.loadCurrentSong();
            }

            app.activeSong();
            app.scrollToActiveSong();

            if(audio.paused){
                audio.play();
                player.classList.add('playing');
                cdRotate.play();
            }   
        }

        //Xử lý random
        rdmBtn.onclick = function(){
            app.isRandom = !app.isRandom;
            rdmBtn.classList.toggle('active', app.isRandom);
        }

        //Xử lý next song khi ended
        audio.onended = function(){
            if(audio.loop){
                audio.play();
            }else nextBtn.click();
        }

        //Xử lý repeat
        repeatBtn.onclick = function(){
            audio.loop =!audio.loop;
            repeatBtn.classList.toggle('active', audio.loop);
        }
    
        //Xử lý thanh progress
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        };

        //Xử lý tua 
        progress.oninput = function(e){
            const seekTime = e.target.value/100 * audio.duration;
            progress.onmouseup = function(){
            audio.currentTime = seekTime;
            }
        }
    },

    activeSong: function(){
        let activeSong = $(`.song-${app.currentIndex}`);
        let allSongs = $$('.song');

        for(let i = 0; i < app.song.length; i++)
            allSongs[i].classList.remove('active');
        activeSong.classList.add('active');
    },

    loadCurrentSong: function() {
        header.innerText = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    loadRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * app.song.length);
        }while(app.currentIndex === newIndex);
        app.currentIndex = newIndex;
        app.loadCurrentSong();
    },

    scrollToActiveSong: function() {
        let activeSong = $(`.song.active`);
        setTimeout(() => {
            activeSong.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end'
            });            
        }, 300)
    },

    playWhenClickSong: function(index){
        app.currentIndex = index;
        app.loadCurrentSong();
        app.activeSong();

        if(audio.paused){
            audio.play();
            player.classList.add('playing');
            cdRotate.play();
        }else{
            audio.pause();
            player.classList.remove('playing');
            cdRotate.pause();
        }  
    },

    start: function (){
        //Định nghĩa các thuộc tính cho object.
        this.defineProperties();

        //Lắng nghe/ xử lý sự kiện
        this.handleFuction();

        //Tải bài hát hiện tại
        this.loadCurrentSong();

        //Render
        this.render();

        //Active bài hát hiện tại
        this.activeSong();
    }
};

app.start();

