const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist =$('.playlist')
const cd = $('.cd')
const h2 = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('audio')
const playbtn = $('.btn-toggle-play')
const player = $('.player')
var isplay = true;
const progess = $('.progress')
const redo = $('.fa-redo')
const next = $('.btn-next')
const prev = $('.btn-prev')
const app = {
    currentIndex:0,
    songs : [
        {
            name:'Định Mệnh',
            singer:'Noo Phước Thịnh',
            path:'/songs/song4.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/d/e/b/6deb8ea62749618d200bbe270ade7f3e.jpg'
        },
        {
            name:'Chạm khẽ tim anh một chút thôi',
            singer:'Noo Phước Thịnh',
            path:'/songs/song6.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/d/e/b/6deb8ea62749618d200bbe270ade7f3e.jpg'
        },
        {
            name:'Em đã thương người ta hơn anh',
            singer:'Noo Phước Thịnh',
            path:'/songs/song8.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/d/e/b/6deb8ea62749618d200bbe270ade7f3e.jpg'
        },
        {
            name:'Yêu một người sao buồn đến thế',
            singer:'Noo Phước Thịnh',
            path:'/songs/song10.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/0/c/3/e0c341956a038d66b77275b20168b112.jpg'
        },
        {
            name:'Thương em là điều anh không thể ngờ',
            singer:'Noo Phước Thịnh',
            path:'/songs/song2.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/6/5/1/6/6516b96ae8353ef11f6b7148c74bb387.jpg'
        },
        {
            name:'Cause I Love You',
            singer:'Noo Phước Thịnh',
            path:'/songs/song7.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/8/f/0/d/8f0da549f6cf94288361aac93d05d284.jpg'
        },
        {
            name:'Thương mấy cũng là người dưng',
            singer:'Noo Phước Thịnh',
            path:'/songs/song7.mp3',
            image:''
        },
        {
            name:'Cơn mơ băng giá',
            singer:'Noo Phước Thịnh',
            path:'songs/song5.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/d/d/9/bdd90e2f31c41756ba054b6d96ccd674.jpg'
        },
        {
            name:'Những kẻ mộng mơ',
            singer:'Noo Phước Thịnh',
            path:'/songs/song1.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/4/3/c/143c3e0f7a42b90009f5738899280003.jpg'
        },
        {
            name:'Chợt thấy em khóc',
            singer:'Noo Phước Thịnh',
            path:'songs/song11.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/7/c/0/97c0d89266b572d570062a0b7abbb99a.jpg'
        }
    ],

    render : function() {
        var htmls  = this.songs.map(function(song) {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineproperties: function() {
        Object.defineProperty(this,'currentSong',{
            get : function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    redo : function() {
        audio.currentTime=0
        audio.play();
        audio.onplay = function() {
            player.classList.add("playing")
            isplay=false
        } 
    },
    HandleEvent: function() {
        const cdWidth = cd.offsetWidth
        document.onscroll = function() {
            const onscrollTop = document.documentElement.scrollTop||window.scrollY;
            const newcdwidth  = cdWidth-onscrollTop;
            cd.style.width = newcdwidth>0?newcdwidth+'px':0
            cd.style.opacity = newcdwidth/cdWidth
        },
        playbtn.onclick = function() {
            if(isplay)
                audio.play()
            else
                audio.pause()
            audio.onplay = function() {
                player.classList.add("playing")
                isplay=false
            } 
            audio.onpause = function() {
                player.classList.remove("playing")
                isplay=true
            }
        },
        audio.ontimeupdate = function() {
            progess.value = (audio.currentTime / audio.duration)*100
            if(audio.ended)
                app.redo()
        },
        redo.onclick = function() {
            app.redo()
        },
        progess.onchange = function(){
            audio.currentTime = (progess.value*audio.duration)/100
            progess.value = (progess.value*audio.duration)/100
        },
        next.onclick = function() {
            if(app.currentIndex<(app.songs.length-1))
                app.currentIndex++;
            else
                app.currentIndex=0;
            app.LoadCurrentSong();
            app.redo()
        }
        prev.onclick = function() {
            if(app.currentIndex>0)
                app.currentIndex--;
            else
                app.currentIndex = app.songs.length-1;
            app.LoadCurrentSong();
            app.redo()
        }
        const listsongs = $$('.song')
        listsongs.forEach(function(song,index) {
            song.onclick = function() {
                app.currentIndex = index;
                app.LoadCurrentSong();
                app.redo()
            }
        })
    },
    LoadCurrentSong : function() {
      h2.textContent = `${this.currentSong.name}`
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
    },
    start :function() {
        this.defineproperties()
        this.LoadCurrentSong()
        this.render()
        this.HandleEvent()       
    },
}
app.start()