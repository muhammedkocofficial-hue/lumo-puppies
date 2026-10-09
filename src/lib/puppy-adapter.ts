import type { ContentEntry } from "@/types/cms";
import type { Puppy } from "@/types/content";
export function toPuppy(entry:ContentEntry):Puppy{const p=entry.payload;return {slug:entry.slug,name:p.title,published:entry.published,breedName:p.breed,status:p.status,sex:p.sex,colour:p.colour,birthDate:p.birthDate,introduction:p.description,personality:p.traits,gallery:p.images.map(i=>({desktopSrc:i.src,alt:i.alt,aspectRatio:"4 / 5"})),development:[],parents:[],documents:[],todo:[]};}
