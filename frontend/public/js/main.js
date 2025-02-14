document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-cursos')) cargarCursos();
    if (document.getElementById('lista-centros')) cargarCentros();
    if (document.getElementById('tabla-alumnos')) cargarAlumnos();
});

// ✅ Función para cargar cursos
async function cargarCursos() {
    try {
        const res = await fetch('/api/cursos');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const cursos = await res.json();
        console.log("📚 Cursos cargados:", cursos); // Debug

        const listaCursos = document.getElementById('lista-cursos');
        if (listaCursos) {
            listaCursos.innerHTML = cursos.map(curso => `
                <li><strong>${curso.nombre}</strong> - Nivel: ${curso.nivel} - Lugar: ${curso.lugar}</li>
            `).join('');
        }
    } catch (error) {
        console.error("❌ Error al cargar cursos:", error);
    }
}

// ✅ Función para cargar centros
async function cargarCentros() {
    try {
        const res = await fetch('/api/centros');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const centros = await res.json();
        console.log("🏫 Centros cargados:", centros); // Debug

        const listaCentros = document.getElementById('lista-centros');
        if (listaCentros) {
            listaCentros.innerHTML = centros.map(centro => 
                `<li><strong>${centro.nombre}</strong> - Ubicación: ${centro.ubicacion}</li>`
            ).join('');
        }
    } catch (error) {
        console.error("❌ Error al cargar centros:", error);
    }
}

// ✅ Función para cargar alumnos
async function cargarAlumnos() {
    try {
        const res = await fetch('/api/alumnos');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const alumnos = await res.json();
        console.log("Alumnos cargados:", alumnos); // ✅ Verifica en la consola si se cargan bien

        const listaAlumnos = document.getElementById('lista-alumnos');
        if (!listaAlumnos) {
            console.error("❌ No se encontró el contenedor #lista-alumnos en el HTML");
            return;
        }

        listaAlumnos.innerHTML = alumnos.map(alumno => `
            <li>${alumno.nombre} - ${alumno.email ? alumno.email : 'Sin email'}</li>
        `).join('');
    } catch (error) {
        console.error("Error al cargar alumnos:", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    cargarAlumnos();
});


// ✅ Función para matricular un alumno en un curso
async function matricularAlumno(alumnoId) {
    const cursoId = prompt('Ingrese el ID del curso al que quiere matricular al alumno:');
    if (!cursoId) return;

    try {
        const res = await fetch(`/api/alumnos/${alumnoId}/matricular`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cursoId })
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        alert('✅ Alumno matriculado correctamente');
        cargarAlumnos(); // Recargar la lista de alumnos
    } catch (error) {
        alert('❌ Error al matricular al alumno');
        console.error(error);
    }
}

// ✅ Función para asignar una nota a un alumno
async function asignarNota(alumnoId) {
    const nota = prompt('Ingrese la nota del alumno:');
    if (!nota) return;

    try {
        const res = await fetch(`/api/alumnos/${alumnoId}/nota`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nota })
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        alert('✅ Nota asignada correctamente');
        cargarAlumnos(); // Recargar la lista de alumnos
    } catch (error) {
        alert('❌ Error al asignar la nota');
        console.error(error);
    }
}
