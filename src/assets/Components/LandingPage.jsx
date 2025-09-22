

import { Routes, Route, useLocation } from "react-router-dom";
import SuperInteractiveAbout from "../../landingPageComponents/AboutSection";
import ContactSection from "../../landingPageComponents/ContactSection";
import HomeSection from "../../landingPageComponents/HomeSection";
import Navbar from "../../landingPageComponents/Navbar";
import InteractiveServicesSection from "../../landingPageComponents/ServicesSection";
import AuthForm from "../../AuthPage/AuthPage";
import { useTranslation } from 'react-i18next';
import UserDashBoard from "./UserDashBoard";
import LocationRequest from "../../landingPageComponents/LocationRequest";
import { useEffect, useState } from "react";

function MainContent({ t }) {
  const location = useLocation();

  // Paths where we hide landing sections
  const hideOnPaths = ['/signin', '/signup', '/dashboard'];
  const showLandingSections = !hideOnPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      <Routes>
        <Route path="/signin" element={<AuthForm />} />
        <Route path="/signup" element={<AuthForm />} />
        {/* FIXED: allow nested dashboard routes */}
        <Route path="/dashboard/*" element={<UserDashBoard />} />
      </Routes>

      {showLandingSections && <HomeSection t={t} />}
      {showLandingSections && <SuperInteractiveAbout t={t} />}
      {showLandingSections && <InteractiveServicesSection t={t} />}
      {showLandingSections && <ContactSection t={t} />}
    </>
  );
}

export default function LandingPage() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState("en"); // default english

  const handleLocation = async (loc) => {
    console.log("Got location:", loc.latitude , " : ", loc.longitude);

    try {
      // Use free OpenCage API (replace with your API key)
      const apiKey = import.meta.env.VITE_OPENCAGE_GEO_CODE_API_KEY;
      const resp = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${loc.latitude}+${loc.longitude}&key=${apiKey}`
      );
      const data = await resp.json();
      console.log("Reverse geocode:", data);

      if (data.results.length > 0) {
        const country = data.results[0].components.country;
        let state =
        data.results[0].components.state ||
        data.results[0].components.state_district ||
        data.results[0].components.county ||
        data.results[0].components.city; // last fallback

        console.log(country)
        console.log(state)

        if (country == "India") {
          // Map state → language
          const stateLangMap = {
            "Andaman and Nicobar Islands": "bn",
            "Andhra Pradesh": "te",
            "Arunachal Pradesh": "en",
            "Assam": "as",
            "Bihar": "hi",
            "Chandigarh": "pa",
            "Chhattisgarh": "hi",
            "Dadra and Nagar Haveli and Daman and Diu": "gu",
            "Delhi": "hi",
            "Goa": "kok",
            "Gujarat": "gu",
            "Haryana": "hi",
            "Himachal Pradesh": "hi",
            "Jammu and Kashmir": "ur",
            "Jharkhand": "hi",
            "Karnataka": "kn",
            "Kerala": "ml",
            "Ladakh": "en",
            "Lakshadweep": "ml",
            "Madhya Pradesh": "hi",
            "Maharashtra": "mr",
            "Manipur": "en",
            "Meghalaya": "en",
            "Mizoram": "en",
            "Nagaland": "en",
            "Odisha": "or",
            "Puducherry": "ta",
            "Punjab": "pa",
            "Rajasthan": "hi",
            "Sikkim": "en",
            "Tamil Nadu": "ta",
            "Telangana": "te",
            "Tripura": "bn",
            "Uttar Pradesh": "hi",
            "Uttarakhand": "hi",
            "West Bengal": "bn"
          };

          // console.log(stateLangMap[state]);
          setLanguage(stateLangMap[state] || "hi"); // default Hindi if unknown state
        } else {
          setLanguage("en"); // non-Indian → English
        }

            }
            // console.log(language);  
        

    } catch (err) {
      console.error("Error fetching reverse geocode:", err);
      setLanguage("en"); // fallback
    }
  };


  // Hide navbar on signin, signup, or dashboard pages
  const hideNavbarOnPaths = ['/signin', '/signup', '/dashboard'];
  const showNavbar = !hideNavbarOnPaths.some(path => location.pathname.startsWith(path));

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("appLang", lng);
  };

   useEffect(() => {
    const savedLang = localStorage.getItem("appLang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
      i18n.changeLanguage(language);
    }, [language]);
  return (

    

    <div className="scroll-smooth">
      <LocationRequest onLocation={handleLocation} />
      {showNavbar && <Navbar t={t} i18n={i18n} changeLanguage={changeLanguage} />}
      <MainContent t={t} />
    </div>
  );
}