import {Router} from 'express'
import { registroMateria, visualizarMaterias, detalleMateria, actualizarMateria, eliminarMateria } from '../controllers/Materia_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()
router.post('/registro/materia', verificarTokenJWT, registroMateria)
router.get('/materias', verificarTokenJWT,visualizarMaterias)
router.get('/materia/:id', verificarTokenJWT,detalleMateria)
router.put('/materia/actualizar/:id',verificarTokenJWT, actualizarMateria)
router.delete('/materia/eliminar/:id',verificarTokenJWT, eliminarMateria)

export default router