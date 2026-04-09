// 这是要追加的代码，手动合并到 index.html
// 由于命令行解析问题，我把完整代码放在这里

/*
追加到 chartData[i] 后面:

Data[i];
        const isUp = close >= open;
        const color = isUp ? "#00c853" : "#ff1744";

        const x = leftMargin + i * candleW + candleW * 0.15;
        const yTop = chartTop + chartH - ((Math.max(open, close) - minP) / rangeP) * chartH;
        const yBot = chartTop + chartH - ((Math.min(open, close) - minP) / rangeP) * chartH;
        const bodyH = Math.max(1, yBot - yTop);

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + bodyW / 2, yTop);
        ctx.lineTo(x + bodyW / 2, yBot);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillRect(x, yTop, bodyW, bodyH);
      }

      // Current price line
      const curY = chartTop + chartH - ((lastPrice - minP) / rangeP) * chartH;
      ctx.strokeStyle = hypeColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(leftMargin, curY);
      ctx.lineTo(W - rightMargin, curY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = hypeColor;
      ctx.fillRect(W - rightMargin + 2, curY - 8, rightMargin - 4, 16);
      ctx.fillStyle = "#000";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(lastPrice.toFixed(2), W - rightMargin / 2 - 2, curY + 3);

      // Volume
      const volMax = Math.max(...volData);
      for (let i = 0; i < n; i++) {
        const barH = Math.max(1, (volData[i] / volMax) * volH * 0.9);
        const x = leftMargin + i * candleW + candleW * 0.15;
        ctx.fillStyle = chartData[i] >= (i === 0 ? chartData[0] : chartData[i-1]) 
          ? "rgba(0,200,83,0.4)" : "rgba(255,23,68,0.4)";
        ctx.fillRect(x, volBot - barH, bodyW, barH);
      }

      // Rider position
      riderEl.style.left = (W - 120) + "px";
      riderEl.style.top = (130 + curY - 50) + "px";

      document.getElementById("chart-label").textContent =
        "FOMO/USDT  1s  O:" + lastPrice.toFixed(2) + "  H:" + maxP.toFixed(2) + "  L:" + minP.toFixed(2);
    }

    function formatMoney(amount) {
      if (Math.abs(amount) >= 1000000000) return (amount / 1000000000).toFixed(2) + "B";
      if (Math.abs(amount) >= 1000000) return (amount / 1000000).toFixed(2) + "M";
      if (Math.abs(amount) >= 10000) return (amount / 1000).toFixed(1) + "K";
      return Math.floor(Math.abs(amount)).toLocaleString();
    }

    function updateUI() {
      const posValueEl = document.getElementById("position-value");
      const entryValueEl = document.getElementById("entry-value");
      if (position > 0) {
        posValueEl.textContent = position.toFixed(2);
        posValueEl.classList.add("active");
        entryValueEl.textContent = "$" + entryPrice.toFixed(2);
        entryValueEl.classList.add("active");
        sellBtn.disabled = false;
      } else {
        posValueEl.textContent = "-";
        posValueEl.classList.remove("active");
        entryValueEl.textContent = "-";
        entryValueEl.classList.remove("active");
        sellBtn.disabled = true;
      }

      const totalValue = balance + (position > 0 ? position * (lastPrice / entryPrice) : 0);
      balanceEl.textContent = "$" + formatMoney(totalValue);
      balanceEl.className = "";
      if (position > 0) {
        const cur = position * (lastPrice / entryPrice) - position;
        balanceEl.classList.add(cur > 0 ? "up" : "down");
      }

      const pnl = totalValue - STARTING_CAPITAL;
      pnlEl.textContent = (pnl >= 0 ? "+" : "") + "$" + formatMoney(pnl);
      pnlEl.className = pnl >= 0 ? "positive" : "negative";

      document.getElementById("trades-count").textContent = trades;
      document.getElementById("best-trade").textContent = "$" + formatMoney(bestTrade);

      fomoBarFill.style.width = hypeLevel + "%";
      if (hypeLevel > 70) {
        fomoBarFill.style.background = "#ff00ff";
        fomoBarFill.style.boxShadow = "0 0 15px #ff00ff";
      } else if (hypeLevel > 40) {
        fomoBarFill.style.background = "#ff6600";
        fomoBarFill.style.boxShadow = "0 0 10px #ff6600";
      } else {
        fomoBarFill.style.background = "#ff6600";
      }

      if (balance >= 1000000) riderEl.className = "rich";
      else if (hypeLevel > 70) riderEl.className = "peak";
      else if (hypeLevel > 25) riderEl.className = "fomo";
      else if (health <= 0) riderEl.className = "rekt";
      else riderEl.className = "flat";

      const displayCps = calculateCPS();
      if (displayCps >= 5) {
        comboDisplay.style.display = "block";
        comboDisplay.textContent = "x" + displayCps;
        comboDisplay.className = displayCps >= 10 ? "peak" : "";
      } else {
        comboDisplay.style.display = "none";
      }
    }

    // RANDOM EVENTS
    function randomEvent() {
      if (gameover) return;
      
      const events = [
        { text: "🚀 ELON TWEET!", effect: () => { lastPrice *= 1.8; hypeLevel = Math.min(100, hypeLevel + 35); }, type: "fomo" },
        { text: "💰 KOL PUMP!", effect: () => { lastPrice *= 1.5; hypeLevel = Math.min(100, hypeLevel + 20); }, type: "good" },
        { text: "🔥 50X INCOMING!", effect: () => { lastPrice *= 2.5; hypeLevel = Math.min(100, hypeLevel + 40); }, type: "fomo" },
        { text: "🌕 TO THE MOON!", effect: () => { lastPrice *= 2; hypeLevel = Math.min(100, hypeLevel + 35); }, type: "fomo" },
        { text: "🐋 WHALE BUY!", effect: () => { lastPrice *= 1.7; hypeLevel = Math.min(100, hypeLevel + 25); }, type: "fomo" },
        { text: "📉 CZ SELLING!", effect: () => { lastPrice *= 0.5; hypeLevel = Math.max(0, hypeLevel - 25); }, type: "bad" },
        { text: "💀 RUG PULL!", effect: () => { lastPrice *= 0.25; hypeLevel = Math.max(0, hypeLevel - 35); health -= 25; }, type: "bad" },
        { text: "⚡ EXCHANGE HALTS!", effect: () => { balance *= 0.6; position *= 0.6; hypeLevel = Math.max(0, hypeLevel - 30); }, type: "bad" },
      ];
      
      const prob = 0.018 + hypeLevel * 0.0012;
      if (Math.random() < prob) {
        const ev = events[Math.floor(Math.random() * events.length)];
        const el = document.getElementById("event");
        el.textContent = ev.text;
        el.className = ev.type;
        el.style.display = "block";
        ev.effect();
        updateUI();
        for (let i = 0; i < 5; i++) {
          setTimeout(() => spawnIcon(window.innerWidth / 2, window.innerHeight / 2), i * 80);
        }
        setTimeout(() => el.style.display = "none", 2500);
      }
      
      if (Math.random() < 0.005) showKOLShill();
      if (Math.random() < 0.003) triggerBlackSwan();
    }
    
    // KOL SHILL
    function showKOLShill() {
      const shills = [
        { name: "CryptoKing", action: "JUST APED 100K! 🚀" },
        { name: "MoonBoi69", action: "This is THE ONE! 100x incoming!" },
        { name: "DegenTrader", action: "Selling my house for this. WAGMI!" },
        { name: "DiamondApe", action: "Diamond hands only! NO PAPER HANDS!" },
      ];
      const shill = shills[Math.floor(Math.random() * shills.length)];
      
      const popup = document.createElement("div");
      popup.innerHTML = '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a1a2e;border:2px solid #ffd700;padding:20px;z-index:500;text-align:center;font-family:monospace;"><div style="font-size:40px;margin-bottom:10px;">👨‍💼</div><div style="color:#ffd700;font-size:14px;">' + shill.name + ' just followed $FOMO</div><div style="color:#888;font-size:12px;margin-top:10px;">' + shill.action + '</div><button id="kol-btn" style="margin-top:15px;padding:8px 20px;background:#ffd700;color:#000;border:none;cursor:pointer;font-weight:bold;">FOLLOW</button></div>';
      document.body.appendChild(popup);
      
      document.getElementById("kol-btn").onclick = function() {
        if (position === 0 && balance > 0) {
          position = balance;
          entryPrice = lastPrice * 1.1;
          balance = 0;
          hypeLevel = Math.min(100, hypeLevel + 20);
          spawnDanmuBurst(["FOLLOW THE KOL!", "APE IN!", "TRUST ME BRO"]);
          updateUI();
        }
        popup.remove();
      };
      
      setTimeout(function() { popup.remove(); }, 5000);
    }

    // MAIN LOOP
    let frameCount = 0;
    function gameLoop() {
      frameCount++;
      
      if (frameCount % 3 === 0) {
        if (!gameover) {
          gameTime++;
          survivalTime++;
          if (survivalTime >= 300 && !achievements.survival.unlocked) unlockAchievement("survival");
        }
        generateCandle();
        if (gameTime % 10 === 0) randomEvent();
        if (gameTime % 20 === 0) updateFGI();
        if (gameTime % 5 === 0) updateHeartbeat();
        if (gameTime % 30 === 0) addTweet();
      }

      drawChart();
      updateUI();

      if (Math.random() < 0.012) spawnDanmu();

      requestAnimationFrame(gameLoop);
    }

    // INIT
    updateUI();
    gameLoop();
    addTweet();
    addTweet();
    
    window.closeAlert = closeAlert;
    window.takeLastChance = takeLastChance;
    window.closeLastChance = closeLastChance;
    window.revenge = revenge;
    window.closePhoneCall = closePhoneCall;
*/
