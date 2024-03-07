import express from "express";
import {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaDetalleViaje,
  paginaTestimoniales,
} from "../controllers/paginasControllers.js";
import {guardarTestimonial} from "../controllers/testimonalesController.js";

const router = express.Router();

// Request lo que enviamos - Responde lo que Express responde
router.get("/", paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/viajes", paginaViajes);
router.get("/viajes/:slug", paginaDetalleViaje);

router.get("/testimoniales", paginaTestimoniales);
router.post("/testimoniales", guardarTestimonial);

export default router;
