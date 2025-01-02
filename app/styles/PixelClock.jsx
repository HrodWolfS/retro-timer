// components/PixelClock.jsx
const PixelClock = () => {
  return (
    <svg
      className="w-20 h-20"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fond de l'horloge */}
      <path
        d="
        M16 8 
        h32 v4 
        h4 v4 
        h4 v32 
        h-4 v4 
        h-4 v4 
        h-32 v-4 
        h-4 v-4 
        h-4 v-32 
        h4 v-4 
        h4 z
      "
        fill="#4e8fb1"
      />
      {/* Bordure intérieure */}
      <path
        d="
        M20 12
        h24 v4
        h4 v32
        h-4 v4
        h-24 v-4
        h-4 v-32
        h4 z
      "
        fill="#2c2137"
      />
      {/* Cercle central */}
      <circle cx="32" cy="32" r="2" fill="#ef7d57" />
      {/* Points des heures */}
      <rect x="30" y="16" width="4" height="4" fill="#b7d877" />
      <rect x="44" y="30" width="4" height="4" fill="#b7d877" />
      <rect x="30" y="44" width="4" height="4" fill="#b7d877" />
      <rect x="16" y="30" width="4" height="4" fill="#b7d877" />
      {/* Aiguilles */}
      <rect x="32" y="20" width="2" height="12" fill="#ef7d57" />{" "}
      {/* Minutes */}
      <rect x="32" y="32" width="10" height="2" fill="#fbf5ef" /> {/* Heures */}
    </svg>
  );
};

export default PixelClock;
