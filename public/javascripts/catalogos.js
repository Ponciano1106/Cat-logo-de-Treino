const CATALOGO_EXERCICIOS = [
  { exercicio: 'Supino reto com barra', grupo_muscular: 'Peito', series: 4, carga_kg: 60 },
  { exercicio: 'Supino inclinado com halteres', grupo_muscular: 'Peito', series: 4, carga_kg: 24 },
  { exercicio: 'Crucifixo máquina', grupo_muscular: 'Peito', series: 3, carga_kg: 45 },
  { exercicio: 'Puxada alta frente', grupo_muscular: 'Costas', series: 4, carga_kg: 55 },
  { exercicio: 'Remada curvada', grupo_muscular: 'Costas', series: 4, carga_kg: 50 },
  { exercicio: 'Remada baixa no cabo', grupo_muscular: 'Costas', series: 3, carga_kg: 50 },
  { exercicio: 'Agachamento livre', grupo_muscular: 'Pernas', series: 4, carga_kg: 80 },
  { exercicio: 'Leg press 45°', grupo_muscular: 'Pernas', series: 4, carga_kg: 160 },
  { exercicio: 'Cadeira extensora', grupo_muscular: 'Pernas', series: 3, carga_kg: 55 },
  { exercicio: 'Mesa flexora', grupo_muscular: 'Pernas', series: 3, carga_kg: 40 },
  { exercicio: 'Desenvolvimento com halteres', grupo_muscular: 'Ombros', series: 4, carga_kg: 18 },
  { exercicio: 'Elevação lateral', grupo_muscular: 'Ombros', series: 4, carga_kg: 10 },
  { exercicio: 'Rosca direta barra', grupo_muscular: 'Bíceps', series: 3, carga_kg: 26 },
  { exercicio: 'Rosca martelo', grupo_muscular: 'Bíceps', series: 3, carga_kg: 14 },
  { exercicio: 'Tríceps pulley', grupo_muscular: 'Tríceps', series: 3, carga_kg: 35 },
  { exercicio: 'Tríceps francês', grupo_muscular: 'Tríceps', series: 3, carga_kg: 20 },
  { exercicio: 'Abdominal supra', grupo_muscular: 'Abdômen', series: 4, carga_kg: 0 },
  { exercicio: 'Prancha isométrica', grupo_muscular: 'Abdômen', series: 3, carga_kg: 0 }
];

(function initApp() {
  const grid = document.getElementById('catalogoGrid');
  const buscaInput = document.getElementById('buscaCatalogo');
  const formOrdenacao = document.getElementById('formOrdenacao');
  const sortSelect = document.getElementById('sortSelect');
  const dirSelect = document.getElementById('dirSelect');

  if (formOrdenacao && sortSelect && dirSelect) {
    const currentSort = formOrdenacao.getAttribute('data-sort') || 'id';
    const currentDir = formOrdenacao.getAttribute('data-dir') || 'desc';
    sortSelect.value = currentSort;
    dirSelect.value = currentDir;

    document.querySelectorAll('.sort-col-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const col = btn.getAttribute('data-col');
        const nextDir = currentSort === col && currentDir === 'asc' ? 'desc' : 'asc';
        window.location.href = `/itens?sort=${encodeURIComponent(col)}&dir=${encodeURIComponent(nextDir)}`;
      });
    });
  }

  document.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const itemRow = btn.closest('tr');
      const editRow = document.querySelector(`tr.edit-row[data-edit-id="${id}"]`);
      if (!itemRow || !editRow) return;

      const exercicio = itemRow.querySelector('.col-exercicio').textContent.trim();
      const grupo = itemRow.querySelector('.tag').textContent.trim();
      const series = itemRow.querySelector('.col-series').textContent.trim();
      const carga = itemRow.querySelector('.col-carga').getAttribute('data-carga');

      const inputs = editRow.querySelectorAll('input');
      if (inputs.length >= 4) {
        inputs[0].value = exercicio;
        inputs[1].value = grupo;
        inputs[2].value = series;
        inputs[3].value = carga;
      }

      editRow.classList.toggle('hidden');
    });
  });

  document.querySelectorAll('.edit-row .btn-cancel').forEach((btn) => {
    btn.addEventListener('click', () => {
      const editRow = btn.closest('tr.edit-row');
      if (editRow) editRow.classList.add('hidden');
    });
  });

  document.querySelectorAll('form[action$="/excluir"]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      if (!confirm('Excluir este exercício do treino?')) {
        e.preventDefault();
      }
    });
  });

  if (!grid || !buscaInput) return;

  function renderCatalogo(filtro) {
    const termo = (filtro || '').trim().toLowerCase();
    const filtrados = CATALOGO_EXERCICIOS.filter(
      (item) =>
        item.exercicio.toLowerCase().includes(termo) ||
        item.grupo_muscular.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
      grid.innerHTML = '<p class="empty-state">Nenhum exercício encontrado no catálogo para essa busca.</p>';
      return;
    }

    grid.innerHTML = '';

    filtrados.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'catalog-card';

      const info = document.createElement('div');
      info.className = 'catalog-info';

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = item.grupo_muscular;

      const titulo = document.createElement('strong');
      titulo.textContent = item.exercicio;

      const meta = document.createElement('small');
      meta.textContent = `${item.series} séries • ${item.carga_kg} kg sugeridos`;

      info.appendChild(tag);
      info.appendChild(titulo);
      info.appendChild(meta);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-implement';
      btn.textContent = 'Implementar';
      btn.addEventListener('click', () => {
        document.getElementById('exercicio').value = item.exercicio;
        document.getElementById('grupo_muscular').value = item.grupo_muscular;
        document.getElementById('series').value = item.series;
        document.getElementById('carga_kg').value = item.carga_kg;
        document.getElementById('formCadastroSecao').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('carga_kg').focus();
      });

      card.appendChild(info);
      card.appendChild(btn);
      grid.appendChild(card);
    });
  }

  buscaInput.addEventListener('input', (e) => renderCatalogo(e.target.value));
  renderCatalogo('');

  document.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const itemRow = btn.closest('tr');
      const editRow = document.querySelector(`tr.edit-row[data-edit-id="${id}"]`);
      if (!itemRow || !editRow) return;

      const exercicio = itemRow.querySelector('.col-exercicio').textContent.trim();
      const grupo = itemRow.querySelector('.tag').textContent.trim();
      const series = itemRow.querySelector('.col-series').textContent.trim();
      const carga = itemRow.querySelector('.col-carga').getAttribute('data-carga');

      const inputs = editRow.querySelectorAll('input');
      if (inputs.length >= 4) {
        inputs[0].value = exercicio;
        inputs[1].value = grupo;
        inputs[2].value = series;
        inputs[3].value = carga;
      }

      editRow.classList.toggle('hidden');
    });
  });

  document.querySelectorAll('.edit-row .btn-cancel').forEach((btn) => {
    btn.addEventListener('click', () => {
      const editRow = btn.closest('tr.edit-row');
      if (editRow) editRow.classList.add('hidden');
    });
  });
})();