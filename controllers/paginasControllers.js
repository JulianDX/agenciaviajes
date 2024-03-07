import { Testimonial } from "../models/Testimonial.js";
import { Viaje } from "../models/Viaje.js";

const paginaInicio = async (request, response) => {
  const pagina = "Inicio";
  const promisesDB = [];
  promisesDB.push(Viaje.findAll({ limit: 3 }));
  promisesDB.push(Testimonial.findAll({ limit: 3 }));
  try {
    const respuesta = await Promise.all(promisesDB);
    response.render("index", {
      actualPage: pagina,
      clase: "home",
      viajes: respuesta[0],
      testimoniales: respuesta[1],
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaNosotros = (request, response) => {
  const pagina = "Nosotros";
  response.render("nosotros", {
    actualPage: pagina,
  });
};

const paginaTestimoniales = async (request, response) => {
  const pagina = "Testimoniales";
  try {
    const testimoniales = await Testimonial.findAll();
    response.render("testimoniales", {
      actualPage: pagina,
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaViajes = async (request, response) => {
  const pagina = "Próximos Viajes";
  const viajes = await Viaje.findAll();
  response.render("viajes", {
    actualPage: pagina,
    viajes,
  });
};

const paginaDetalleViaje = async (request, response) => {
  const pagina = "Viaje";
  const slug = request.params.slug;
  try {
    const viaje = await Viaje.findOne({ where: { slug: slug } });
    response.render("viaje", {
      actualPage: pagina,
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaDetalleViaje,
  paginaTestimoniales,
};
