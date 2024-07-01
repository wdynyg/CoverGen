function generateImage() {
    const bgImage = document.getElementById('bgImageInput').files[0];
    const squareImage = document.getElementById('squareImageInput').files[0];
    const text = document.getElementById('textInput').value;

    if (!bgImage || !squareImage || text === '') {
        alert('请选择背景图像、方形图像，然后输入文本。');
        return;
    }

    const readerBg = new FileReader();
    readerBg.onload = function (e) {
        const bgImageUrl = e.target.result;

        const readerSquare = new FileReader();
        readerSquare.onload = function (e) {
            const squareImageUrl = e.target.result;

            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.onload = function () {
                canvas.width = 1000;
                canvas.height = 500;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(18, 0);
                ctx.lineTo(canvas.width - 18, 0);
                ctx.quadraticCurveTo(canvas.width, 0, canvas.width, 18);
                ctx.lineTo(canvas.width, canvas.height - 18);
                ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - 18, canvas.height);
                ctx.lineTo(18, canvas.height);
                ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - 18);
                ctx.lineTo(0, 18);
                ctx.quadraticCurveTo(0, 0, 18, 0);
                ctx.closePath();
                ctx.clip();

                ctx.filter = 'blur(3px)';
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const squareImg = new Image();
                squareImg.onload = function () {
                    const size = Math.min(canvas.width, canvas.height) / 2;
                    const x = (canvas.width - size) / 2;
                    const y = (canvas.height - size) / 2;

                    ctx.globalAlpha = 1.0;
                    ctx.filter = 'none';
                    ctx.font = 'bold 150px PingFang';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

                    ctx.beginPath();
                    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
                    ctx.clip();

                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(squareImg, x, y, size, size);

                    ctx.clip();

                    ctx.globalAlpha = 1.0;

                    const output = document.getElementById('output');
                    output.innerHTML = '<img src="' + canvas.toDataURL() + '" style="border-radius: 18px;" alt="Custom Image"><br><button onclick="saveWebp()">Save</button>';
                };
                squareImg.src = squareImageUrl;
            };
            img.src = bgImageUrl;
        };
        readerSquare.readAsDataURL(squareImage);
    };
    readerBg.readAsDataURL(bgImage);
}

function saveWebp() {
    var canvas = document.querySelector('canvas'); 
    var image = canvas.toDataURL("image/webp");
    var link = document.createElement('a');
    link.download = 'canvasImage.webp';
    link.href = image;
    link.click();
}

function savePreset() {
    const textInput = document.getElementById('textInput');
    localStorage.setItem('textInput', textInput.value);
}

function loadPreset() {
    const textInput = document.getElementById('textInput');
    textInput.value = localStorage.getItem('textInput') || '';
}