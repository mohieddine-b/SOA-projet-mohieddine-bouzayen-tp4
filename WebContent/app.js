const BASE_URL = "http://localhost:8082/TestRS/test/users";

function showStatus(elementId, message, ok = true) {
    const el = document.getElementById(elementId);
    el.style.display = "block";
    el.className = "status " + (ok ? "ok" : "error");
    el.textContent = message;
}

function clearStatus(elementId) {
    const el = document.getElementById(elementId);
    el.style.display = "none";
    el.textContent = "";
}

// Charger toutes les personnes : GET /users/affiche
async function loadAllPersons() {
    clearStatus("statusList");
    try {
        const response = await fetch(BASE_URL + "/affiche", {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const data = await response.json();
        const tbody = document.getElementById("personsTableBody");
        tbody.innerHTML = "";
        data.forEach(person => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${person.id ?? ""}</td>
                <td>${person.name ?? ""}</td>
                <td>${person.age ?? ""}</td>
            `;
            tbody.appendChild(tr);
        });
        showStatus("statusList", "Liste chargée avec succès.");
    } catch (e) {
        showStatus("statusList", "Erreur lors du chargement : " + e.message, false);
    }
}

// Ajouter : PUT /users/add/{age}/{name}
async function addPerson() {
    clearStatus("statusAdd");
    const name = document.getElementById("addName").value.trim();
    const age = document.getElementById("addAge").value.trim();

    if (!name || !age) {
        showStatus("statusAdd", "Nom et âge sont obligatoires.", false);
        return;
    }

    try {
        const url = BASE_URL + "/add/" + encodeURIComponent(age) + "/" + encodeURIComponent(name);
        const response = await fetch(url, {
            method: "PUT"
        });
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const result = await response.json();
        if (result.state === "ok") {
            showStatus("statusAdd", "Personne ajoutée avec succès.");
            document.getElementById("addName").value = "";
            document.getElementById("addAge").value = "";
            loadAllPersons();
        } else {
            showStatus("statusAdd", "Échec : " + result.state, false);
        }
    } catch (e) {
        showStatus("statusAdd", "Erreur : " + e.message, false);
    }
}

// Mettre à jour : PUT /users/update/{id}/{age}/{name}
async function updatePerson() {
    clearStatus("statusUpdate");
    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const age = document.getElementById("updateAge").value.trim();

    if (!id || !name || !age) {
        showStatus("statusUpdate", "ID, nom et âge sont obligatoires.", false);
        return;
    }

    try {
        const url = BASE_URL + "/update/" +
            encodeURIComponent(id) + "/" +
            encodeURIComponent(age) + "/" +
            encodeURIComponent(name);
        const response = await fetch(url, {
            method: "PUT"
        });
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const result = await response.json();
        if (result.state === "ok") {
            showStatus("statusUpdate", "Personne mise à jour avec succès.");
            loadAllPersons();
        } else {
            showStatus("statusUpdate", "Échec : " + result.state, false);
        }
    } catch (e) {
        showStatus("statusUpdate", "Erreur : " + e.message, false);
    }
}

// Supprimer : DELETE /users/remove/{id}
async function deletePerson() {
    clearStatus("statusDelete");
    const id = document.getElementById("deleteId").value.trim();

    if (!id) {
        showStatus("statusDelete", "ID obligatoire.", false);
        return;
    }

    if (!confirm("Confirmer la suppression de l'utilisateur " + id + " ?")) {
        return;
    }

    try {
        const url = BASE_URL + "/remove/" + encodeURIComponent(id);
        const response = await fetch(url, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const result = await response.json();
        if (result.state === "ok") {
            showStatus("statusDelete", "Personne supprimée avec succès.");
            loadAllPersons();
        } else {
            showStatus("statusDelete", "Échec : " + result.state, false);
        }
    } catch (e) {
        showStatus("statusDelete", "Erreur : " + e.message, false);
    }
}

// Recherche par ID : GET /users/getid/{id}
async function searchById() {
    clearStatus("statusSearchId");
    document.getElementById("resultSearchId").textContent = "";
    const id = document.getElementById("searchId").value.trim();

    if (!id) {
        showStatus("statusSearchId", "ID obligatoire.", false);
        return;
    }

    try {
        const url = BASE_URL + "/getid/" + encodeURIComponent(id);
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const result = await response.json();
        if (result.state === "ok" && result.data) {
            showStatus("statusSearchId", "Utilisateur trouvé.");
            const p = result.data;
            document.getElementById("resultSearchId").textContent =
                "ID: " + (p.id ?? "") +
                " | Nom: " + (p.name ?? "") +
                " | Âge: " + (p.age ?? "");
        } else {
            showStatus("statusSearchId", result.state || "Utilisateur non trouvé.", false);
        }
    } catch (e) {
        showStatus("statusSearchId", "Erreur : " + e.message, false);
    }
}

// Recherche par nom : GET /users/getname/{name}
async function searchByName() {
    clearStatus("statusSearchName");
    document.getElementById("resultSearchName").textContent = "";
    const name = document.getElementById("searchName").value.trim();

    if (!name) {
        showStatus("statusSearchName", "Nom obligatoire.", false);
        return;
    }

    try {
        const url = BASE_URL + "/getname/" + encodeURIComponent(name);
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const result = await response.json();
        if (result.state === "ok" && result.data) {
            showStatus("statusSearchName", "Utilisateur trouvé.");
            const p = result.data;
            document.getElementById("resultSearchName").textContent =
                "ID: " + (p.id ?? "") +
                " | Nom: " + (p.name ?? "") +
                " | Âge: " + (p.age ?? "");
        } else {
            showStatus("statusSearchName", result.state || "Utilisateur non trouvé.", false);
        }
    } catch (e) {
        showStatus("statusSearchName", "Erreur : " + e.message, false);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnLoadAll").addEventListener("click", loadAllPersons);
    document.getElementById("btnAdd").addEventListener("click", addPerson);
    document.getElementById("btnUpdate").addEventListener("click", updatePerson);
    document.getElementById("btnDelete").addEventListener("click", deletePerson);
    document.getElementById("btnSearchId").addEventListener("click", searchById);
    document.getElementById("btnSearchName").addEventListener("click", searchByName);


    loadAllPersons();
});