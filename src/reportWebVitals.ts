// src/reportWebVitals.ts
type ReportWebVitalsFunction = (onPerfEntry?: (entry: any) => void) => void;

const reportWebVitals: ReportWebVitalsFunction = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// 이 코드는 웹 애플리케이션에서 Core Web Vitals(핵심 웹 비탈스)를 추적하고 보고하는 데 사용됩니다.
// Core Web Vitals는 사용자 경험을 측정하는 웹 페이지 성능 지표입니다. 
// 이 코드는 이러한 지표를 추적하기 위해 사용되는 reportWebVitals 함수를 정의합니다.