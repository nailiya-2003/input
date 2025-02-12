let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;

      // Вычисляем изменение координат (скорость)
      this.velX = this.touchMoveX - this.prevTouchX;
      this.velY = this.touchMoveY - this.prevTouchY;

      // Обновляем позицию бумаги в соответствии с движением пальца
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      // Применяем стили (перемещение и вращение)
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

      // Обновляем предыдущие координаты
      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;
    });

    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      // Повышаем z-index для того, чтобы картинка была выше всех других
      paper.style.zIndex = highestZ;
      highestZ += 1;

      // Начальные координаты для отслеживания движения пальца
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Для двухпальцевого вращения на сенсорных экранах
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
