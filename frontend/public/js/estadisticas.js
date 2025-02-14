document.addEventListener('DOMContentLoaded', async () => {
    await cargarEstadisticas();
    await cargarGraficoNotas();
});

// ✅ Función para cargar estadísticas generales
async function cargarEstadisticas() {
    try {
        const res = await fetch('/api/estadisticas');
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();
        console.log("📊 Estadísticas cargadas:", data);

        document.getElementById('total-alumnos').textContent = data.totalAlumnos ?? 'N/A';
        document.getElementById('total-cursos').textContent = data.totalCursos ?? 'N/A';
        document.getElementById('centro-mas-alumnos').textContent = data.centroMasAlumnos ?? 'No disponible';

    } catch (error) {
        console.error("❌ Error al cargar estadísticas:", error);
    }
}

// 🔹 Variable global para el gráfico
let chartInstance = null;

// ✅ Función para cargar gráfico de notas medias
async function cargarGraficoNotas() {
    try {
        const res = await fetch('/api/cursos/notas-medias');
        if (!res.ok) throw new Error('Error al obtener las notas medias');

        const datos = await res.json();
        console.log("📊 Datos recibidos para el gráfico:", datos);

        const nombresCursos = datos.map(curso => curso.nombre);
        const notasMedias = datos.map(curso => curso.notaMedia ?? 0); // 🔹 Evita `null`

        const ctx = document.getElementById('graficoNotas').getContext('2d');

        if (chartInstance !== null) {
            chartInstance.destroy(); // 🔹 Elimina gráfico previo para evitar errores
        }

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nombresCursos,
                datasets: [{
                    label: 'Nota Media',
                    data: notasMedias,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });

    } catch (error) {
        console.error("❌ Error al cargar el gráfico de notas:", error);
    }
}

