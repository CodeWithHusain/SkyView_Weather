const Footer = () => {
  return (
    <footer className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
      <p>Powered by WeatherAPI</p>
      <p className="mt-1">© {new Date().getFullYear()} SkyView Weather. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
