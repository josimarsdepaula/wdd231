const cursos = [
    {
        code: "CSE 110",
        name: "Programming Building Blocks",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        subject: "WDD",
        completed: true
    },
    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        subject: "CSE",
        completed: true
    },
    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        subject: "WDD",
        completed: true
    },
    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        subject: "CSE",
        completed: false
    },
    {
        code: "WDD 231",
        name: "Web Frontend Development I",
        credits: 2,
        subject: "WDD",
        completed: false
    }
];

const areaCursos = document.querySelector("#cursos");
const creditos = document.querySelector("#creditos");
const todos = document.querySelector("#todos");
const cse = document.querySelector("#cse");
const wdd = document.querySelector("#wdd");

function exibirCursos(lista) {
    areaCursos.innerHTML = "";

    lista.forEach(curso => {
        const card = document.createElement("div");

        if (curso.completed) {
            card.className = "curso completo";
            card.textContent = `${curso.code} ✓`;
        } else {
            card.className = "curso";
            card.textContent = `${curso.code}`;
        }

        areaCursos.appendChild(card);
    });

    const totalCreditos = lista.reduce((total, curso) => total + curso.credits, 0);
    creditos.textContent = `Total de créditos: ${totalCreditos}`;
}

function filtrarCursos(tipo) {
    let cursosFiltrados;

    if (tipo === "CSE") {
        cursosFiltrados = cursos.filter(curso => curso.subject === "CSE");
    } else if (tipo === "WDD") {
        cursosFiltrados = cursos.filter(curso => curso.subject === "WDD");
    } else {
        cursosFiltrados = cursos;
    }

    exibirCursos(cursosFiltrados);
}

todos.addEventListener("click", () => {
    filtrarCursos("TODOS");
    todos.classList.add("ativo-filtro");
    cse.classList.remove("ativo-filtro");
    wdd.classList.remove("ativo-filtro");
});

cse.addEventListener("click", () => {
    filtrarCursos("CSE");
    cse.classList.add("ativo-filtro");
    todos.classList.remove("ativo-filtro");
    wdd.classList.remove("ativo-filtro");
});

wdd.addEventListener("click", () => {
    filtrarCursos("WDD");
    wdd.classList.add("ativo-filtro");
    todos.classList.remove("ativo-filtro");
    cse.classList.remove("ativo-filtro");
});

exibirCursos(cursos);