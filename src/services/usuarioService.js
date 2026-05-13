/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para gestionar usuarios
 */

const db = require('../config/db');
const Usuario = require('../entities/Usuario');

const usuarioRepository = db.getRepository(Usuario);

/**
 * Crear un nuevo usuario
 * @param {Object} datosUsuario - { nombre, apellido, email, edad }
 * @returns {Object} El usuario creado
 */
const crearUsuario = async (datosUsuario) => {
  const nuevoUsuario = usuarioRepository.create(datosUsuario);
  return await usuarioRepository.save(nuevoUsuario);
};

/**
 * Obtener todos los usuarios
 * @returns {Array} Array de todos los usuarios
 */
const obtenerTodosLosUsuarios = async () => {
  // TODO: Implementar la obtención de todos los usuarios
  // Ayudita: Usa usuarioRepository.find()

  const usuarios = await usuarioRepository.find();
  return usuarios;
  
  return [];
};

/**
 * Obtener un usuario por ID
 * @param {Number} id - ID del usuario
 * @returns {Object|null} El usuario encontrado o null
 */
const obtenerUsuarioPorId = async (id) => {
  // TODO: Implementar la obtención de un usuario por ID
  // Ayudita: Usa usuarioRepository.findOneBy({ id })

  const abuscar = await usuarioRepository.findOneBy({id});
  return abuscar;  

  return null;
};

/**
 * Actualizar un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario actualizado o null si no existe
 */
const actualizarUsuario = async (id, datosActualizados) => {
  // TODO: Implementar la actualización de un usuario
  // Ayudita: Primero usa usuarioRepository.update(id, datosActualizados)
  // Y luego retorna el usuario actualizado usando obtenerUsuarioPorId(id)

    const usuarioexistente = await obtenerUsuarioPorId(id);    // verificamos si el usuario existe por id

    if(!usuarioexistente){                                        // si usuario no existe, osea es null, vacio, undefined, 0 o false   
      return null;    // retornamos null
    }
    

    await usuarioRepository.update(id, datosActualizados);    // actualizamos el usuario con el id y los datos actualizados
    return await obtenerUsuarioPorId(id);




  return null;
};

/**
 * Eliminar un usuario
 * @param {Number} id - ID del usuario
 * @returns {boolean} true si se eliminó, false si no existe
 */
const eliminarUsuario = async (id) => {
  // TODO: Implementar la eliminación de un usuario
  // Ayudita: Usa usuarioRepository.delete(id) y verifica result.affected

    const resultado = await usuarioRepository.delete(id);    // eliminamos el usuario por id y guardamos el resultado

    return resultado.affected > 0;    // si el resultado afectado es mayor a 0, significa que se eliminó el usuario, caso contrario no existía el usuario y retornamos false

  return false;
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
