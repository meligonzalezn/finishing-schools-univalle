import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { AppSettings } from '../../config/app-settings.js';
import { Link } from 'react-router-dom';


const TermsConditions = () => {
  /* eslint-disable */
  const context = useContext(AppSettings);

  useLayoutEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass('p-0');

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass('');
    };
  }, []);

  const [activeSection, setActiveSection] = useState(""); // Estado para almacenar la sección activa

  useEffect(() => {
    // Función para manejar el evento de scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll("h5"); // Obtener todos los subtítulos h5 del contenido
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    // Agregar el event listener para el scroll
    window.addEventListener("scroll", handleScroll);

    // Eliminar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='container my-5 mx-auto justify-content-center'>
        <div className='row justify-content-center bg-white p-4 rounded w-100 m-auto'>
            <h3>Términos y condiciones</h3>
            <p className='text-secondary'>Actualizado en Junio 2023</p>
            <div className='row'>
                <div className='col-md-4'>
                    <div>
                        <ul className='list-unstyled' style={{paddingLeft:"0.3rem", margin:"0", textAlign:"start !important"}}>
                            <li className={activeSection === "terminos" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>1 </span>
                                <a className='text-info text-decoration-none' href="#terminos">Acuerdo de nuestros términos legales</a>
                            </li>
                            <li className={activeSection === "representaciones" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>2 </span>
                                <a className='text-info text-decoration-none' href="#representaciones">Representaciones del usuario</a>
                            </li>
                            <li className={activeSection === "registro" ? "active" : "d-flex gap-3"} >
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>3 </span>
                                <a className='text-info text-decoration-none' href="#registro">Registro de usuario</a>
                            </li>
                            <li className={activeSection === "politica" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>4 </span>
                                <a className='text-info text-decoration-none' href="#politica">Política de privacidad</a>
                            </li>
                            <li className={activeSection === "modificaciones" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>5 </span>
                                <a className='text-info text-decoration-none' href="#modificaciones">Modificaciones e interrupciones</a>
                            </li>
                            <li className={activeSection === "ley" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>6 </span>
                                <a className='text-info text-decoration-none' href="#ley">Ley aplicable</a>
                            </li>
                            <li className={activeSection === "datos" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>7 </span>
                                <a className='text-info text-decoration-none' href="#datos">Datos del usuario</a>
                            </li>
                            <li className={activeSection === "contactenos" ? "active" : "d-flex gap-3"}>
                                <span className="bg-success text-light rounded-circle d-inline-flex justify-content-center align-items-center" style={{width:"1rem", height:"1rem", textAlign:"center"}}>8 </span>
                                <a className='text-info text-decoration-none' href="#contactenos" >Contáctenos</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div>
                        <h5 id="terminos">Acuerdo de nuestros términos legales</h5>
                        <p>Somos Finishing Schools Univalle, haciendo negocios como FSU ("Compañía", "nosotros", "nos", "nuestro").
                            <br/> <br/>
                            Operamos el sitio web <Link>https://fsu-front.vercel.app/ </Link> así como cualquier otro producto o servicio relacionado que se refiera o enlace a estos términos legales (los "Términos Legales") (colectivamente, los "Servicios").

                            Puede contactarnos por correo electrónico a <a href='mailto:fsu@gmail.com'>fsu@gmail.com</a>.
                            <br/> <br/>
                            Estos Términos Legales constituyen un acuerdo legalmente vinculante celebrado entre usted, ya sea personalmente o en nombre de una entidad ("usted"), y Finishing Schools Univalle, con respecto a su acceso y uso de los Servicios. Usted acepta que al acceder a los Servicios, ha leído, comprendido y aceptado estar sujeto a todos estos Términos Legales. SI NO ESTÁ DE ACUERDO CON TODOS ESTOS TÉRMINOS LEGALES, ENTONCES SE PROHÍBE EXPRESAMENTE EL USO DE LOS SERVICIOS Y DEBE DISCONTINUAR SU USO DE INMEDIATO.
                            <br/> <br/>
                            Los términos y condiciones complementarios o documentos que puedan publicarse en los Servicios de vez en cuando se incorporan expresamente por referencia en el presente documento. Nos reservamos el derecho, a nuestra entera discreción, de realizar cambios o modificaciones a estos Términos Legales en cualquier momento y por cualquier motivo. Le informaremos sobre cualquier cambio actualizando la fecha de "Última actualización" de estos Términos Legales, y renuncia a cualquier derecho de recibir un aviso específico de cada cambio. Es su responsabilidad revisar periódicamente estos Términos Legales para mantenerse informado de las actualizaciones. Estará sujeto y se considerará que ha sido informado y ha aceptado los cambios en cualquier Término Legal revisado mediante el uso continuado de los Servicios después de la fecha en que se publiquen dichos Términos Legales revisados.
                            <br/> <br/>
                            Los Servicios están destinados a usuarios que tengan al menos 18 años de edad. Las personas menores de 18 años no tienen permitido utilizar o registrarse en los Servicios.
                            <br/> <br/>
                            Recomendamos que imprima una copia de estos Términos Legales para sus registros.
                        </p>
                        <h5 id="representaciones">Representaciones del usuario</h5>
                        <p>
                            Al utilizar los Servicios, usted declara y garantiza que: (1) toda la información de registro que envíe será veraz, precisa, actual y completa; (2) mantendrá la precisión de dicha información y actualizará de manera oportuna dicha información de registro según sea necesario; (3) tiene la capacidad legal y acepta cumplir con estos Términos Legales; (4) no es menor de edad en la jurisdicción en la que reside; (5) no accederá a los Servicios a través de medios automatizados o no humanos, ya sea mediante un bot, script o de otra manera; (6) no utilizará los Servicios con fines ilegales o no autorizados; y (7) su uso de los Servicios no violará ninguna ley o regulación aplicable.
                            <br/> <br/>
                            Si proporciona información que es falsa, inexacta, no actual o incompleta, tenemos el derecho de suspender o terminar su cuenta y rechazar cualquier uso actual o futuro de los Servicios (o cualquier parte de los mismos).
                        </p>
                        <h5 id="registro">Registro de usuario</h5>
                        <p>
                            Es posible que se le solicite registrarse para utilizar los Servicios. Usted acepta mantener su contraseña en confidencialidad y será responsable de todo el uso de su cuenta y contraseña. Nos reservamos el derecho de eliminar, recuperar o cambiar el nombre de usuario que elija si determinamos, a nuestro exclusivo criterio, que dicho nombre de usuario es inapropiado, obsceno o de otra manera objetable.
                        </p>
                        <h5 id="politica">Política de privacidad</h5>
                        <p>
                            Nos preocupamos por la privacidad y seguridad de los datos. Al utilizar los Servicios, usted acepta quedar sujeto a nuestra Política de Privacidad publicada en los Servicios, la cual está incorporada en estos Términos Legales. Tenga en cuenta que los Servicios están alojados en Colombia. Si accede a los Servicios desde cualquier otra región del mundo con leyes u otros requisitos que regulen la recopilación, uso o divulgación de datos personales y que difieran de las leyes aplicables en Colombia, a través de su uso continuado de los Servicios, usted está transfiriendo sus datos a Colombia y otorga expresamente su consentimiento para que sus datos sean transferidos y procesados en Colombia.
                        </p>
                        <h5 id="modificaciones">Modificaciones e interrupciones</h5>
                        <p>
                            Nos reservamos el derecho de cambiar, modificar o eliminar el contenido de los servicios en cualquier momento o por cualquier motivo, a nuestra única discreción y sin previo aviso. Sin embargo, no tenemos la obligación de actualizar ninguna información en nuestros Servicios. No seremos responsables ante usted ni ante ningún tercero por ninguna modificación, cambio de precio, suspensión o interrupción de los Servicios.
                            <br/> <br/>
                            No podemos garantizar que los Servicios estén disponibles en todo momento. Es posible que experimentemos problemas de hardware, software u otros, o que necesitemos realizar tareas de mantenimiento relacionadas con los Servicios, lo que podría provocar interrupciones, retrasos o errores. Nos reservamos el derecho de cambiar, revisar, actualizar, suspender, interrumpir o modificar los Servicios en cualquier momento o por cualquier inconveniente causado por su incapacidad para acceder a los Servicios durante cualquier período de inactividad o interrupción de los Servicios. Nada en estos Términos Legales se interpretará como una obligación de mantener y respaldar los Servicios o de proporcionar correcciones, actualizaciones o lanzamientos relacionados con los mismos.
                        </p>
                        <h5 id="ley">Ley aplicable</h5>
                        <p>
                            Estos Términos legales se regirán y definirán de acuerdo con las leyes de Colombia. Finishing Schools Univalle y usted acuerdan de manera irrevocable que los tribunales de Colombia tendrán jurisdicción exclusiva para resolver cualquier disputa que pueda surgir en relación con los Términos legales.
                        </p>
                        <h5 id="datos">Datos del usuario</h5>
                        <p>
                            Mantendremos ciertos datos que usted transmita a los Servicios con el fin de gestionar el rendimiento de los Servicios, así como datos relacionados con su uso de los Servicios. Aunque realizamos copias de seguridad regulares de los datos, usted es el único responsable de todos los datos que transmita o que estén relacionados con cualquier actividad que haya realizado utilizando los Servicios. Usted acepta que no tendremos ninguna responsabilidad hacia usted por cualquier pérdida o corrupción de dichos datos, y por la presente renuncia a cualquier derecho de acción en nuestra contra derivado de dicha pérdida o corrupción de tales datos.                        
                        </p>
                        <h5 id="contactenos">Contáctenos</h5>
                        <p>
                            Para resolver una queja relacionada con los Servicios o para obtener más información sobre el uso de los Servicios, contáctenos en:
                            <br/> <br/>
                            Finishing Schools Univalle
                            <br/>
                            <a href="mailto:fsu@gmail.com">fsu@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default TermsConditions;
