export const IMAGES_ROOT = process.env.ENV === 'production' ? 'static/assets/img/' : 'assets/img/';

export const paths = {
  images: {
    root: IMAGES_ROOT,
  }
};

export const isMobile = () => (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());
