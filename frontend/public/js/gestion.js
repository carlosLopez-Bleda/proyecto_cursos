document.addEventListener('DOMContentLoaded', () => {
    cargarAlumnos();
    cargarCursos();
});

async function cargarAlumnos() {
    const res = await fetch('/api/alumnos');
    const alumnos = await res.json();
    const selectAlumno = document.getElementById('alumno-select');
    const selectNota = document.getElementById('alumno-nota-select');
    selectAlumno.innerHTML = alumnos.map(alumno => `<option value="${alumno.id}">${alumno.nombre}</option>`).join('');
    selectNota.innerHTML = selectAlumno.innerHTML;
}

async function cargarCursos() {
    const res = await fetch('/api/cursos');
    const cursos = await res.json();
    const selectCurso = document.getElementById('curso-select');
    selectCurso.innerHTML = cursos.map(curso => `<option value="${curso.id}">${curso.nombre}</option>`).join('');
}

document.getElementById('matricula-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const alumnoId = document.getElementById('alumno-select').value;
    const cursoId = document.getElementById('curso-select').value;
    
    const res = await fetch('/api/matriculas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alumnoId, cursoId })
    });

    if (res.ok) alert('Alumno matriculado correctamente');
});

document.getElementById('nota-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const alumnoId = document.getElementById('alumno-nota-select').value;
    const nota = document.getElementById('nota').value;
    
    const res = await fetch(`/api/alumnos/${alumnoId}/nota`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nota })
    });

    if (res.ok) alert('Nota asignada correctamente');
});
