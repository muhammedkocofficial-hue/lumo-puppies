import type { ContentEntry } from "@/types/cms";
// User-requested sample profiles. Names explicitly identify these as examples.
export const starterPuppies: ContentEntry[] = [
  { name:"Örnek Luna", slug:"ornek-luna", breed:"Toy Poodle", sex:"Dişi", colour:"Apricot", image:"/media/examples/poodle-portrait.webp" },
  { name:"Örnek Leo", slug:"ornek-leo", breed:"Pomeranian", sex:"Erkek", colour:"Krem", image:"/media/editorial/pomeranian.webp" },
  { name:"Örnek Mila", slug:"ornek-mila", breed:"Toy Poodle", sex:"Dişi", colour:"Kızıl", image:"/media/examples/campaign-mobile.webp" },
  { name:"Örnek Teddy", slug:"ornek-teddy", breed:"Maltipoo", sex:"Erkek", colour:"Açık krem", image:"/media/examples/companions-mobile.webp" },
].map((p,index)=>({id:p.slug,kind:"puppy",slug:p.slug,published:true,sort_index:index,updated_at:"2026-10-09T00:00:00Z",payload:{title:p.name,description:"Vitrin düzenini göstermek için hazırlanmış örnek yavru profili. Fotoğraf ve bilgiler gerçek bir sahiplendirme ilanı değildir.",body:"Bu örnek kaydın fotoğrafları ve bilgileri yönetim panelinden değiştirilebilir. Güncel yavrularımız için bizimle iletişime geçebilirsiniz.",images:[{src:p.image,alt:p.name+" için örnek yavru görseli"}],breed:p.breed,sex:p.sex,colour:p.colour,status:"available",featured:true,traits:["Oyuncu","Meraklı"]}}));
