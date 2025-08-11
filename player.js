document.addEventListener('DOMContentLoaded', () => {
    // Обработка всех плееров
    document.querySelectorAll('.play-btn').forEach(btn => {
        const audio = new Audio(btn.dataset.audio);
        const progressBar = btn.closest('.track-controls').querySelector('.progress-bar');
        const timeDisplay = btn.closest('.track-controls').querySelector('.time');
        const volumeSlider = btn.closest('.track-controls').querySelector('.volume-slider');
        
        // Воспроизведение/пауза
        btn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                btn.classList.add('playing');
            } else {
                audio.pause();
                btn.classList.remove('playing');
            }
        });
        
        // Обновление прогресса
        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percent}%`;
            
            // Форматирование времени
            const formatTime = (seconds) => {
                const min = Math.floor(seconds / 60);
                const sec = Math.floor(seconds % 60);
                return `${min}:${sec < 10 ? '0' : ''}${sec}`;
            };
            
            timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        });
        
        // Перемотка по клику на прогресс-бар
        progressBar.parentElement.addEventListener('click', (e) => {
            const rect = progressBar.parentElement.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const width = rect.width;
            const time = (offsetX / width) * audio.duration;
            audio.currentTime = time;
        });
        
        // Управление громкостью
        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });
        
        // Конец трека
        audio.addEventListener('ended', () => {
            btn.classList.remove('playing');
        });
    });
});