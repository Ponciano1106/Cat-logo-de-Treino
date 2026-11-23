const express = require('express');
const router = express.Router();
const db = require('../config/db');

const SORT_COLUMNS = {
  id: 'id',
  exercicio: 'exercicio',
  grupo_muscular: 'grupo_muscular',
  series: 'series',
  carga_kg: 'carga_kg'
};

async function renderLista(req, res) {
  const sortKey = SORT_COLUMNS[req.query.sort] ? req.query.sort : 'id';
  const sortCol = SORT_COLUMNS[sortKey];
  const sortDir = req.query.dir === 'asc' ? 'ASC' : 'DESC';

  const [rows] = await db.query(`SELECT * FROM itens ORDER BY ${sortCol} ${sortDir}`);
  res.render('index', {
    title: 'Controle de Treinos',
    itens: rows,
    sort: sortKey,
    dir: sortDir.toLowerCase()
  });
}

router.get('/', async (req, res, next) => {
  try {
    await renderLista(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/itens', async (req, res, next) => {
  try {
    await renderLista(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/itens', async (req, res, next) => {
  try {
    const { exercicio, grupo_muscular, series, carga_kg } = req.body;
    await db.query(
      'INSERT INTO itens (exercicio, grupo_muscular, series, carga_kg) VALUES (?, ?, ?, ?)',
      [exercicio.trim(), grupo_muscular.trim(), Number(series), Number(carga_kg)]
    );
    res.redirect('/itens');
  } catch (err) {
    next(err);
  }
});

router.post('/itens/:id/editar', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { exercicio, grupo_muscular, series, carga_kg } = req.body;
    await db.query(
      'UPDATE itens SET exercicio = ?, grupo_muscular = ?, series = ?, carga_kg = ? WHERE id = ?',
      [exercicio.trim(), grupo_muscular.trim(), Number(series), Number(carga_kg), Number(id)]
    );
    res.redirect('/itens');
  } catch (err) {
    next(err);
  }
});

router.post('/itens/:id/excluir', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM itens WHERE id = ?', [Number(id)]);
    res.redirect('/itens');
  } catch (err) {
    next(err);
  }
});

router.post('/itens/:id/editar', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { exercicio, grupo_muscular, series, carga_kg } = req.body;
    await db.query(
      'UPDATE itens SET exercicio = ?, grupo_muscular = ?, series = ?, carga_kg = ? WHERE id = ?',
      [exercicio.trim(), grupo_muscular.trim(), Number(series), Number(carga_kg), Number(id)]
    );
    res.redirect('/itens');
  } catch (err) {
    next(err);
  }
});

module.exports = router;