fetch('./data/chapters.json')
    .then(response => response.json())
    .then(data => {
        const serieName = data.serie;

        data.acts.forEach((act, index) => {
            insertChapter(act, `.section-principal-${index + 1}`, serieName);
            insertImages(act.images, `.galeria-${index + 1}`, act.name, act.id);
        });
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

function insertImages(images, sectionSelector, galleryName, id) {
    const galleryContainer = document.querySelector(sectionSelector);

    if (!galleryContainer) {
        console.error(`No se encontró el contenedor para la sección '${sectionSelector}'`);
        return;
    }

    const galleryTitle = document.createElement('h2');
    galleryTitle.classList.add('title');
    galleryTitle.textContent = `Galería: ${galleryName}`;
    galleryContainer.appendChild(galleryTitle);

    const galleryCreator = document.createElement('div');
    galleryCreator.classList.add('galeria__imagenes-' + id);

    galleryContainer.appendChild(galleryCreator);

    images.forEach((img, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-acto-' + id + '-' + index);

        imgContainer.innerHTML = `
            <a class="image-link" href="${img.image}" data-lightbox="gallery-${id}" data-title="${img.img_title}">
                <img class="image" src="${img.miniature}" alt="${img.alt}" />
            </a>
        `;

        galleryCreator.appendChild(imgContainer);
    });
}