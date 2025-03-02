import { Monster } from "../services/srb-model/models/monster/types";

export interface TurnOrderCharacter {
    charcterName?: string;
    isMonster?: boolean;
    monster?: Monster
}
