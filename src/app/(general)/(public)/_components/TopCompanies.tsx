"use client";

import React, { useEffect } from "react";

export default function TopCompanies() {
  useEffect(() => {
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");

    let position1 = 4027;
    let position2 = 0;
    if (image1 && image2) {
      const interval = setInterval(() => {
        position1 = position1 - 1;
        position2 = position2 - 1;

        image1.style.right = `${position1}px`;
        image2.style.right = `${position2}px`;

        if (position1 === 0) {
          position1 = 4027;
        }

        if (position2 === -4027) {
          position2 = 0;
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section className="space-y-12 py-16">
      <h4 className="text-center text-3xl font-bold">Top companies trust us</h4>
      <div
        className="relative flex h-24 w-full max-w-7xl overflow-x-hidden"
        style={{
          background:
            "linear-gradient(to right,rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.8) 15%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.8) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 65%, rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.8) 75%,  rgba(255, 255, 255, 1) 85%,rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(to right,rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.8) 15%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.8) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 65%, rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0.8) 75%,  rgba(255, 255, 255, 1) 85%,rgba(255, 255, 255, 0) 100%)",
          }}
          className="relative h-full w-full overflow-hidden"
        >
          <div
            id="image1"
            className="absolute h-24 w-[4026px] bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://internshala.com/static/images/homepage/top_companies.png')",
            }}
          ></div>
          <div
            id="image2"
            className="absolute h-24 w-[4026px] bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://internshala.com/static/images/homepage/top_companies.png')",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
