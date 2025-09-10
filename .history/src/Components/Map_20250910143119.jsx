import React from "react";

const Map = () => {
  return (
    <div className="w-full h-[600px] mt-10 xl:mt-[122px]">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.202103465033!2d90.35445311124522!3d23.8114112863417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e912b1ead5%3A0x1e08d87a926b9330!2sBUBT%20Building%204(BBA)!5e0!3m2!1sen!2sbd!4v1755748709140!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
