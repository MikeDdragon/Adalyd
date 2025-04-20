
const members = ['Mike', 'Baldo', 'Dany', 'Edgar'];
const GrupImage = document.querySelector(".ImagenGrupo");
const LogoGrup = document.querySelector(".Logo");
const BackgroundPage = document.querySelector(".Fondo");
const ArrowA = document.querySelector(".flecha");
const LetterA = document.querySelector(".letraA");
const navItems = document.querySelectorAll('.nav li');

function toggleMember(name, show) {
    const image = document.querySelector(`.${name}`);
    const h1 = document.querySelector(`.${name}Text`);
    const p = document.querySelector(`.P${name}Text`);
    if (show) {
        image.style.filter = 'grayscale(0%)';
        image.style.transform = 'scale(1.02)';
        h1.style.opacity = "100%";
        h1.style.top = "75vh";
        p.style.opacity = "100%";
        p.style.transform = "translateX(-30%)";
    } else {
        image.style.filter = 'grayscale(100%)';
        image.style.transform = 'scale(1)';
        h1.style.opacity = "0%";
        h1.style.top = "100vh";
        p.style.opacity = "0%";
        p.style.transform = "translateX(-80%)";
    }
}

members.forEach(name => {
    const rec = document.querySelector(`.Rec${name}`);
    rec.addEventListener('mouseenter', () => toggleMember(name, true));
    rec.addEventListener('mouseleave', () => toggleMember(name, false));
    rec.addEventListener('click', () => toggleMember(name, true));
});

navItems.forEach(item => {
    item.addEventListener('click', function () {
        navItems.forEach(nav => nav.classList.remove('selected'));
        this.classList.add('selected');

        const isIntegrantes = this.classList.contains('Integrantes');
        const isRedes = this.classList.contains('Redes');

        members.forEach(name => {
            document.querySelector(`.Rec${name}`).style.zIndex = isIntegrantes ? "1" : "-1";
            document.querySelector(`.${name}`).style.opacity = isIntegrantes ? "1" : "0";
        });

        GrupImage.style.opacity = isIntegrantes || isRedes ? "0" : "100";
        LogoGrup.classList.toggle('selected-logo', isIntegrantes || isRedes);
        BackgroundPage.style.top = isRedes ? "-850px" : "0";
        document.body.style.backgroundColor = 'white';
        ArrowA.style.left = isRedes ? "130vh" : "330vh";
        ArrowA.style.opacity = isRedes ? "0" : "1";
        LetterA.style.left = isRedes ? "130vh" : "330vh";
    });
});