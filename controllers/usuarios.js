const { response, request } = require('express');
const bcryptjs = require ('bcryptjs');

const Usuario = require ('../models/usuario'); //la u de usuario minuscula permite crear nuevas instancias



const usuariosGet = async (req = request, res = response) => {
    // const {q, nombre = 'No name', apikey, page=1, limit} = req.query;
    const { limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all ([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

// REFERENCIA
    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    res.json({
        total,
        usuarios
    });
  };

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
    if(password) {
      // Encriptar la contrasenia
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
      
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
  };

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol}); //aqui se creo la nueva instancia de usuario

    // verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail) {
    //   return res.status(400).json({
    //     msg: 'Ese correo ya existe'
    //   })
    // };


    // Encriptar la contrasenia
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save(); //esto es para grabar el registro en la base de datos

    res.status(201).json({
        msg: 'post API- Controlador',
        usuario //va a recibir la respuesta del usuario
    });
  };

const usuariosDelete = async (req, res = response) => {

  const {id} = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        id
    });
  };

const usuariosPatch = (req, res = response) => {
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