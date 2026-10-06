import type { TeamMember } from "@/types/content";
// TODO: genuine names, roles, biographies and portraits. No invented credentials.
export const team: TeamMember[] = [];
export const verifiedTeam = team.filter((t) => t.verified);
