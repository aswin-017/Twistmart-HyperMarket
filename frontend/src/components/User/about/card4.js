import React from 'react';
import '../../../assets/css/user/about/card4.css'; // Import the CSS file

const AwardsRecognitionSection = () => {
  return (
    <section className="awards-recognition-section">
      <div className="content-wrapper">
        <div className="section-description">
          <h1 className="section-title">Awards & Recognition</h1>
          <p>
            At Twistmart, our supply chain operations prioritize safety, process management, environmental sustainability, and operational efficiency at every step. Our unwavering focus on these areas has earned us numerous prestigious awards and recognitions. Our ISO certification attests to our commitment to quality management systems, while the TAPA certification recognizes the safety that we assure throughout the supply chain. Moreover, the IGBC certification is a testament to our ongoing efforts to build a sustainable supply chain.
          </p>
        </div>
        <div className="certifications">
          <div className="certification">
            <img src="https://img.freepik.com/premium-vector/iso-9001-2015-certification-iso-90012015-logo-iso-9000-certification_526569-648.jpg?w=2000" alt="ISO Certification" className="certification-image" />
            <h2 className="certification-title">ISO Certified</h2>
            <p className="certification-description">
              {/* Our adherence to rigorous quality management standards is validated by our ISO certification. This certification reflects our continuous efforts to maintain high-quality standards in every aspect of our operations. */}
            </p>
          </div>
          <div className="certification">
            <img src="https://5.imimg.com/data5/XI/EN/PY/SELLER-1462276/igbc-certification-500x500.jpg" alt="IGBC Certification" className="certification-image" />
            <h2 className="certification-title">IGBC Certified</h2>
            <p className="certification-description">
              {/* Our dedication to environmental sustainability is recognized by our IGBC certification, showcasing our commitment to green building practices and eco-friendly operations. */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognitionSection;