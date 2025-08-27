import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarMatricula, detalleMatricula, eliminarMatricula, registroMatricula, visualizarMatriculas } from '../controllers/Matricula_controller.js'

const router = Router()
router.post('/registro/matricula',verificarTokenJWT, registroMatricula)
router.get('/matriculas',verificarTokenJWT, visualizarMatriculas)
router.get('/matricula/:id', verificarTokenJWT,detalleMatricula)
router.put('/matricula/actualizar/:id',verificarTokenJWT, actualizarMatricula)
router.delete('/matricula/eliminar/:id',verificarTokenJWT, eliminarMatricula)


export default router