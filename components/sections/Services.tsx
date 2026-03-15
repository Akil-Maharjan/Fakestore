'use client'

import React, { useRef, useState } from "react"
import Image from "next/image"
import { PARTNERS } from "@/constants/PartnerConstants"

const images = [
  "/services/service.jpg",
  "/services/service.jpg",
  "/services/service.jpg",
  "/services/service.jpg",
]

const Services = () => {

  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true)
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0))
    setScrollLeft(sliderRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => setIsDown(false)
  const handleMouseUp = () => setIsDown(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return
    e.preventDefault()

    const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2

    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <section id="services" className="py-20 max-w-[2000px] mx-auto">

      {/* TOP CONTENT */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">

          <div className="flex-1">
            <h2 className="text-4xl lg:text-[30px] text-[#262626] font-medium leading-tight mb-8">
              Experience our expert solutions tailored to enhance your business with top-tier design, development, and animation.
            </h2>

            <button className="bg-[#1253ED] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-[100px]">
              Services
            </button>
          </div>

          <div className="flex-1 lg:pl-16">
            <div className="space-y-6">
              <div className="text-4xl lg:text-5xl font-bold">UI & UX</div>
              <div className="text-4xl lg:text-5xl font-bold">Development</div>
              <div className="text-4xl lg:text-5xl font-bold">Blockchain</div>
            </div>
          </div>

        </div>
      </div>


      {/* CAROUSEL */}
      <div className="pl-[calc((100vw-1280px)/2+1rem)]">

        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none scrollbar-hide"
        >

          {images.map((img, i) => (
            <div
              key={i}
              className="min-w-[800px] h-[420px] relative rounded-2xl overflow-hidden shrink-0"
            >
              <Image
                src={img}
                alt="service"
                fill
                className="object-cover"
              />

              

            </div>
          ))}

        </div>

      </div>


      {/* PARTNERS */}
      <div className="max-w-7xl mx-auto px-4 mt-24 text-center">

        <h3 className="text-2xl font-semibold mb-5">
          Our Partners
        </h3>

        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="bg-white/10 px-8 py-4 rounded-lg">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.logo.width}
                height={partner.logo.height}
              />
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default Services