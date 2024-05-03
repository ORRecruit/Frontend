declare module "react-simple-captcha" {
    export function loadCaptchaEnginge(length: number): void;
    export function validateCaptcha(userInput: string): boolean;
    export const LoadCanvasTemplate: React.FC;
    export const LoadCanvasTemplateNoReload: React.FC;
  }