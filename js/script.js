$.getJSON("apps.json", function (json) { 
    json.apps.sort((a, b) => { 
        // If a < b
        return (new Date(a.versionDate)).getTime() - (new Date(b.versionDate)).getTime();
    });
    
    json.apps.forEach(app => {
        const versionDate = new Date(app.versionDate),
            today = new Date(),
            timeDifference = Math.abs(today - versionDate),
            daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 
        let newApp = (daysDifference < 14 ? true : false);
        
        let month = versionDate.toUTCString().split(" ")[2],
            date = versionDate.getDate();
        const dateStr = `${month} ${date}, ${versionDate.getFullYear()}`

        document.querySelector("#apps").insertAdjacentHTML("afterbegin", appContainer(app.name, app.subtitle, 
            (app.localizedDescription.includes(".") ? app.localizedDescription.split(".")[0] + "..." : app.localizedDescription)
            // app.versionDescription.split("\n \n")[0]
            , app.version, dateStr, app.iconURL, newApp));
    });

    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.target.blur();
            btn.classList.add("focus");
            setTimeout(() => {
                btn.classList.remove("focus");
            }, 100);
        });
    });
});

document.querySelector("#add").addEventListener("click", () => {
    location.href = "altstore://source?url=https://foxster-mp4.github.io/AltSource/apps.json";
});

function appContainer(name, shortDesc, longDesc, version = "N/A", versionDate = "N/A", iconURL, 
    newApp = false, buttonLink = null, buttonText = "More") {
    
    const rand = Math.floor(Math.random() * 10000);
    newApp = (newApp ? "New" : "");
    
    return `
        <div class="d-flex justify-content-center m-2">
            <div class="app d-flex align-items-center blur-bg p-3">
                <img src="${iconURL}" alt="${name.toLowerCase()}-app-icon" class="app-icon">
                <div class="app-text p-2 flex-grow-1">
                    <p class="text-adaptive2 fs-6">
                    ${name}
                    <span class="badge new text-bg-danger text-uppercase">${newApp}</span>
                    </p>
                    <p class="fs-7 app-desc-short">
                    ${shortDesc}
                    </p>
                    <p class="fs-7 text-adaptive2 collapse app-desc-long" id="${name.toLowerCase().replaceAll(" ", "")}${rand}Desc">
                    ${(longDesc ? longDesc.replaceAll("\n", "<br>") : "")}
                    <br>
                    <span class="app-version fw-normal text-end" id="${name.toLowerCase().replaceAll(" ", "")}${rand}Version" style="display: block; text-align: start!important; margin-top: 10px">v${version} (${versionDate})
                    </span>
                    </p>
                </div>
                <button type="button" class="btn btn-primary btn-sm rounded-pill bold text-uppercase fw-semibold" ` +
                    (buttonLink ?
                        `onclick="location.href='${buttonLink}';"`
                        :
                        `data-bs-toggle="collapse" data-bs-target="#${name.toLowerCase().replaceAll(" ", "")}${rand}Desc" aria-expanded="false" aria-controls="${name.toLowerCase().replaceAll(" ", "")}${rand}Desc"`
                    ) + `>${buttonText}</button>
            </div>
        </div>
    `;
}