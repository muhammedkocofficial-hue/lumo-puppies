import { Hero } from "@/components/home/Hero";
import { Standard } from "@/components/home/Standard";
import { Awards } from "@/components/content/Awards";
import { FamilyGallery } from "@/components/content/FamilyGallery";
import { ContentCards } from "@/components/content/ContentCards";
import { BreedList } from "@/components/breeds/BreedList";
import { PuppyList } from "@/components/puppies/PuppyList";
import { ContactInvitation,TextLink } from "@/components/ui/Editorial";
import { Media } from "@/components/ui/Media";
import { getContent } from "@/lib/cms-server";
import { toPuppy } from "@/lib/puppy-adapter";
export const dynamic="force-dynamic";
export default async function Home(){const [puppies,posts]=await Promise.all([getContent("puppy"),getContent("post")]);return <><Hero/><Awards/><FamilyGallery/>
<section id="lumo-hikayesi" className="shell story-editorial"><div className="story-photo"><Media asset={{desktopSrc:"/media/editorial/story.webp",alt:"Küçük bir dostla kurulan sıcak bir bağ",aspectRatio:"4 / 5"}}/></div><div className="story-copy"><p className="eyebrow">LUMO’NUN HİKÂYESİ</p><h2>Bir ilk bakış.<br/><em>Bir ömürlük bağ.</em></h2><p>Bir yavruyu hayatınıza almak, günlük yaşamınızda ona yer açmaktır. Biz bu yolculuğu tanışmakla, dinlemekle ve her küçük ayrıntıya özen göstermekle başlatıyoruz.</p><p>İstanbul Ataşehir’den, birlikte kurulacak yeni hayatlara.</p><TextLink href="/hakkimizda/">Hikâyemizi keşfedin</TextLink></div></section>
<Standard/><section className="shell section puppies-feature"><p className="eyebrow">YAVRULARIMIZ</p><h2>Öne çıkan yavrularımız</h2><PuppyList items={puppies.filter(p=>p.payload.featured && p.payload.status!=="home").map(toPuppy)} limit={4}/><TextLink href="/yavrular/">Tüm yavruları keşfedin</TextLink></section>
<section className="shell section live-breeds"><p className="eyebrow">DOSTUNUZU TANIYIN</p><h2>Farklı karakterler,<br/><em>aynı yakınlık.</em></h2><BreedList/></section>
<section className="shell section journal-preview"><p className="eyebrow">LUMO JOURNAL</p><h2>Birlikte yaşama dair.</h2><ContentCards items={posts.slice(0,3)}/><TextLink href="/blog/">Tüm yazılar</TextLink></section><ContactInvitation/></>;}
