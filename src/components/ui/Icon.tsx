export function Icon({name="arrow",className=""}:{name?:"arrow"|"phone"|"whatsapp"|"instagram"|"mail"|"pin"|"clock";className?:string}) {
  const paths = {
    arrow:<><path d="M4 12h15M13 5l7 7-7 7" /></>,
    phone:<path d="M8 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 2a13 13 0 0 1-6-6l2-2-2-5Z" />,
    whatsapp:<><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z"/><path d="m8 7 1.5 3-1 1c1 2 2 3 4 4l1-1 3 1.5c-.7 2-2.3 2-4 1-3-1.4-5-3.4-6-6C6 8.5 6.6 7.4 8 7Z"/></>,
    instagram:<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6 8 7 8-7"/></>,
    pin:<><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>
  };
  return <svg className={"line-icon "+className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
