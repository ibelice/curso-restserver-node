const { response, request } = require('express');


const usuariosGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey, page=1, limit} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre, 
        apikey,
        page,
        limit
    });
  };

const usuariosPut = (req, res) => {

    const {id} = req.params;


    res.status(500).json({
        msg: 'put API- Controlador',
        id
    });
  };

const usuariosPost = (req, res) => {

    const {nombre, edad, id} = req.body;

    res.status(201).json({
        msg: 'post API- Controlador',
        nombre,
        id
    });
  };

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API- Controlador'
    });
  };

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API- Controlador'
    });
  };



  module.exports = {
      usuariosGet, 
      usuariosPut,
      usuariosPost, 
      usuariosDelete,
      usuariosPatch

  }