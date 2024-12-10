fetch('./data/chapters.json')
    .then(response => response.json())
    .then(data => {
        const serieName = "Arcane";

        insertChapter(data.acts[0], '.section-principal-1', serieName); // Acto 1
        insertChapter(data.acts[1], '.section-principal-2', serieName); // Acto 2
        insertChapter(data.acts[2], '.section-principal-3', serieName); // Acto 3
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

function insertChapter(act, sectionSelector, serieName) {
    const chaptersContainer = document.querySelector(sectionSelector);

    if (!chaptersContainer) {
        console.error(`No se encontró el contenedor para la sección '${sectionSelector}'`);
        return;
    }
    const actTitle = document.createElement('h2');
    actTitle.classList.add('title');
    actTitle.textContent = `${serieName} - ${act.name}`;
    chaptersContainer.appendChild(actTitle);

    act.chapters.forEach(chapter => {
        const actContainer = document.createElement('article');
        actContainer.classList.add('capitulo');

        actContainer.innerHTML = `
            <div class="capitulo__img">
                <img src="${chapter.image}" alt="${chapter.title}">
            </div>
            <div class="capitulo__netflix">
                <a href="${chapter.link}" target="_blank">${chapter.title} <i class="fa-solid fa-up-right-from-square" style="color: #ffffff;"></i></a>
                <p class="capitulo__descripcion">${chapter.description}</p>
            </div>
        `;

        chaptersContainer.appendChild(actContainer);
    });
}
