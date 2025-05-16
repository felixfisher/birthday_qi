// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有卡片动画
    initCards();
    
    // 初始化导航
    initNavigation();
    
    // 初始化倒计时
    initCountdown();
    
    // 初始化图片缩放功能
    initImageZoom();
    
    // 初始化时间线动画
    initTimelineAnimation();
    
    // 初始化拼图游戏
    initPuzzleGame();
    
    // 初始化生日占卜
    initFortune();
    
    // 初始化愿望墙
    initWishWall();
    
    // 初始化音乐控制
    initMusicControl();
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 添加星空背景粒子效果
    createStars();
});

// 初始化所有卡片动画
function initCards() {
    const cards = document.querySelectorAll('.glass-card');
    
    // 给所有卡片添加活跃状态
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('active');
        });
    }, 300);
    
    // 当滚动时，检查卡片是否在视口中
    window.addEventListener('scroll', function() {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('active');
            }
        });
    });
}

// 初始化导航
function initNavigation() {
    const navLinks = document.querySelectorAll('.page-nav a');
    const sections = document.querySelectorAll('.page-section');
    
    // 点击导航链接时，滚动到相应部分
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // 滚动时，更新活动的导航链接
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 倒计时功能
function initCountdown() {
    // 设置目标生日日期 (2025-05-18)
    const birthday = new Date(2025, 4, 18); // 月份从0开始，所以5月是4
    
    // 更新倒计时
    function updateCountdown() {
        const now = new Date();
        const diff = birthday - now;
        
        // 计算天、时、分、秒
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // 更新DOM元素
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // 立即执行一次
    updateCountdown();
    
    // 每秒更新一次
    setInterval(updateCountdown, 1000);
}

// 初始化图片缩放功能
function initImageZoom() {
    const zoomableImages = document.querySelectorAll('.zoomable-img');
    let originalWidth, originalHeight;
    
    zoomableImages.forEach(img => {
        // 预加载图片以获取原始尺寸
        const tempImg = new Image();
        tempImg.src = img.src;
        tempImg.onload = function() {
            img.dataset.originalWidth = this.width;
            img.dataset.originalHeight = this.height;
        };
        
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.classList.contains('zoomed')) {
                // 缩小图片
                this.classList.remove('zoomed');
                document.body.classList.remove('image-zoomed');
                this.style.width = '';
                this.style.height = '';
            } else {
                // 放大图片
                this.classList.add('zoomed');
                document.body.classList.add('image-zoomed');
                
                // 计算图片应该显示的尺寸
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const imgWidth = parseInt(this.dataset.originalWidth);
                const imgHeight = parseInt(this.dataset.originalHeight);
                
                // 如果图片原始尺寸大于视口
                if (imgWidth > viewportWidth * 0.9 || imgHeight > viewportHeight * 0.9) {
                    const scaleX = viewportWidth * 0.9 / imgWidth;
                    const scaleY = viewportHeight * 0.9 / imgHeight;
                    const scale = Math.min(scaleX, scaleY);
                    
                    this.style.width = `${imgWidth * scale}px`;
                    this.style.height = `${imgHeight * scale}px`;
                } else {
                    // 使用原始尺寸
                    this.style.width = `${imgWidth}px`;
                    this.style.height = `${imgHeight}px`;
                }
            }
        });
    });
    
    // 点击其他地方关闭放大的图片
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('zoomable-img')) {
            const zoomedImage = document.querySelector('.zoomed');
            if (zoomedImage) {
                zoomedImage.classList.remove('zoomed');
                document.body.classList.remove('image-zoomed');
                zoomedImage.style.width = '';
                zoomedImage.style.height = '';
            }
        }
    });
    
    // 添加ESC键关闭功能
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const zoomedImage = document.querySelector('.zoomed');
            if (zoomedImage) {
                zoomedImage.classList.remove('zoomed');
                document.body.classList.remove('image-zoomed');
                zoomedImage.style.width = '';
                zoomedImage.style.height = '';
            }
        }
    });
}

// 初始化时间线动画
function initTimelineAnimation() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    
    function checkTimelineNodes() {
        timelineNodes.forEach(node => {
            const nodePosition = node.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;
            
            if (nodePosition < screenPosition) {
                node.classList.add('visible');
            }
        });
    }
    
    // 初始检查
    setTimeout(checkTimelineNodes, 500);
    
    // 滚动时检查
    window.addEventListener('scroll', checkTimelineNodes);
}

// 初始化拼图游戏
function initPuzzleGame() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const startButton = document.getElementById('startPuzzle');
    const size = 3; // 3x3拼图
    const pieces = [];
    let emptyIndex = size * size - 1; // 最后一块拼图为空
    let puzzleStarted = false;
    
    // 创建拼图
    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        pieces.length = 0;
        
        for (let i = 0; i < size * size - 1; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = 'url(images/00.jpg)';
            piece.style.backgroundSize = '300% 300%';
            piece.style.backgroundPosition = `${(i % size) * 50}% ${Math.floor(i / size) * 50}%`;
            piece.dataset.index = i;
            
            piece.addEventListener('click', () => {
                if (puzzleStarted) {
                    movePiece(i);
                }
            });
            
            pieces.push(piece);
            puzzleContainer.appendChild(piece);
        }
        
        // 添加空白格
        const emptyPiece = document.createElement('div');
        emptyPiece.classList.add('puzzle-piece', 'empty');
        emptyPiece.style.backgroundColor = '#1a1a1a';
        emptyPiece.dataset.index = size * size - 1;
        pieces.push(emptyPiece);
        puzzleContainer.appendChild(emptyPiece);
        
        emptyIndex = size * size - 1;
        puzzleStarted = false;
    }
    
    // 移动拼图
    function movePiece(index) {
        // 检查是否可以移动
        if (isAdjacent(index, emptyIndex)) {
            // 交换拼图
            swapPieces(index, emptyIndex);
            emptyIndex = index;
            
            // 检查是否完成
            if (checkComplete()) {
                showCongratulation();
                puzzleStarted = false;
            }
        }
    }
    
    // 检查两块拼图是否相邻
    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / size);
        const col1 = index1 % size;
        const row2 = Math.floor(index2 / size);
        const col2 = index2 % size;
        
        return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
    }
    
    // 交换拼图位置
    function swapPieces(index1, index2) {
        // 交换DOM元素
        const temp = pieces[index1].style.backgroundPosition;
        pieces[index1].style.backgroundPosition = pieces[index2].style.backgroundPosition;
        pieces[index2].style.backgroundPosition = temp;
        
        // 交换背景色
        const tempBg = pieces[index1].style.backgroundColor;
        pieces[index1].style.backgroundColor = pieces[index2].style.backgroundColor;
        pieces[index2].style.backgroundColor = tempBg;
        
        // 交换类
        pieces[index1].classList.toggle('empty');
        pieces[index2].classList.toggle('empty');
    }
    
    // 检查拼图是否完成
    function checkComplete() {
        for (let i = 0; i < size * size - 1; i++) {
            if (pieces[i].style.backgroundPosition !== `${(i % size) * 50}% ${Math.floor(i / size) * 50}%`) {
                return false;
            }
        }
        return true;
    }
    
    // 显示祝贺信息
    function showCongratulation() {
        alert('恭喜你完成拼图！🎂 生日快乐！');
        // 显示完整图片
        puzzleContainer.innerHTML = '';
        puzzleContainer.style.backgroundImage = 'url(images/00.jpg)';
        puzzleContainer.style.backgroundSize = 'cover';
        puzzleContainer.style.backgroundPosition = 'center';
    }
    
    // 打乱拼图
    function shufflePuzzle() {
        const moves = 100; // 随机移动100次
        
        for (let i = 0; i < moves; i++) {
            const adjacentPieces = [];
            
            // 找出所有与空白格相邻的拼图
            for (let j = 0; j < size * size; j++) {
                if (isAdjacent(j, emptyIndex)) {
                    adjacentPieces.push(j);
                }
            }
            
            // 随机选择一个相邻拼图移动
            const randomIndex = Math.floor(Math.random() * adjacentPieces.length);
            const pieceToMove = adjacentPieces[randomIndex];
            
            // 移动拼图
            swapPieces(pieceToMove, emptyIndex);
            emptyIndex = pieceToMove;
        }
        
        puzzleStarted = true;
    }
    
    // 点击开始按钮开始游戏
    startButton.addEventListener('click', function() {
        createPuzzle();
        setTimeout(shufflePuzzle, 500);
    });
    
    // 初始化拼图
    createPuzzle();
}

// 初始化生日占卜
function initFortune() {
    const fortuneText = document.getElementById('fortune-text');
    const generateButton = document.getElementById('generateFortune');
    
    const fortunes = [
        "一年的好运始于今日，愿你的25岁充满惊喜和成就。",
        "星星为你许愿，花为你开放，这一年将会是最特别的旅程。",
        "你的微笑是世界的礼物，愿你永远保持这份纯真和美丽。",
        "勇敢追逐梦想，这一年将会实现你最大的愿望。",
        "在这特别的日子，宇宙赐予你无限能量，去创造美好的未来。",
        "你的天赋和魅力将在这一年大放异彩，去绽放你的光芒吧！",
        "过去的岁月已成回忆，未来的幸福就在眼前，珍惜当下的每一刻。",
        "生日是新的开始，愿你在新的一年里找到内心的平静与满足。"
    ];
    
    generateButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        fortuneText.textContent = fortunes[randomIndex];
        
        // 添加动画效果
        fortuneText.style.animation = 'none';
        setTimeout(() => {
            fortuneText.style.animation = 'fadeIn 1s';
        }, 10);
    });
}

// 初始化愿望墙
function initWishWall() {
    const wishInput = document.getElementById('wishInput');
    const saveButton = document.getElementById('saveWish');
    const wishDisplay = document.getElementById('wishDisplay');
    const savedWish = document.getElementById('savedWish');
    
    saveButton.addEventListener('click', function() {
        const wish = wishInput.value.trim();
        
        if (wish) {
            savedWish.textContent = wish;
            wishInput.value = '';
            
            // 隐藏输入框，显示保存的愿望
            document.querySelector('.wish-form').classList.add('hidden');
            wishDisplay.classList.remove('hidden');
            
            setTimeout(() => {
                wishDisplay.classList.add('visible');
            }, 100);
        }
    });
}

// 初始化音乐控制
function initMusicControl() {
    const musicButton = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // 添加音频事件监听器用于调试
    bgMusic.addEventListener('error', function(e) {
        console.error('音频加载错误:', e);
    });
    
    bgMusic.addEventListener('canplaythrough', function() {
        console.log('音频可以播放');
    });
    
    bgMusic.addEventListener('playing', function() {
        console.log('音频开始播放');
    });
    
    bgMusic.addEventListener('pause', function() {
        console.log('音频暂停');
    });
    
    // 尝试自动播放
    function tryAutoPlay() {
        console.log('尝试自动播放...');
        bgMusic.play().then(() => {
            console.log('自动播放成功');
            isPlaying = true;
            musicButton.classList.add('playing');
        }).catch(error => {
            console.error('自动播放失败:', error);
            isPlaying = false;
            musicButton.classList.remove('playing');
        });
    }
    
    // 页面加载完成后尝试自动播放
    document.addEventListener('DOMContentLoaded', tryAutoPlay);
    
    // 用户第一次点击页面时尝试播放
    document.addEventListener('click', function firstClick() {
        console.log('用户点击页面，尝试播放...');
        if (!isPlaying) {
            tryAutoPlay();
        }
        document.removeEventListener('click', firstClick);
    }, { once: true });
    
    musicButton.addEventListener('click', function() {
        console.log('音乐按钮被点击');
        if (isPlaying) {
            bgMusic.pause();
            musicButton.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                console.log('手动播放成功');
                musicButton.classList.add('playing');
            }).catch(error => {
                console.error('手动播放失败:', error);
            });
        }
        
        isPlaying = !isPlaying;
    });
}

// 初始化返回顶部按钮
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 创建星空背景
function createStars() {
    const starsContainer = document.querySelector('.stars');
    
    // 添加额外的流星效果
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // 随机位置
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        
        starsContainer.appendChild(shootingStar);
        
        // 动画结束后移除元素
        setTimeout(() => {
            shootingStar.remove();
        }, 1000);
    }, 3000);
}

// 计算年龄
function calculateAge() {
    const birthDate = new Date(1999, 4, 17); // 1999年5月17日
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // 检查是否已经过了今年的生日
    const hasBirthdayOccurredThisYear = (
        today.getMonth() > birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
    );
    
    if (!hasBirthdayOccurredThisYear) {
        age--;
    }
    
    return age;
}

// 添加页面滚动动画效果
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}); 