import { services } from '../data';

export default function Pricing() {
  return (
    <section className="py-20 bg-sky-50 dark:bg-sky-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-sky-950 dark:text-sky-100 mb-12 text-center">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.type}
              className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-sky-900 dark:text-sky-100 mb-4">
                {service.type === 'longform' ? 'Longform VDO (5+ min)' : 'Shortform VDO (1 min)'}
              </h3>
              <div className="mb-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  เริ่มต้น {service.basePrice} บาท
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  เพิ่ม {service.pricePerMinute} บาท/นาที
                </p>
              </div>
              {service.note && (
                <p className="text-sm text-sky-600 dark:text-sky-400">{service.note}</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-gray-700 dark:text-gray-300">
          * สำหรับงานที่มีโฆษณาสปอนเซอร์ (ยกเว้น Tie-in ช่วง Intro) → คิดราคาพาณิชย์ x2
        </p>
      </div>
    </section>
  );
}