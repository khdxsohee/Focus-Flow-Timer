  let time = 10 * 60;
    let timerInterval;
    let sessions = 0;
    let moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];

    function updateDisplay() {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      document.getElementById("timer").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
      if (timerInterval) return;
      timerInterval = setInterval(() => {
        if (time > 0) {
          time--;
          updateDisplay();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          sessions++;
          document.getElementById("moodButtons").style.display = "flex";
        }
      }, 1000);
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      time = 50 * 60;
      updateDisplay();
      document.getElementById("moodButtons").style.display = "none";
    }

    function logMood(mood) {
      moodLog.push({ session: sessions, mood });
      localStorage.setItem("moodLog", JSON.stringify(moodLog));
      document.getElementById("moodButtons").style.display = "none";
      resetTimer();
      showSummary();
    }

    function showSummary() {
      const total = moodLog.length;
      const happy = moodLog.filter(m => m.mood === "😊").length;
      const neutral = moodLog.filter(m => m.mood === "😐").length;
      const sad = moodLog.filter(m => m.mood === "😞").length;
      document.getElementById("summary").innerHTML =
        `Sessions: ${total} | 😊 ${happy} | 😐 ${neutral} | 😞 ${sad}`;
    }

    updateDisplay();
    showSummary();