import React, { useState } from 'react';
import '../../../assets/css/static/FAQ.css';


const faqs = [
  {
    question: ' What is this Partner Services Network and how does it work?',
    answer:'Partner Services Network connects you to TwistMart sellers who you can provide your services to and help them grow their business. You can list your services here, provide service details and then get requests from sellers for your services. Then you can contact the sellers and agree on the terms before delivering your service.'
  },
  {
    question: 'Who are the Partners listed under Partner Services Network?',
    answer: 'Partners listed here are third-party service providers selected to provide specific services to TwistMart sellers. TwistMart sellers can negotiate and set their own terms of service delivery with these partners. The responsibility of service delivery and performance is guaranteed by the Partners. TwistMart only acts as a facilitator in connecting the sellers and partners'
  },
  {
    question: 'Do I need to pay for the services?',
    answer: 'No, it is a free service for partners. The service partners can charge sellers based on the services offered. Sellers need to pay the service partners directly for the services availed'
  },
  {
    question: 'What if I have a dispute with the sellers on TwistMart?',
    answer: 'Before providing the service you can mutually agree with the sellers the terms of service delivery. Please note that these terms of services will be between you and the seller. In case of a dispute, you will have to reach out to the sellers directly and resolve it as per the agreed terms and conditions. Please note that TwistMart only acts as a facilitator in connecting the service providers and the sellers.'
  },
  {
    question: 'How are Partner Ratings calculated?',
    answer: 'On completion of Partner Service each seller has the opportunity to share feedback and rating on the service.<br> The overall rating for a service is a blended mix individual service ratings.<br> Overall rating for the partner is an amalgamation of all historic ratings received on individual services.'
  },
  {
    question: 'What is TwistMart Prestige and how do I (Service Provider or Partner) register myself for it ?',
    answer: 'Registration for TwistMart Prestige will be by invite only i.e., the services partners will be invited by TwistMart depending on the service requirement.'
  }
];

const FAQ = () => {
  return (
    <div id="faq">
      <h1>FAQ</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <input type="checkbox" id={`faq-${index}`} defaultChecked />
            <i></i>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
