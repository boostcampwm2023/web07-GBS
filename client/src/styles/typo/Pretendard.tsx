import localFont from 'next/font/local';

const extrabold = localFont({
  src: './PretendardVariable.woff2',
  weight: '800',
  display: 'fallback',
  style: 'normal',
  variable: '--pretendard-bold',
  fallback: ['system-ui'],
});

const bold = localFont({
  src: './PretendardVariable.woff2',
  weight: '700',
  display: 'fallback',
  style: 'normal',
  variable: '--pretendard-bold',
  fallback: ['system-ui'],
});

const semibold = localFont({
  src: './PretendardVariable.woff2',
  weight: '600',
  display: 'fallback',
  style: 'normal',
  variable: '--pretendard-bold',
  fallback: ['system-ui'],
});

const medium = localFont({
  src: './PretendardVariable.woff2',
  weight: '500',
  display: 'fallback',
  style: 'normal',
  variable: '--pretendard-bold',
  fallback: ['system-ui'],
});

const regular = localFont({
  src: './PretendardVariable.woff2',
  weight: '400',
  display: 'fallback',
  style: 'normal',
  variable: '--pretendard-bold',
  fallback: ['system-ui'],
});

const light = localFont({
  src: './PretendardVariable.woff2',
  weight: '300',
  display: 'fallback',
  style: 'normal',
  variable: '--pretendard-bold',
  fallback: ['system-ui'],
});

export {
  extrabold as pretendardExtrabold,
  bold as pretendardBold,
  semibold as pretendardSemibold,
  medium as pretendardMedium,
  regular as pretendardRegular,
  light as pretendardLight,
};
