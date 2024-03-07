import { Testimonial } from "../models/Testimonial.js";

export const guardarTestimonial = async (request, response) => {
  console.log(request.body);
  const { nombre, mensaje, correo } = request.body;
  const errores = [];
  if (nombre.trim() === "") {
    errores.push("El nombre está vacío");
  }
  if (correo.trim() === "") {
    errores.push("El correo está vacío");
  }
  if (mensaje.trim() === "") {
    errores.push("El mensaje está vacío");
  }
  if (errores.length > 0) {
    const pagina = "Testimoniales";
    const testimoniales = await Testimonial.findAll();
    response.render("testimoniales", {
      actualPage: pagina,
      errores,
      nombre,
      mensaje,
      correo,
      testimoniales,
    });
  } else {
    // Crear el objeto en la base de datos
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });
      response.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};
