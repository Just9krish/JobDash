import React from "react";

export default function TopCompanies() {
  const images = [
    {
      companyName: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
    },
    {
      companyName: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
    },
  ];
  return (
    <div className="overflow-hidden">
      <div className="animate-scroll flex">
        {images.map((image, index) => (
          <div className="flex-shrink-0 px-4" key={index}>
            <p>{image.companyName}</p>
            {/* <img src={image.logo} alt={image.companyName} className="h-16" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
