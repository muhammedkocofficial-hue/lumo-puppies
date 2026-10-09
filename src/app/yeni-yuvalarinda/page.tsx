import { FamilyGallery } from "@/components/content/FamilyGallery";
import { ContactInvitation } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("Yeni Yuvalarında","Ailelerine kavuşan Lumo yavruları ve birlikte başlayan hayatlar.","/yeni-yuvalarinda/");
export const dynamic="force-dynamic";
export default function Page(){return <><FamilyGallery full/><ContactInvitation/></>;}
