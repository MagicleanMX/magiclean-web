const steps = [
  {
    number: '01',
    title: 'Contáctanos',
    description:
      'Envíanos tu consulta o llena el formulario con las necesidades de limpieza de tu negocio.',
  },
  {
    number: '02',
    title: 'Recibe tu cotización',
    description:
      'Te enviamos una propuesta personalizada en menos de 24 horas hábiles.',
  },
  {
    number: '03',
    title: 'Confirma tu pedido',
    description:
      'Aprueba la cotización y coordinamos el despacho de tus productos de inmediato.',
  },
  {
    number: '04',
    title: 'Entrega en tu negocio',
    description:
      'Recibe puntualmente con respaldo de nuestro servicio postventa y soporte técnico.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Un proceso simple y transparente para que tu operación nunca se detenga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-14 h-14 rounded-full bg-[#0076FF] text-white flex items-center justify-center text-xl font-bold mb-4 shrink-0">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
