const music = document.getElementById("bgMusic");
const typeSound = document.getElementById("typeSound");
const hint = document.getElementById("hint");
const wishText = document.getElementById("wishText");
const tickSound = document.getElementById("tickSound");

const introScreen = document.getElementById("introScreen");
const introText = document.getElementById("introText");

let wishesStarted = false;

/* ===== TYPE ===== */
function typeText(el, text, speed, callback) {
    let i = 0;
    el.textContent = "";

    const interval = setInterval(() => {
        el.textContent += text[i++];
        typeSound.currentTime = 0;
        typeSound.play();

        if (i >= text.length) {
            clearInterval(interval);
            callback && callback();
        }
    }, speed);
}

/* ===== MAIN CONTENT (GIỮ NGUYÊN LOGIC) ===== */
function startMain() {
    const nameEl = document.getElementById("nameText");
    const dobEl = document.getElementById("dobText");

    typeText(nameEl, "Phạm Huyền Trang", 120, () => {
        nameEl.classList.replace("solid", "glow");

        setTimeout(() => {
            typeText(dobEl, "16-12-2004", 140, () => {
                dobEl.classList.replace("solid", "glow");

                typeSound.pause();
                typeSound.currentTime = 0;

                nameEl.classList.add("pulse");
                dobEl.classList.add("pulse");

                hint.classList.remove("hidden");
            });
        }, 400);
    });
}

/* ===== INTRO CLICK + COUNTDOWN ===== */
introScreen.addEventListener("click", () => {
    let count = 5;
    introText.textContent = count;

    // unlock audio
    typeSound.play().catch(() => { });
    typeSound.pause();
    typeSound.currentTime = 0;

    tickSound.currentTime = 0;
    tickSound.play().catch(() => { });

    const timer = setInterval(() => {
        count--;

        if (count > 0) {
            introText.textContent = count;

            // animation only
            introText.classList.remove("shake");
            void introText.offsetWidth;
            introText.classList.add("shake");

        } else {
            clearInterval(timer);

            introText.textContent = "🎉";

            introScreen.classList.add("fade-out");

            setTimeout(() => {
                introScreen.remove();
                startMain();
            }, 800);
        }
    }, 1000);
});


/* ===== CLICK START WISH ===== */
document.addEventListener("click", () => {
    if (!wishesStarted && !hint.classList.contains("hidden")) {
        hint.classList.add("hidden");
        music.play();
        startWishes();
        wishesStarted = true;
    }
});

/* ===== WISHES ===== */
const wishes = [
    "Chúc m luôn rạng rỡ như ánh trăng đêm 🌙",
    "Mỗi khoảnh khắc đều dịu dàng và ấm áp 💖",
    "Tuổi mới là những yêu thương không lời 🎂",
    "Và là một trái tim luôn được nâng niu ✨",

    "Mong rằng mỗi ngày trôi qua đều mang đến cho m một lý do để mỉm cười 🌸",
    "Chúc m luôn bình yên để lắng nghe chính mình, và đủ mạnh mẽ để theo đuổi ước mơ 💫",
    "Tuổi mới không cần hoàn hảo, chỉ cần hạnh phúc theo cách mình mong muốn 🎁",
    "Hy vọng những điều dịu dàng nhất của cuộc sống sẽ luôn tìm đến với m 💝",
    "Chúc m được yêu thương đúng cách, vào đúng lúc, bởi đúng người 💖",
    "Mỗi năm thêm tuổi là một năm thêm trưởng thành và thêm yêu bản thân hơn ✨"
];
let wishIndex = 0;

function randomColor() {
    const colors = ["#ffd1e8", "#ffb6d5", "#ffd700", "#cdb4ff", "#ff8fc7"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startWishes() {
    wishText.innerHTML = "";
    const chars = Array.from(wishes[wishIndex]);
    let i = 0;

    const interval = setInterval(() => {
        const span = document.createElement("span");
        span.textContent = chars[i] === " " ? "\u00A0" : chars[i];
        span.className = "wish-char";
        span.style.color = randomColor();
        wishText.appendChild(span);
        i++;

        if (i >= chars.length) {
            clearInterval(interval);
            setTimeout(() => {
                wishIndex = (wishIndex + 1) % wishes.length;
                startWishes();
            }, 3200);
        }
    }, 80);
}

/* ===== ICONS ===== */
const icons = ["💖", "🎂", "🎁", "🌸", "✨", "💫", "🎉", "💝"];
const iconBox = document.querySelector(".floating-icons");

setInterval(() => {
    const span = document.createElement("span");
    span.textContent = icons[Math.floor(Math.random() * icons.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = 18 + Math.random() * 20 + "px";
    span.style.animationDuration = 10 + Math.random() * 6 + "s";
    iconBox.appendChild(span);
    setTimeout(() => span.remove(), 14000);
}, 1200);

/* ===== FIREWORKS (GIỮ NGUYÊN) ===== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const fireworks = [];

function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.6;
    this.particles = Array.from({ length: 50 }, () => ({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        alpha: 1
    }));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, i) => {
        fw.particles.forEach(p => {
            ctx.fillStyle = `rgba(255,200,255,${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
        });
        fw.particles = fw.particles.filter(p => p.alpha > 0);
        if (!fw.particles.length) fireworks.splice(i, 1);
    });

    requestAnimationFrame(draw);
}

setInterval(() => fireworks.push(new Firework()), 1400);
draw();
