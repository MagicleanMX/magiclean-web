import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad — MagicClean S.A. de C.V.',
  description:
    'Aviso de Privacidad de MagicClean S.A. de C.V. conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  robots: { index: true, follow: true },
}

export default function AvisoDePrivacidad() {
  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-[#0A1628] text-white pt-32 pb-14 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-3">
              Aviso Legal
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Aviso de Privacidad
            </h1>
            <p className="text-sm text-white/50 font-normal">
              Conforme a la Ley Federal de Protección de Datos Personales en
              Posesión de los Particulares (NLFPDPPP) · Última actualización:{' '}
              <time dateTime="2025-04-13">13 de abril de 2025</time>
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-[#1A1A1A]">

          {/* 1. Responsable */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              I. Identidad y domicilio del Responsable
            </h2>
            <p className="text-sm font-normalleading-relaxed text-[#444] mb-4">
              <strong className="font-semibold text-[#1A1A1A]">MagicClean S.A. de C.V.</strong>{' '}
              (en adelante, <em>"el Responsable"</em>) es el responsable del tratamiento
              de sus datos personales.
            </p>
            <ul className="text-sm font-normaltext-[#444] space-y-1.5 leading-relaxed">
              <li>
                <span className="font-semibold text-[#1A1A1A]">Domicilio:</span>{' '}
                Calle 3, No. 47, Local 109, Col. Industrial Alce Blanco,
                Naucalpan de Juárez, Estado de México, C.P. 53370, México.
              </li>
              <li>
                <span className="font-semibold text-[#1A1A1A]">Correo electrónico:</span>{' '}
                <a
                  href="mailto:datos@magicleanproducts.com"
                  className="text-[#0076FF] hover:underline"
                >
                  datos@magicleanproducts.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-[#1A1A1A]">Teléfono:</span>{' '}
                <a href="tel:5571553635" className="text-[#0076FF] hover:underline">
                  55 7155 3635
                </a>
              </li>
            </ul>
          </section>

          {/* 2. Datos personales */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              II. Datos personales que se recaban
            </h2>
            <p className="text-sm font-normalleading-relaxed text-[#444] mb-4">
              El Responsable recaba los siguientes datos personales, los cuales{' '}
              <strong className="font-semibold">no son de naturaleza sensible</strong>:
            </p>

            <div className="mb-5">
              <p className="text-xs font-semibold tracking-widest text-[#0076FF] uppercase mb-2">
                A. Formulario de contacto / cotización
              </p>
              <ul className="list-disc list-inside text-sm font-normaltext-[#444] space-y-1 leading-relaxed ml-1">
                <li>Nombre completo</li>
                <li>Empresa u organización</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Canal de distribución de interés</li>
                <li>Ciudad o estado</li>
                <li>Mensaje o requerimiento</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-[#0076FF] uppercase mb-2">
                B. Datos de navegación (cookies y tecnologías similares)
              </p>
              <ul className="list-disc list-inside text-sm font-normaltext-[#444] space-y-1 leading-relaxed ml-1">
                <li>Dirección IP</li>
                <li>Tipo y versión de navegador</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Dispositivo y sistema operativo</li>
              </ul>
            </div>
          </section>

          {/* 3. Finalidades */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              III. Finalidades del tratamiento
            </h2>

            <div className="mb-6">
              <p className="text-xs font-semibold tracking-widest text-[#1A1A1A] uppercase mb-3">
                Finalidades necesarias (no requieren consentimiento)
              </p>
              <ul className="list-disc list-inside text-sm font-normaltext-[#444] space-y-1.5 leading-relaxed ml-1">
                <li>Atender y responder solicitudes de cotización y contacto comercial.</li>
                <li>Elaborar y enviar propuestas comerciales personalizadas.</li>
                <li>Dar seguimiento a prospectos y distribuidores potenciales.</li>
              </ul>
            </div>

            <div className="bg-[#F5F7FA] rounded-xl p-5 border border-[#E8EAED]">
              <p className="text-xs font-semibold tracking-widest text-[#0076FF] uppercase mb-3">
                Finalidades no necesarias (requieren consentimiento)
              </p>
              <ul className="list-disc list-inside text-sm font-normaltext-[#444] space-y-1.5 leading-relaxed ml-1">
                <li>Envío de comunicaciones de marketing y promociones comerciales.</li>
                <li>Información sobre nuevos productos y lanzamientos.</li>
                <li>Invitaciones a participar en encuestas de satisfacción.</li>
              </ul>
              <p className="text-xs text-[#666] mt-3 leading-relaxed">
                Si no desea que sus datos sean tratados para estas finalidades, puede
                manifestarlo en cualquier momento escribiendo a{' '}
                <a
                  href="mailto:datos@magicleanproducts.com"
                  className="text-[#0076FF] hover:underline"
                >
                  datos@magicleanproducts.com
                </a>
                .
              </p>
            </div>
          </section>

          {/* 4. Transferencias */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              IV. Transferencias de datos personales
            </h2>
            <p className="text-sm font-normalleading-relaxed text-[#444] mb-4">
              El Responsable podrá compartir sus datos con los siguientes terceros,
              únicamente para los fines descritos en este aviso:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#E8EAED]">
                    <th className="text-left py-2 pr-4 font-semibold text-[#1A1A1A] text-xs uppercase tracking-wide">Tercero</th>
                    <th className="text-left py-2 pr-4 font-semibold text-[#1A1A1A] text-xs uppercase tracking-wide">País</th>
                    <th className="text-left py-2 font-semibold text-[#1A1A1A] text-xs uppercase tracking-wide">Finalidad</th>
                  </tr>
                </thead>
                <tbody className="text-[#444] font-light">
                  <tr className="border-b border-[#E8EAED]">
                    <td className="py-3 pr-4">Supabase Inc.</td>
                    <td className="py-3 pr-4">EE.UU.</td>
                    <td className="py-3">Almacenamiento de base de datos y formularios</td>
                  </tr>
                  <tr className="border-b border-[#E8EAED]">
                    <td className="py-3 pr-4">Vercel Inc.</td>
                    <td className="py-3 pr-4">EE.UU.</td>
                    <td className="py-3">Hospedaje del sitio web y analítica de navegación</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#666] mt-4 leading-relaxed">
              El Responsable <strong className="font-semibold">no vende, cede ni comercializa</strong> datos
              personales a terceros con fines distintos a los señalados. Dichas transferencias no
              requieren consentimiento por ser necesarias para la relación comercial (art. 37 LFPDPPP).
            </p>
          </section>

          {/* 5. Derechos ARCO */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              V. Derechos ARCO y cómo ejercerlos
            </h2>
            <p className="text-sm font-normalleading-relaxed text-[#444] mb-4">
              Usted tiene derecho a <strong className="font-semibold">Acceder, Rectificar, Cancelar u Oponerse</strong>{' '}
              (derechos ARCO) al tratamiento de sus datos personales, así como a revocar
              el consentimiento otorgado para finalidades no necesarias.
            </p>

            <div className="bg-[#0A1628] text-white rounded-xl p-5 mb-4">
              <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">
                Para ejercer sus derechos, envíe un correo a:
              </p>
              <a
                href="mailto:datos@magicleanproducts.com"
                className="text-[#0076FF] font-semibold text-base hover:underline"
              >
                datos@magicleanproducts.com
              </a>
              <p className="text-xs text-white/60 mt-1">Atención: Responsable de Datos Personales</p>
            </div>

            <p className="text-sm font-normaltext-[#444] mb-3 leading-relaxed">
              Su solicitud debe incluir:
            </p>
            <ul className="list-disc list-inside text-sm font-normaltext-[#444] space-y-1 leading-relaxed ml-1 mb-4">
              <li>Nombre completo</li>
              <li>Correo electrónico registrado</li>
              <li>Derecho que desea ejercer</li>
              <li>Copia de identificación oficial vigente</li>
            </ul>
            <p className="text-sm font-normaltext-[#444] leading-relaxed">
              El Responsable responderá su solicitud en un plazo máximo de{' '}
              <strong className="font-semibold">20 días hábiles</strong> contados a partir
              de su recepción, conforme al artículo 32 de la LFPDPPP.
            </p>
          </section>

          {/* 6. Cookies */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              VI. Uso de cookies y tecnologías de rastreo
            </h2>
            <p className="text-sm font-normalleading-relaxed text-[#444] mb-4">
              Este sitio web utiliza cookies para mejorar la experiencia del usuario y analizar
              el tráfico. Las cookies empleadas son:
            </p>
            <div className="space-y-3">
              <div className="flex gap-4 items-start">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-[#0076FF] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Cookies técnicas (necesarias)</p>
                  <p className="text-sm font-normaltext-[#444] leading-relaxed">
                    Indispensables para el funcionamiento del sitio. No pueden desactivarse.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-[#0076FF] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Cookies de analítica (Vercel Analytics)</p>
                  <p className="text-sm font-normaltext-[#444] leading-relaxed">
                    Recopilan datos de navegación de forma anonimizada para entender el uso del sitio.
                    No se utilizan para publicidad ni segmentación comercial.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#666] mt-4 leading-relaxed">
              Este sitio <strong className="font-semibold">no utiliza cookies de publicidad</strong>{' '}
              ni comparte datos de navegación con redes publicitarias de terceros.
              Puede configurar su navegador para rechazar cookies, aunque esto puede afectar
              la funcionalidad del sitio.
            </p>
          </section>

          {/* 7. Cambios */}
          <section>
            <h2 className="text-lg font-black tracking-tight mb-4 pb-2 border-b border-[#E8EAED]">
              VII. Cambios al aviso de privacidad
            </h2>
            <p className="text-sm font-normalleading-relaxed text-[#444]">
              El Responsable se reserva el derecho de modificar este aviso de privacidad
              en cualquier momento. Cualquier cambio será publicado en esta página con la
              fecha de actualización correspondiente. Le recomendamos revisarlo periódicamente.
            </p>
          </section>

          {/* Nav bottom */}
          <div className="pt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/" className="text-[#0076FF] hover:underline font-medium">
              ← Volver al inicio
            </Link>
            <Link href="/terminos-de-uso" className="text-[#0076FF] hover:underline font-medium">
              Términos de uso →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
