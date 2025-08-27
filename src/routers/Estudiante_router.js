import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarEstudiante, detalleEstudiante, eliminarEstudiante, registroEstudiante, visualizarEstudiantes } from '../controllers/Estudiante_controller.js'

const router = Router()
router.post('/registro/estudiante', verificarTokenJWT, registroEstudiante)
router.get('/estudiantes', verificarTokenJWT,visualizarEstudiantes)
router.get('/estudiante/:id', verificarTokenJWT,detalleEstudiante)
router.put('/estudiante/actualizar/:id',verificarTokenJWT, actualizarEstudiante)
router.delete('/estudiante/eliminar/:id',verificarTokenJWT, eliminarEstudiante)

export default router