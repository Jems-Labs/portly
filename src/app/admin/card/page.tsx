"use client"

import { useApp } from '@/stores/useApp';
import React from 'react'
import Card from '@/app/admin/_components/Card';
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
function CardPage() {
  const { user } = useApp();
  const handleDownload = () => {
    const qrImg = document.querySelector('#card-to-download img') as HTMLImageElement | null;

    if (!qrImg || !qrImg?.complete) {
      qrImg?.addEventListener('load', () => {
        downloadCard();
      });
    } else {
      downloadCard();
    }

    function downloadCard() {
      const cardElement = document.getElementById('card-to-download');
      if (cardElement) {
        html2canvas(cardElement, { scale: 2, useCORS: true }).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'profile-card.png';
          link.click();
        });
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>

      <div id="card-to-download" className="mt-6">
        <Card user={user} />
      </div>
      <Button
        onClick={handleDownload}
        className="my-6 px-5 py-2.5 flex items-center gap-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </Button>
    </div>
  )
}

export default CardPage;