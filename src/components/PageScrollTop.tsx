import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageScrollTop = ()=> {
    const { pathname } = useLocation();
   console.log(pathname);
 
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);
   return null;
 }
 export default PageScrollTop;