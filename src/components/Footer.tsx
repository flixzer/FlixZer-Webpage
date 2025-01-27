import { useState } from 'react';
import Modal from './Modal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="py-6 bg-gray-50 dark:bg-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          เว็บไซต์นี้ สร้างขึ้นโดย{' '}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
          >
            AI
          </button>
          {' '}ทั้งสิ้น
        </div>
      </footer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ทำไมต้องใช้ AI สร้างเว็บ"
      >
        <p>
          จริง ๆ เว็บนี้ใช้ AI ที่ชื่อว่า "bolt.ai" ในการสร้างเว็บไซต์นี้ขึ้นมาทั้งหมด
          ทั้งหน้า Landing และระบบต่าง ๆ นา ๆ ที่คุณพบเห็นในนี้ ต่างก็ใช้ AI ในการสรรค์สร้างสิ่งเหล่านี้ออกมาทั้งสิ้น
        </p>
        <p>
          ผมไม่รู้หรอกนะครับว่าคุณ หรือใครก็ตามที่เห็นสิ่งนี้ แล้วรู้ว่าใช้ AI ทำ จะโอเค หรือไม่เห็นด้วย หรือจะยังไงก็ตาม
          แต่สิ่งที่ผมอยากจะทำจริง ๆ ก็คือ "ผมอยากมีเว็ปเป็นของตัวเองเท่านั้น"
        </p>
        <p>
          ผมไม่ได้สนับสนุน AI มาแย่งที่งานทั้งหมด มาแย่งตำแหน่งและหน้าที่ของพวกเรา
          เพียงแค่ว่าผมใช้วิธีนี้ เพื่อเติมเต็มฝันของผม ในการที่จะมีเว็บของตัวเองซักอันขึ้นมา
        </p>
        <p>
          ใครที่เก่งเขียนเว็บอยู่แล้ว พวกคุณเก่งมากเลยครับ ยังไง AI ก็แทนที่พวกคุณไม่ได้
          ทุกคนเลยแหละ AI แทนที่ผลงานของคุณไม่ได้ และมันจะแทนที่ "จิตวิญญาณของผลงาน" ไม่ได้แน่นอน
        </p>
        <p>
          เอ้อแล้วก็ เว็บตัวใหม่ที่สร้างโดย{' '}
          <a 
            href="https://nsys.site/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:underline"
          >
            nicenathapong
          </a>
          {' '}มันจะสร้างเว็บนี้ให้ผมด้วย
          เป็นอีกเวอร์ชั่นที่ไนซ์มันจะทำเองทั้งหมด อดใจรอไม่ไหวละ
        </p>
        <p>
          ถ้าไนซ์เห็นละก็... สู้ ๆ 💖👌
        </p>
      </Modal>
    </>
  );
} 