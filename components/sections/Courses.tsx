import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AllCourses } from "@/constants/CourseConstants";
import Image from "next/image";

const Courses = () => {
  return (
    <section id="courses" className="max-w-[2000px] py-20 mx-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        
        <h3 className="text-gray-500">
          Explore our classes and master trending skills!
        </h3>

        <h2 className="mt-2 text-black font-bold text-3xl">
          Dive Into{" "}
          <span className="text-[#1DA077]">What’s Hot Right Now!</span> 🔥
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap items-center gap-10 mt-10">

          {/* ALL COURSES */}
          <div className="bg-[#C33241] rounded-[32px] p-8 flex flex-col justify-between text-white">
            
            <Link
              href="#"
              className="flex items-center gap-2 text-sm place-self-end"
            >
              View all Courses
              <ArrowRight size={16} />
            </Link>

            {/* Icons */}
            <div className="flex gap-4 mt-6">
              {AllCourses.map((course) => (
                <Image
                  key={course.title}
                  src={course.image}
                  alt={course.title}
                  width={70}
                  height={70}
                />
              ))}
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between mt-8">
              <h2 className="text-[90px] font-bold text-[#F9EBEC] relative leading-none">
                23
                <span className="absolute text-3xl -right-6 top-2">+</span>
              </h2>

              <div className="max-w-[200px]">
                <h3 className="text-2xl font-bold">All Courses</h3>
                <p className="text-sm text-[#F9EBEC]">
                  courses you&apos;re powering through right now.
                </p>
              </div>
            </div>
          </div>

          {/* UPCOMING */}
          <div className="bg-[#E9DCDD] max-w-[280px] rounded-[32px] p-6 flex flex-col justify-between h-[320px] relative">

            

            <div className=" -rotate-90 mt-10">
              <h3 className="text-[#C33241] text-[25px] leading-[100%] max-w-[20px] font-bold">
                Upcoming Courses
              </h3>
              <p className="text-xs mt-2 max-w-[170px] text-[#C33241]">
               exciting new courses waiting to boost your skills.
              </p>
            </div>
            <h2 className="text-[90px] place-self-center font-bold text-[#C33241] relative leading-none">
                05
                <span className="absolute text-4xl -right-3 -top-4">+</span>
              </h2>
            
          </div>

          {/* ONGOING */}
           <div className="bg-[#E9DCDD] max-w-[280px] rounded-[32px] p-6 flex flex-col justify-between h-[320px] relative">

            

            <div className=" -rotate-90 mt-10">
              <h3 className="text-[#C33241] text-[25px] leading-[100%] max-w-[20px] font-bold">
                Ongoing Courses
              </h3>
              <p className="text-xs mt-2 max-w-[170px] text-[#C33241]">
               currently happening—don’t miss out on the action!
              </p>
            </div>
            <h2 className="text-[90px] place-self-center font-bold text-[#C33241] relative leading-none">
                10
                <span className="absolute text-4xl -right-3 -top-4">+</span>
              </h2>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default Courses;