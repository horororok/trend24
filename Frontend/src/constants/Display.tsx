export const MobileWidth: string = "768px";
export const TabletWidth: string = "1024px";
export const DesktopWidth: string = "1200px";

export const Mobile = `@media all and (min-width:${MobileWidth})`;
export const Tablet = `@media all and (min-width:${MobileWidth}) and (max-width:${TabletWidth})`;
export const Desktop = `@media (max-width: ${DesktopWidth})`;